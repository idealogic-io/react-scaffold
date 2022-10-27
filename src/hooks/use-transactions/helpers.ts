import { TransactionDetails } from "store/reducers/transactions/reducer";

export const shouldCheck = (
  currentBlock: number,
  tx: { addedTime: number; receipt?: any; lastCheckedBlockNumber?: number },
) => {
  if (tx.receipt) {
    return false;
  }
  if (!tx.lastCheckedBlockNumber) {
    return true;
  }
  const blocksSinceCheck = currentBlock - tx.lastCheckedBlockNumber;
  if (blocksSinceCheck < 1) {
    return false;
  }
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60;
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9;
  }
  if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2;
  }
  // otherwise every block
  return true;
};

// we want the latest one to come first, so return negative if a is after b
export const newTransactionsFirst = (a: TransactionDetails, b: TransactionDetails) => {
  return b.addedTime - a.addedTime;
};
