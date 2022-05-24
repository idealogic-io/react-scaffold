import styled from "styled-components";

export const ModalStyled = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndices.modal};
  cursor: pointer;
`;

export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
`;
