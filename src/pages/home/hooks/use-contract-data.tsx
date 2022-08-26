import { useEffect, useState } from "react";
import { Contract } from "@ethersproject/contracts";
import { MaxUint256 } from "@ethersproject/constants";
import { useWeb3React } from "@web3-react/core";
import { parseUnits } from "@ethersproject/units";
import { toast } from "react-toastify";
import { random } from "lodash";

import { Course, NormalizedCourse } from "../types";
import { formatBigNumber, getCourseMarketplaceContract } from "utils/web3";
import { getAddress, getERC20Contract } from "utils/web3/contract-helpers";
import { contractsAddresses, tokens } from "configs";
import { useWaitTransaction } from "hooks";
import { ToastDescriptionWithTx } from "components";
import { useTranslation } from "context";

type StateProps = {
  isApproved: boolean;
  lastCourse: NormalizedCourse | null;
  contract: Contract | null;
  loading: boolean;
  usdtContract: Contract | null;
  courseContractAddress: string | null;
};
const coursePrice = parseUnits("0.01", "ether");

const useContractData = () => {
  const [data, setData] = useState<StateProps>({
    isApproved: false,
    lastCourse: null,
    contract: null,
    loading: false,
    usdtContract: null,
    courseContractAddress: null,
  });

  const { library, chainId, account, active } = useWeb3React();
  const { fetchWithCatchTxError, loading: pendingTx } = useWaitTransaction();
  const { t } = useTranslation();

  useEffect(() => {
    if (active) {
      getContractData();
    }
  }, [active]);

  const getContractData = async () => {
    setData(prev => ({ ...prev, loading: true }));
    try {
      const contract = getCourseMarketplaceContract(library?.getSigner(), chainId);
      const usdtAddress = tokens.USDT[chainId as number];
      const usdtContract = getERC20Contract(usdtAddress, library?.getSigner(), chainId);

      const courseContractAddress = getAddress(contractsAddresses.courseMarketplace, chainId);

      const isApproved = await checkIsApproved(usdtContract, courseContractAddress);

      setData(prev => ({ ...prev, isApproved, contract, usdtContract, courseContractAddress }));
    } catch (error) {
      console.error("Error while create data for contract", error);
    } finally {
      setData(prev => ({ ...prev, loading: false }));
    }
  };

  const checkIsApproved = async (usdtContract: Contract, courseContractAddress: string) => {
    try {
      const allowanceBN = await usdtContract.allowance(account, courseContractAddress);

      return allowanceBN.gte(coursePrice);
    } catch (error) {
      console.error("Error while check allowance", error);
      return false;
    }
  };

  const onApprove = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return approveAllowance();
    });
    if (receipt?.status) {
      toast.success(
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t("Approve succeeded")}</ToastDescriptionWithTx>,
      );
      setData(prev => ({ ...prev, isApproved: true }));
    }
  };

  const approveAllowance = () => {
    const { usdtContract, courseContractAddress } = data;

    if (usdtContract && courseContractAddress) {
      return usdtContract.approve(courseContractAddress, MaxUint256);
    }
  };

  const onPurchaseCourse = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return purchaseCourseHandler();
    });
    if (receipt?.status) {
      toast.success(
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t("You purchased a course")}</ToastDescriptionWithTx>,
      );
      getLastCourseHandler();
    }
  };

  const purchaseCourseHandler = async () => {
    const { contract } = data;

    let courseId = "";
    for (let i = 0; i < 4; i++) {
      courseId += random(0, 9);
    }

    if (contract) {
      return contract.purchaseCourse(+courseId, { coursePrice });
    }
  };

  const getLastCourseHandler = async () => {
    try {
      const { contract } = data;

      if (contract) {
        const coursesLength = await contract.getCourseCount();
        const lastCourseHash = await contract.getCourseHashAtIndex(coursesLength - 1);
        const lastCourse: Course = await contract.getCourseByHash(lastCourseHash);
        const course: NormalizedCourse = {
          id: formatBigNumber(lastCourse.id, 0, 0),
          price: formatBigNumber(lastCourse.price),
          proof: lastCourse.proof,
          owner: lastCourse.owner,
          state: lastCourse.state,
        };

        setData(prev => ({ ...prev, lastCourse: course }));
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return { data, pendingTx, onApprove, onPurchaseCourse, getLastCourseHandler };
};
export default useContractData;
