
import styled, { css } from 'styled-components';

export const Buttons = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);

  & > button:not(:last-child) {
    margin-left: 1rem;
  }
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: 64px;
  min-height: 36px;
  border: none;

  color: var(--icon-color-accent);
  font-weight: bold;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  padding: 0 16px;

  transition: all 0.2s ease;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 4px;
    content: '';
    background-color: currentColor;
    opacity: .04;
  }

  &:hover{
    &::before {
      opacity: .08;
    }
  }
  
  ${({ filled }: { filled?: boolean }) => filled && css`
    background-color: var(--icon-color-accent);
    color: var(--main-bg);

    &:hover::not(::disabled) {
      &::before {
        box-shadow: var(--icon-color-accent) 0px 0.9px 1.9px 0px, var(--icon-color-accent) 0px 0.9px 2.9px 0.9px;
        opacity: .1;
      }
    }
  `}

  &:disabled {
    cursor: auto;
  }
`;
