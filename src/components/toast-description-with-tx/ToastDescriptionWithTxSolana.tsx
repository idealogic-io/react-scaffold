import React, { PropsWithChildren } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import { useTranslation } from "context";
import Text from "components/text";
import InternalLink from "components/link";

import { getScanLinkSolana, truncateHash } from "utils/web3";
import { solanaNetwork } from "App";

interface ToastDescriptionWithTxSolanaSolanaProps {
  description?: string;
  txHash?: string;
}

const ToastDescriptionWithTxSolana: React.FC<PropsWithChildren<ToastDescriptionWithTxSolanaSolanaProps>> = ({
  txHash,
  children,
}) => {
  const { connected } = useWallet();
  const { t } = useTranslation();

  return (
    <>
      {typeof children === "string" ? <Text as="p">{children}</Text> : children}
      {txHash && connected && (
        <InternalLink fontSize={14} external href={getScanLinkSolana(txHash, "transaction", solanaNetwork)}>
          {t("View on solscan")}: {truncateHash(txHash, 8, 0)}
        </InternalLink>
      )}
    </>
  );
};

export default ToastDescriptionWithTxSolana;
