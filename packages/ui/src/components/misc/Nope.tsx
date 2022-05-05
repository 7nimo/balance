import React from 'react';
import styled from 'styled-components';

import SvgTrash from '../icons/Trash';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 200px;
  margin: 25% 0;

  h1 {
    margin: 2rem 0;
  }
`;

function Nope (): React.ReactElement {
  return (
    <Wrapper>
      <h1>Nothing to see here...</h1>
      <SvgTrash />
    </Wrapper>
  );
}

export default Nope;
