import { Box, Column, Text } from "components";
import { useThemeContext } from "context";

export default {
  title: "Assets/Fonts",
};

export const Fonts: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <Column>
      {Object.values(theme.fonts).map(fontFamily => {
        return (
          <Box key={fontFamily} mb="32px">
            {Object.values(theme.fontWeight).map(fontWeight => {
              return (
                <Text key={fontWeight} fontFamily={fontFamily} fontWeight={fontWeight}>
                  {fontFamily} {fontWeight}
                </Text>
              );
            })}
          </Box>
        );
      })}
    </Column>
  );
};
