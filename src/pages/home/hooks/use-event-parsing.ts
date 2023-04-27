import { useEffect } from "react";

import { TransferEvent } from "configs/abi/types/Erc20";
import { useInitialBlock, useTokenContract } from "hooks";
import { bscTokens } from "configs/tokens-list";

export const useEventParsing = () => {
  const contract = useTokenContract(bscTokens.USDT.address);
  const initialBlock = useInitialBlock();
  // 86_400(sec in a day) / 3(sec in one block) = 28_800 blocks in a day
  // limit per one queryFilter = 5000
  // iterations per day = 28_800 / 5000 = 5.76
  // Attention!
  // `The eth_getLogs api has been turned off in the public RPCs` for bsc mainnet
  // https://github.com/bnb-chain/bsc/issues/1215
  const perDayIterations = 5.76;
  let tEvents: TransferEvent[] = [];
  const limit = 100;
  const stop = 100 * perDayIterations * 3;

  let from = initialBlock - limit;
  let to = initialBlock;
  let step = 1;

  const getEvents = async () => {
    console.error(tEvents, "tEvents");
    console.error(step, "step");
    console.error(from, "from");
    console.error(to, "to");

    // TODO
    // Take the latest block number
    // minus 5000 blocks
    // find events
    // if they are not 10
    // minus 5000 blocks and find others
    // return if blocknumber <= block of creation

    const eventFilter = contract!.filters.Transfer("0xc903666f98dc922EAa250a5888BeFfF323368b92");
    const events = await contract!.queryFilter(eventFilter, from, to);
    console.error(events, "events");

    tEvents = [...tEvents, ...events];
    from -= limit;
    to -= limit;
    step += 1;

    if (from >= initialBlock - stop) {
      await getEvents();
    } else {
      return;
    }
  };

  useEffect(() => {
    if (initialBlock > 0) {
      getEvents();
    }
  }, [initialBlock]);
};
