import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNetwork, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";

import { FlexGap, Button, Link, Text } from "components";

import { CHAINS_IDS } from "configs/chains";
import { CONTRACTS } from "configs/contracts";

const ContractWriteExample: React.FC = () => {
  const [trxHash, setTrxHash] = useState<`0x${string}` | undefined>(undefined);
  const [trxLink, setTrxLink] = useState<string | undefined>(undefined);
  const [isWaiting, setIsWaiting] = useState(false);

  const { t } = useTranslation("translation", { keyPrefix: "ContractWriteExample" });
  const { chain } = useNetwork();

  const { config, isSuccess } = usePrepareContractWrite({
    ...CONTRACTS[CHAINS_IDS.BSC_TEST].scaffoldToken.config,
    functionName: "mint",
  });
  const { writeAsync } = useContractWrite(config);
  const { isSuccess: trxSuccess, isError: trxError } = useWaitForTransaction({
    hash: trxHash,
  });

  useEffect(() => {
    if (trxSuccess) {
      toast.success("Successfully minted 100 SCT");
      setIsWaiting(false);
    }

    if (trxError) {
      toast.error("Transaction error");
      setIsWaiting(false);
    }
  }, [trxSuccess, trxError]);

  const mintHandler = () => {
    if (isSuccess && writeAsync) {
      setIsWaiting(true);
      setTrxLink(undefined);
      writeAsync()
        .then(trxData => {
          setTrxHash(trxData.hash);
          setTrxLink(chain?.blockExplorers?.default.url + "/tx/" + trxData.hash);
        })
        .catch(error => {
          setIsWaiting(false);
          toast.error(error.message);
        });
    }
  };

  return (
    <FlexGap flexDirection="column" gap="16px">
      <Text>{t("article1")}</Text>
      <FlexGap gap="16px">
        <Button onClick={mintHandler} isLoading={isWaiting} disabled={!isSuccess}>
          {t("mint")}
        </Button>
        {trxLink && (
          <Link href={trxLink} external>
            {t("scanner")}
          </Link>
        )}
      </FlexGap>
    </FlexGap>
  );
};

export default ContractWriteExample;
