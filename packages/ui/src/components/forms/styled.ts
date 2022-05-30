import styled from 'styled-components';

export const FieldError = styled.div`
  position: absolute;
  font-size: 14px;
  font-weight: 550;
  color: var(--error);
  &::first-letter {
    text-transform: capitalize;
  }
`;

export const FieldAlert = styled.div`
  position: absolute;
  font-size: 14px;
  font-weight: 550;
  color: var(--alert);
  &::first-letter {
    text-transform: capitalize;
  }
`;
