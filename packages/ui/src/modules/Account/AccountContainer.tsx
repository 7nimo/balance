import { Content, Layout } from 'components/_Layout/Layout';
import React from 'react';
import { Outlet, useMatch } from 'react-location';
import { LocationGenerics } from 'routes';

import AccountHeader from './components/AccountHeader/AccountHeader';

function AccountContainer (): React.ReactElement {
  const { data: { account } } = useMatch<LocationGenerics>();

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
