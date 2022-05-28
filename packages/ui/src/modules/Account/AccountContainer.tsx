import { Content, Layout } from 'components/_Layout/Layout';
import { useAccount } from 'core/api/account';
import React, { useEffect, useState } from 'react';
import { Outlet, useMatch } from 'react-location';
import { LocationGenerics } from 'routes';

import AccountHeader from './components/AccountHeader/AccountHeader';

function AccountContainer (): React.ReactElement {
  const { data: { account }, params: { accountId } } = useMatch<LocationGenerics>();
  const { data } = useAccount(accountId);

  const [acc, setAccount] = useState(account);

  useEffect(() => {
    if (data?.account) setAccount(data?.account);
  }, [data]);

  return (
    <Layout>
      <Content>
        <AccountHeader
          currency={acc?.currency}
          title={acc?.name}
        />

        <Outlet />
      </Content>
    </Layout>
  );
}

export default AccountContainer;
