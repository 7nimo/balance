import styled from 'styled-components';

export const Dialog = styled.div`
  outline: currentcolor none medium;
  position: fixed;
  top: 50%;
  left: 50%;
  width: clamp(320px, 50vw, 680px);
  transform: translate(-50%, -50%);
  z-index: 100;

  /* background-color: rgb(54, 55, 58); */
  background-color: var(--main-bg);
  border-radius: 8px;
  box-shadow: var(--modal-shadow);
`;
