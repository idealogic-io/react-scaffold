import { Image, Flex, Column } from "components";

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
            <Image src={`/images/${img}`} width="31rem" height="auto" skeletonHeight="34rem" />
          </Flex>
        );
      })}
    </Column>
  );
};
