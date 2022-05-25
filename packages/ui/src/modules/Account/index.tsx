/* eslint-disable @typescript-eslint/no-shadow */
import { Transaction } from '@types';
import { Content, Layout } from 'components/_Layout/Layout';
import Block from 'components/box/Block/Block';
import { SearchBar } from 'components/forms/SearchBar/SearchBar';
import { useDebounce } from 'hooks/useDebounce';
import { ActionBar } from 'modules/Account/TransactionsTable/ActionBar/ActionBar';
import TransactionsTable from 'modules/Account/TransactionsTable/TransactionsTable';
import LineChart from 'modules/Charts/LineChart/LineChart';
import React, { useEffect, useState } from 'react';
import { useMatch } from 'react-location';
import { LocationGenerics } from 'routes';

import AccountHeader from './AccountHeader/AccountHeader';

function AccountContainer (): React.ReactElement {
  const { data: { account, transactions } } = useMatch<LocationGenerics>();

  // !search
  const [query, setQuery] = useState<string>('');
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[] | null>(null);

  const search = (query: string): void => {
    const q = query.toLowerCase();
    const result: Transaction[] = transactions!.filter((transaction) => {
      return transaction.transactionDesc.toLowerCase().includes(q);
    });

    setFilteredTransactions(result);
  };

  const debouncedSearch = useDebounce((query) => search(query), 1000, transactions);

  const handleChange = (query: string): void => {
    setQuery(query);

    if (transactions && query !== '') {
      debouncedSearch(query);
    }
  };

  // reset transactions when search query is empty
  useEffect(() => {
    if (transactions && query === '') setFilteredTransactions(transactions);
  }, [query, transactions]);

  return (
    <Layout>
      <Content>
        <AccountHeader
          currency={account?.currency}
          title={account?.name}
        />

        {/* <Outlet /> */}
        <Block>
          <LineChart />
        </Block>

        <Block title='Transactions'>
          <ActionBar>
            <SearchBar
              handleChange={(e) => handleChange(e.target.value)}
              handleReset={() => setQuery('')}
              placeholder='Search'
              value={query}
            />
          </ActionBar>

          <TransactionsTable transactions={filteredTransactions } />
        </Block>
      </Content>
    </Layout>
  );
}

export default AccountContainer;

// useEffect(() => {
//   return () => {
//     debouncedSearch.cancel();
//   };
// }, [debouncedSearch]);
