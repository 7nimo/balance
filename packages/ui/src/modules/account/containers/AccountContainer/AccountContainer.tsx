/* eslint-disable @typescript-eslint/no-shadow */
import Block from '@components/Block/Block';
import { SearchBar } from '@components/forms/SearchBar/SearchBar';
import TransactionsTable from '@components/TransactionsTable/TransactionsTable';
import { useAccount } from '@core/api/account';
import { useTransactions } from '@core/api/transaction';
import { useStore } from '@core/store/store';
import { Account, Transaction } from '@types';
import { ActionBar } from 'common/containers/ActionBar/ActionBar';
import { useDebounce } from 'hooks/useDebounce';
import LineChartContainer from 'modules/charts/containers/LineChartContainer/LineChartContainer';
import React, { useEffect, useState } from 'react';
import { useMatch } from 'react-location';

import AccountHeader from '../../components/AccountHeader/AccountHeader';

function AccountContainer (): React.ReactElement {
  const [query, setQuery] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

  const { data: { transactions },
    params: { accountId } } = useMatch();

  const { data: accountData } = useAccount(accountId);

  const [assets, setAssetData] = useStore((state) => [state.assets, state.setAssetD3Data]);

  const { data } = useTransactions(accountId, (initialData) => {
    setTransactions(initialData.transactions);
    setAssetData(accountId, initialData.transactions, assets);
  });

  useEffect(() => {
    if (data && query === '') setTransactions(data.transactions);
  }, [query, data]);

  // temporary hack
  const search = (query: string): void => {
    const q = query.toLowerCase();
    const result: Transaction[] = data
      ? data.transactions.filter((transaction) => {
        return transaction.transactionDesc.toLowerCase().includes(q);
      })
      : [];

    setTransactions(result);
  };

  const debouncedSearch = useDebounce((query) => search(query), 1000, data);

  const handleChange = (query: string): void => {
    setQuery(query);

    if (data && query !== '') {
      debouncedSearch(query);
    }
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    if (accountData !== undefined && !account) {
      setAccount(accountData.account);
    }
  }, [accountData, account]);

  return (
    <>
      <AccountHeader
        currency={account?.currency}
        title={account?.name}
      />

      <Block>
        <LineChartContainer accountId={accountId} />
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

        {_transactions}
        <TransactionsTable transactions={transactions as Transaction[]} />
      </Block>
    </>
  );
}

export default AccountContainer;
