import React from "react";
import { Skeleton, Box, Column } from "components";

export default {
  title: "Components/Skeletons",
};

export const Skeletons: React.FC = () => {
  return (
    <Column>
      <Skeleton my="8px" />

      <Skeleton my="8px" width="100px" height="100px" variant="circle" />

      <Skeleton my="8px" width="100px" height="100px" variant="circle" animation="waves" />

      <Skeleton my="8px" width="100px" height="100px" />

      <Skeleton my="8px" width="100px" height="100px" animation="waves" />

      <Box my="8px" width="200px">
        <Skeleton />
      </Box>
    </Column>
  );
};
