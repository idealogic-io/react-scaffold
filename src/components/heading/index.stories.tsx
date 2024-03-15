import { Heading } from "components";
import { scales } from "./types";

export default {
  title: "Components/Headings",
};

export const Headings: React.FC = () => {
  return (
    <>
      {Object.values(scales).map(scale => {
        return (
          <div key={scale}>
            <Heading scale={scale} as={scale}>
              {scale}
            </Heading>
            <hr />
          </div>
        );
      })}
    </>
  );
};
