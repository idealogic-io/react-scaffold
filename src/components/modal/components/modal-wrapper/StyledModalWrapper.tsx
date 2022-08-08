import styled from "styled-components";

export const StyledModalWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary}30;
  position: fixed;
  top: 0;
  left: 0;
  display: -webkit-box;
  overflow: auto;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndices.modal};
  cursor: pointer;
`;

export const StyledModalContainer = styled.div`
  margin: 24px;
`;
