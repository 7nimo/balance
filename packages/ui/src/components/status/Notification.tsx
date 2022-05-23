import React from 'react';
import styled from 'styled-components';
import { string } from 'yup';

const Wrapper = styled.div`

  border: 0px solid rgb(229, 231, 235);
  background-color: rgba(31,41,55,1);
  border-top-width: 4px;
  border-left-width: 4px;
  border-color: rgba(255,66,85,1);

  border-radius: 0.5rem;

  max-width: 768px;
  height: 150px;

  margin: 2rem auto;
  padding: 2rem;
`;

type Props = {
  title?: string;
  description?: string;
}

function Notification ({ description, title }: Props): React.ReactElement<Props> {
  if (!description || !title) {
    return <></>;
  }

  return (
    <Wrapper>{ description }</Wrapper>
  );
}

export default Notification;
