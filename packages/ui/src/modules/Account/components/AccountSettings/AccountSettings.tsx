import Block from 'components/box/Block/Block';
import AccountDetailsForm from 'modules/Account/forms/AccountDetailsForm/AccountDetailsForm';
import React from 'react';
import { useMatch } from 'react-location';
import styled from 'styled-components';

import Dropzone from '../../forms/ImportTransactionsForm/Dropzone';

export default function AccountSettings (): React.ReactElement {
  const { params: { accountId } } = useMatch();

  return (
    <>
      <Block title='Settings'>
        <Inner>
          <AccountDetailsForm />
          <Dropzone accountId={accountId} />
        </Inner>
      </Block>
    </>
  );
}

const Inner = styled.div`
  border-top: 1px solid var(--line);
  padding: 24px;
`;
