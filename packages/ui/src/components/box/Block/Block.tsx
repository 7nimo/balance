import React from 'react';
import styled from 'styled-components';

import Card from '../Card/Card';

interface SectionProps {
  title?: string;
  children: React.ReactNode;
}

function Block ({ children, title }: SectionProps): React.ReactElement {
  return (
    <Wrapper>
      <Card>
        {title ? <H3>{title}</H3> : null}
        {children}
      </Card>
    </Wrapper>
  );
}

export default Block;

const Wrapper = styled.div`
  margin: 1rem 0;
  width: clamp(360px, 80vw, 100%); 
`;

const H3 = styled.h3`
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  font-weight: 500; 
`;
