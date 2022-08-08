import React, { useState } from "react";
import { Skeleton, Box } from "components";

export default {
  title: "Components/Skeleton",
};

export const Default = () => {
  return <Skeleton />;
};

export const Circle = () => {
  return (
    <>
      <Box my="16px">
        <Skeleton width="100px" height="100px" variant="circle" />
      </Box>

      <Box>
        <Skeleton width="100px" height="100px" variant="circle" animation="waves" />
      </Box>
    </>
  );
};

export const Square = () => {
  return (
    <>
      <Box my="16px">
        <Skeleton width="100px" height="100px" />
      </Box>

      <Box>
        <Skeleton width="100px" height="100px" animation="waves" />
      </Box>
    </>
  );
};

export const ParentSize = () => {
  return (
    <Box width="200px">
      <Skeleton />
    </Box>
  );
};

export const WithData = () => {
  const [isLoading, setLoading] = useState(true);

  const width = 100;
  const height = 100;

  return (
    <Box>
      {!isLoading && <Skeleton width={width} height={height} />}
      <img
        style={{ display: !isLoading ? "block" : "none" }}
        width={width}
        height={height}
        src="https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        onLoad={() => setLoading(false)}
      />
    </Box>
  );
};
