import React from 'react';
import styled from 'styled-components';

type Props = {
  onClose: () => void;
  text: string;
}

const Wrapper = styled.div`
  background: rgba(248, 80, 70, .7);
  border-radius: 8px;
  border 1px solid var(--red-dark);

  padding: 6px;
  margin-bottom: 1rem;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  color: white;
  padding: 0 8px;
  
  button {
    height: 24px;
    background: none;
    border-style: none;
    padding: 0;
    text-align: center;
    margin-left: auto;

    cursor: pointer;
  }
`;

function ErrorMessage ({ onClose, text }: Props): React.ReactElement<Props> {
  return (
    <Wrapper>
      <Inner>
        {text}
        <button
          onClick={onClose}
          type='button'
        >
          <svg
            fill='none'
            height='24px'
            viewBox='0 0 24 24'
            width='24px'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6.22566 4.81096C5.83514 4.42044 5.20197 4.42044 4.81145 4.81096C4.42092 5.20148 4.42092 5.83465 4.81145 6.22517L10.5862 11.9999L4.81151 17.7746C4.42098 18.1651 4.42098 18.7983 4.81151 19.1888C5.20203 19.5793 5.8352 19.5793 6.22572 19.1888L12.0004 13.4141L17.7751 19.1888C18.1656 19.5793 18.7988 19.5793 19.1893 19.1888C19.5798 18.7983 19.5798 18.1651 19.1893 17.7746L13.4146 11.9999L19.1893 6.22517C19.5799 5.83465 19.5799 5.20148 19.1893 4.81096C18.7988 4.42044 18.1657 4.42044 17.7751 4.81096L12.0004 10.5857L6.22566 4.81096Z'
              fill='var(--gray0)'
            />
          </svg>
        </button>
      </Inner>
    </Wrapper>
  );
}

export default ErrorMessage;
