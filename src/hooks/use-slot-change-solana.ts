import { useEffect } from "react";
import { useConnection } from "@solana/wallet-adapter-react";

const useSlotChangeSolana = (callback: () => void) => {
  const { connection } = useConnection();

  useEffect(() => {
    if (connection) {
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
  }, [connection]);
};

export default useSlotChangeSolana;
