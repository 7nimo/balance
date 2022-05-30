import { Content, Layout } from 'components/_Layout/Layout';
import { useAccount } from 'core/api/account';
import React from 'react';
import { Outlet, useMatch } from 'react-location';
import { LocationGenerics } from 'routes';

import AccountHeader from './components/AccountHeader/AccountHeader';

function AccountContainer (): React.ReactElement {
  const { params: { accountId } } = useMatch<LocationGenerics>();
  const { data: account } = useAccount(accountId);

  return (
    <Layout>
      <Content>
        <AccountHeader
          currency={account?.currency}
          title={account?.name}
        />

        <Outlet />
      </Content>
    </Layout>
  );
}

export default AccountContainer;
