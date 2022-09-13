import styled from "styled-components";

import { AutoRow, Flex, Button, Heading, Page, Text } from "components";
import { useThemeContext } from "context";
import { Colors } from "theme/types";

export default {
  title: "Context/ThemeContext",
};

const Color = styled(Flex)<{ bgColor: keyof Colors }>`
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: ${({ theme, bgColor }) => bgColor && theme.colors[bgColor]};
  margin: 10px;
`;

export const ThemeContext = () => {
  const { theme, key, toggleTheme } = useThemeContext();

  return (
    <Page>
      <Heading>Current theme is: {key}</Heading>
      <Button onClick={toggleTheme}>Toggle theme</Button>

      <Text my="12px">Colors: </Text>

      <AutoRow>
        {Object.keys(theme.colors).map(color => (
          <Color key={color} bgColor={color as keyof Colors}>
            <Text>{color}</Text>
          </Color>
        ))}
      </AutoRow>
    </Page>
  );
};
