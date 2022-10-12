import { useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const useSlotChangeSolana = (callback?: () => void) => {
  const { connection } = useConnection();
  const { connected } = useWallet();

  useEffect(() => {
    if (connection && connected && callback) {
      const id = connection.onSlotChange(async slot => {
        // Slot comes less then every second so we reduce the amount of calls
        // Mutate will call in every 15 sec
        if (slot.slot % 40 === 0) {
          callback();
        }
      });

      return () => {
        connection.removeSlotChangeListener(id);
      };
    }
  }, [connection, connected]);
};

export default useSlotChangeSolana;
