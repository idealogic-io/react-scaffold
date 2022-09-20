import React, { PropsWithChildren } from "react";
import { useWeb3React } from "@web3-react/core";

import { useTranslation } from "context";
import Text from "components/text";
import InternalLink from "components/link";
import { getScanLink, truncateHash } from "utils/web3";

interface ToastDescriptionWithTxProps {
  description?: string;
  txHash?: string;
}

const ToastDescriptionWithTx: React.FC<PropsWithChildren<ToastDescriptionWithTxProps>> = ({ txHash, children }) => {
  const { chainId } = useWeb3React();
  const { t } = useTranslation();

  return (
    <>
      {typeof children === "string" ? <Text as="p">{children}</Text> : children}
      {txHash && chainId && (
        <InternalLink fontSize={14} external href={getScanLink(txHash, "transaction", chainId)}>
          {t("View on scan")}: {truncateHash(txHash, 8, 0)}
        </InternalLink>
      )}
    </>
  );
};

export default ToastDescriptionWithTx;
