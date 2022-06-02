import styled from 'styled-components';

type Props = {
  size?: number;
};

export const Spinner = styled.div`
  display: block;
  height: 1em;
  width: 1em;
  border: 4px var(--opacity) solid;
  border-top: 4px var(--h-color) solid;
  border-radius: 50%;
  animation: spin 1s infinite linear;
  font-size: ${({ size }: Props) => size ? `${size}px` : '1rem'};
`;
