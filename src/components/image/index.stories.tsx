import { Image, AutoRow, Box } from "components";

export default {
  title: "Assets/Images",
};

// TODO this images are test so ypu can delete them
const context = require.context("../../../public/images/", true, /.webp$/);

export const Images = () => {
  return (
    <AutoRow>
      {context.keys().map((el, i) => {
        const img = el.replace("./", "");

        return (
          <Box key={i} m="8px">
            <Image src={`/images/${img}`} width="100px" height="100px" />
          </Box>
        );
      })}
    </AutoRow>
  );
};
