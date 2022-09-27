import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

const useOnBlockListener = (callback: () => void) => {
  const { library } = useWeb3React();

  useEffect(() => {
    if (library) {
      library.on("block", () => {
        callback();
      });

      return () => {
        library.removeAllListeners("block");
      };
    }
  }, [library]);
};

export default useOnBlockListener;
