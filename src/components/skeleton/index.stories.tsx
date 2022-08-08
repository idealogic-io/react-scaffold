import React, { useState } from "react";
import { Skeleton, Box } from "components";

export default {
  title: "Components/Skeleton",
};

export const Default: React.FC = () => {
  return <Skeleton />;
};

export const Circle: React.FC = () => {
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

export const Square: React.FC = () => {
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

export const ParentSize: React.FC = () => {
  return (
    <Box width="200px">
      <Skeleton />
    </Box>
  );
};

export const WithData: React.FC = () => {
  const [isLoading, setLoading] = useState(true);

  const width = "100px";
  const height = "100px";

  return (
    <Box>
      {isLoading && <Skeleton width={width} height={height} />}
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
