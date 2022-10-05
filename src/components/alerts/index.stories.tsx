import { useState } from "react";
import { toast } from "react-toastify";

import { Text, Button, Column, Box } from "components";
import {
  AlertTextWithDescription,
  AlertBanner,
  toastOptionsSuccess,
  toastOptionsError,
  toastOptionsInfo,
  toastOptionsWarning,
} from "components";

export default {
  title: "Components/Alerts",
};

export const Alerts: React.FC = () => {
  const successCall = () => {
    toast.success(<AlertTextWithDescription text="Hello" />, { ...toastOptionsSuccess });
  };

  const errorCall = () => {
    toast.error(<AlertTextWithDescription text="Hello" description="This is a description" />, {
      ...toastOptionsError,
      autoClose: false,
    });
  };

  const warningCall = () => {
    toast.warning(
      <AlertTextWithDescription text="Hello">
        <Text>This is a child</Text>
      </AlertTextWithDescription>,
      {
        ...toastOptionsWarning,
        autoClose: false,
      },
    );
  };

  const infoCall = () => {
    toast.info(
      <AlertTextWithDescription text="Hello" description="This is a description">
        <Text>This is a child</Text>
      </AlertTextWithDescription>,
      {
        ...toastOptionsInfo,
        autoClose: false,
      },
    );
  };

  const ordinaryCall = () => {
    toast("Hello");
  };

  return (
    <Column>
      <Button onClick={successCall} my="8px">
        Success
      </Button>
      <Button onClick={errorCall} my="8px">
        Error
      </Button>
      <Button onClick={warningCall} my="8px">
        Warning
      </Button>
      <Button onClick={infoCall} my="8px">
        Info
      </Button>
      <Button onClick={ordinaryCall} my="8px">
        Ordinary
      </Button>
    </Column>
  );
};

export const AlertBanners: React.FC = () => {
  const [visible, setVisible] = useState(true);

  return (
    <Column>
      <Box>
        <AlertBanner text="This is a success alert" />
      </Box>

      <Box my="8px" width="75%">
        <AlertBanner text="This is an error alert" description="This is a description" variant="error" />
      </Box>

      <Box my="8px" width="50%">
        <AlertBanner text="This is a warning alert" variant="warning">
          <Text>This is a child</Text>
        </AlertBanner>
      </Box>

      <Box my="8px" width="25%">
        <AlertBanner
          text="This is a warning alert"
          description="This is a description"
          variant="info"
          visible={visible}
          onCloseClick={() => setVisible(false)}
        >
          <Text>This is a child</Text>
        </AlertBanner>
      </Box>
    </Column>
  );
};
