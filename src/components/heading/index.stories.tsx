import { Box, Heading } from "components";
import { Scales, scales } from "./types";

export default {
  title: "Components/Headings",
};

export const Headings: React.FC = () => {
  return (
    <>
      <Box my="16px">
        {Object.values(scales).map((scale, indx) => {
          return (
            <Heading key={indx} scale={scale as Scales} as={scale as Scales}>
              {`${scale.toUpperCase()}`}
            </Heading>
          );
        })}
      </Box>
    </>
  );
};
