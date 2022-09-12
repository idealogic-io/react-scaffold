import React from "react";
import styled from "styled-components";

import { Box, Column, Flex } from "components";
import { useTooltip } from "hooks";

export default {
  title: "Hooks/useTooltip",
};

const StyledBox = styled(Flex)`
  width: 100px;
  height: 100px;
  background-color: pink;
  margin: 100px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const StyledEllipsis = styled(Box)`
  width: 100px;
  height: 100px;
  background-color: pink;
  margin: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Default: React.FC = () => {
  const { targetRef, tooltip } = useTooltip("Custom text");
  const { targetRef: targetText, tooltip: tooltipText } = useTooltip(undefined);
  const { targetRef: targetEllipsis, tooltip: tooltipEllipsis } = useTooltip(undefined, { trigger: "click" });
  const { targetRef: targetPosition, tooltip: tooltipPosition } = useTooltip("Top position", { placement: "top" });
  const { targetRef: targetTriggerClick, tooltip: tooltipTriggerClick } = useTooltip("Click me", { trigger: "click" });

  return (
    <Column>
      <>
        <StyledBox ref={targetPosition} />
        {tooltipPosition}
      </>

      <>
        <StyledBox ref={targetRef} />
        {tooltip}
      </>

      <>
        <StyledBox ref={targetTriggerClick}>Click Me</StyledBox>
        {tooltipTriggerClick}
      </>

      <>
        <StyledBox ref={targetText}>Hover me</StyledBox>
        {tooltipText}
      </>

      <>
        <StyledEllipsis ref={targetEllipsis}>Hover me Hover me Hover me Hover me Hover me Hover me</StyledEllipsis>
        {tooltipEllipsis}
      </>
    </Column>
  );
};
