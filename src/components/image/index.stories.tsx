import { Image, Flex, Column } from "components";
import BackgroundImage from "./BackgroundImage";

export default {
  title: "Assets/Images",
};

// TODO this images are test so ypu can delete them
const context = require.context("../../../public/images/", true, /.webp$/);

export const Images = () => {
  return (
    <Column>
      {context.keys().map((el, i) => {
        const img = el.replace("./", "");

        return (
          <Flex key={i} m="8px" justifyContent="center" width="100%">
            <Image
              src={`/images/${img}`}
              width={{ _: "200px", tablet: "500px" }}
              aspectRatio={{ _: 0.8733, tablet: 0.8 }}
            />
          </Flex>
        );
      })}
    </Column>
  );
};

export const BackgroundImages = () => {
  return (
    <Flex m="8px" justifyContent="center" width="100%">
      <BackgroundImage
        src="https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVhdXRpZnVsJTIwbGFuZHNjYXBlfGVufDB8fDB8fHww&w=1000&q=80"
        width="1000px"
        aspectRatio={1.55}
      />
    </Flex>
  );
};
