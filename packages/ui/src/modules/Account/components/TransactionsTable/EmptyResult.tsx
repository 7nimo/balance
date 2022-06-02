import React from 'react';
import styled from 'styled-components';

function EmptyResult () {
  return (
    <Wrapper>
      <P>Hmmm, can&apos;t find anything!</P>
    </Wrapper>
  );
}

export default EmptyResult;

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  min-height: 300px;
`;

const P = styled.p`
  font-size: 1.5rem;
`;
