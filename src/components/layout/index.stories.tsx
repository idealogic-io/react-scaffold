import styled from "styled-components";
import {
  Box,
  Column,
  Container,
  Flex,
  Text,
  FlexLayout,
  FlexGap,
  Page,
  Heading,
  Row,
  RowBetween,
  RowFlat,
  AutoRow,
} from "components";

export default {
  title: "Components/Layout",
};

const Square = styled(Box)`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: pink;
  margin: 10px;
`;

export const Columns: React.FC = () => {
  return (
    <Box>
      <Text textAlign="center">Column align center</Text>
      <Column alignItems="center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Square key={i} />
        ))}
      </Column>
    </Box>
  );
};

export const Boxes: React.FC = () => {
  return (
    <>
      <Text>Box with custom props</Text>
      <Box width="200px" $backgroundColor="monochrome500" height="200px" ml="24px" px="50px" py="24px">
        <Square />
      </Box>
    </>
  );
};

export const Containers: React.FC = () => {
  return (
    <>
      <Text textAlign="center">Container for page content</Text>
      <Container $backgroundColor="monochrome500">
        <Square />
      </Container>
    </>
  );
};

export const Flexes: React.FC = () => {
  return (
    <Box>
      <>
        <Text textAlign="center">Flex</Text>
        <Flex flex={1} justifyContent="center">
          <Square />
        </Flex>
      </>
      <>
        <Text textAlign="center">Flex layout</Text>
        <FlexLayout>
          {Array.from({ length: 5 }).map((_, i) => (
            <Square key={i} />
          ))}
        </FlexLayout>
      </>
      <>
        <Text textAlign="center">Flex Gap</Text>

        <FlexGap rowGap="20px" columnGap="4px" flexWrap="wrap" justifyContent="center">
          {Array.from({ length: 20 }).map((_, i) => (
            <Square m="0px !important" key={i} />
          ))}
        </FlexGap>
      </>
    </Box>
  );
};

export const Pages: React.FC = () => {
  return (
    <Page>
      <Heading>This is the heading in a page</Heading>
      <Text>You should use Page component in every page</Text>
    </Page>
  );
};

export const Rows: React.FC = () => {
  return (
    <>
      <Row>
        <Square>
          <Text>Box in a row</Text>
        </Square>
        <Square>
          <Text>Box in a row</Text>
        </Square>
      </Row>

      <RowBetween>
        <Square>
          <Text>Space</Text>
        </Square>

        <Square>
          <Text>Between</Text>
        </Square>
      </RowBetween>

      <RowFlat>
        <Text>Align</Text>
        <Square>
          <Text>Box</Text>
        </Square>
        <Text>To bottom</Text>
      </RowFlat>

      <AutoRow gap="12px">
        {Array.from({ length: 20 }).map((_, i) => (
          <Square m="0px !important" key={i}>
            <Text>Auto row</Text>
          </Square>
        ))}
      </AutoRow>
    </>
  );
};
