import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTranslation } from "react-i18next";

import { FlexGap, Button, Text, Loader, Image } from "components";
import { WarningV2Icon } from "components/svg";

import { truncateHash } from "utils";

const WalletButton: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "WalletButton" });

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <FlexGap flexDirection="row" gap="16px" alignItems="center">
            {!ready && (
              <Button scale="md">
                <Loader width="16px" />
              </Button>
            )}

            {ready && !connected && (
              <Button scale="md" onClick={openConnectModal}>
                {t("connect")}
              </Button>
            )}

            {ready && connected && (
              <Button scale="md" onClick={openChainModal}>
                {chain.hasIcon && chain.iconUrl && !chain.unsupported ? (
                  <Image src={chain.iconUrl} aspectRatio={1} width="16px" />
                ) : (
                  <WarningV2Icon width="16px" />
                )}
              </Button>
            )}

            {ready && connected && chain.unsupported && <Text textScale="body3">{t("unsupported")}</Text>}

            {ready && connected && !chain.unsupported && (
              <Button scale="md" onClick={openAccountModal}>
                {truncateHash(account.address, 4, 4)}
              </Button>
            )}
          </FlexGap>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletButton;
