import styled, { css } from 'styled-components';

type DropAreaProps = { isDragActive: boolean }

export const DropArea = styled.div`
  display: grid;
  place-items: center;
  padding: 48px 0;
  background-image: var(--grad90), var(--grad90), var(--grad0), var(--grad0);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 15px 2px, 15px 2px, 2px 15px, 2px 15px;
  background-position: left top, right bottom, left bottom, right top;
  transition: all .24s ease-in-out;

  background-color: rgba(193, 198, 207, .09);
  color: #bdbdbd;

  outline: none;
  cursor: pointer;

  ${({ isDragActive }: DropAreaProps) => isDragActive && css`
    background-image: var(--c-grad90), var(--c-grad90), var(--c-grad0), var(--c-grad0);
    animation: border-dance 1s infinite linear;

    @keyframes border-dance {
      0% {
        background-position: left top, right bottom, left bottom, right top;
      }
      100% {
        background-position: left 15px top,right 15px bottom, left bottom 15px, right top 15px;
      }
    }
  `}
`;
