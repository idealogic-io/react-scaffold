import { useAppDispatch, useAppSelector } from "store/store";
import { useAccount, useSignMessage } from "wagmi";
import { toast } from "react-toastify";

import { loginUserWithWallet } from "store/auth/actions";

export const useLoginWithWallet = () => {
  const { pending: authPending } = useAppSelector(state => state.auth);
  const { address, isConnected } = useAccount();
  const { isLoading: signPending, signMessageAsync } = useSignMessage({
    message: `Scaffold Auth: ${address} ${new Date().getTime()}`,
  });
  const dispatch = useAppDispatch();

  const handleAuthWithWallet = async () => {
    try {
      if (!isConnected || !address) {
        throw new Error("Please connect your wallet.");
      }
      const hash = await signMessageAsync();

      dispatch(loginUserWithWallet({ address: address.toLowerCase(), hash }));
    } catch (error) {
      console.error(error);
      if (error && error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return {
    auth: handleAuthWithWallet,
    isLoading: authPending || signPending,
  };
};
