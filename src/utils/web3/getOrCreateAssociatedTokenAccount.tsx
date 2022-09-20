import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  getAccount,
  TokenInvalidMintError,
  TokenInvalidOwnerError,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
} from "@solana/spl-token";
import {
  Connection,
  PublicKey,
  Commitment,
  Transaction,
  RpcResponseAndContext,
  SignatureResult,
} from "@solana/web3.js";
import { toast } from "react-toastify";

import { ToastDescriptionWithTxSolana } from "components";
import { toastOptions } from "configs";
import { TranslateFunction } from "context/language-context/types";

export async function getOrCreateAssociatedTokenAccount(
  connection: Connection,
  payer: PublicKey,
  mint: PublicKey,
  owner: PublicKey,
  fetchWithCatchTxErrorSolana: (transaction: Transaction) => Promise<
    | (RpcResponseAndContext<SignatureResult> & {
        signature: string;
      })
    | null
  >,
  t: TranslateFunction,
  allowOwnerOffCurve = false,
  commitment?: Commitment,
  programId = TOKEN_PROGRAM_ID,
  associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID,
) {
  const associatedToken = await getAssociatedTokenAddress(
    mint,
    owner,
    allowOwnerOffCurve,
    programId,
    associatedTokenProgramId,
  );

  // This is the optimal logic, considering TX fee, client-side computation, RPC roundtrips and guaranteed idempotent.
  // Sadly we can't do this atomically.
  let account;
  try {
    account = await getAccount(connection, associatedToken, commitment, programId);
  } catch (error: any) {
    // TokenAccountNotFoundError can be possible if the associated address has already received some lamports,
    // becoming a system account. Assuming program derived addressing is safe, this is the only case for the
    // TokenInvalidAccountOwnerError in this code path.
    if (error instanceof TokenAccountNotFoundError || error instanceof TokenInvalidAccountOwnerError) {
      // As this isn't atomic, it's possible others can create associated accounts meanwhile.
      try {
        const transaction = new Transaction().add(
          createAssociatedTokenAccountInstruction(
            payer,
            associatedToken,
            owner,
            mint,
            programId,
            associatedTokenProgramId,
          ),
        );

        const { blockhash } = await connection.getLatestBlockhash();

        transaction.feePayer = payer;
        transaction.recentBlockhash = blockhash;
        // Different method to confirm tx
        // TODO remove when test it properly
        // const signed = await signTransaction(transaction);

        // const signature = await connection.sendRawTransaction(signed.serialize());

        // await connection.confirmTransaction({
        //   signature,
        //   lastValidBlockHeight: lastValidBlockHeight,
        //   blockhash: blockhash,
        // });

        const confirmed = await fetchWithCatchTxErrorSolana(transaction);

        if (confirmed?.signature) {
          toast.success(
            <ToastDescriptionWithTxSolana txHash={confirmed.signature}>
              {t("Associated token account was created")}
            </ToastDescriptionWithTxSolana>,
            toastOptions,
          );
        }
      } catch (error: unknown) {
        // Ignore all errors; for now there is no API-compatible way to selectively ignore the expected
        // instruction error if the associated account exists already.
      }

      // Now this should always succeed
      account = await getAccount(connection, associatedToken, commitment, programId);
    } else {
      throw error;
    }
  }

  if (!account.mint.equals(mint)) throw new TokenInvalidMintError();
  if (!account.owner.equals(owner)) throw new TokenInvalidOwnerError();

  return account;
}
