import { useAccount } from "wagmi";
import { useAppSelector, useAppDispatch } from "store/store";
import { resetAuth } from "store/auth";
import { hideModal } from "store/modal";

export const useLogOutWithoutConnection = () => {
  const { token } = useAppSelector(state => state.auth);
  const { isConnected, isConnecting } = useAccount();
  const dispatch = useAppDispatch();

  if (!isConnecting && !isConnected && (token || token !== "")) {
    dispatch(resetAuth());
    dispatch(hideModal());
  }

  // Strongly recommended to use also check for connected address check
  // Cos user can sign in via one address and change it
  // F.e.
  //
  // if (
  //   (token || token !== "") &&
  //   isConnected &&
  //   user?.address &&
  //   address &&
  //   address.toLowerCase() !== user.address.toLowerCase()
  // ) {
  //   dispatch(resetAuth());
  //   dispatch(hideModal());
  // }
};
