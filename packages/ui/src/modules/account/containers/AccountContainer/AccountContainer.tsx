/* eslint-disable @typescript-eslint/no-shadow */
import { Account, Transaction } from '@types';
import { useAccount } from 'api/account';
import { useTransactions } from 'api/transaction';
import { SearchBar } from 'common/components/forms/SearchBar/SearchBar';
import Block from 'common/components/layout/Block/Block';
import TransactionsTable from 'common/components/TransactionsTable/TransactionsTable';
import { ActionBar } from 'common/containers/ActionBar/ActionBar';
import { useDebounce } from 'hooks/useDebounce';
import LineChartContainer from 'modules/charts/containers/LineChartContainer/LineChartContainer';
import React, { useEffect, useState } from 'react';
import { useMatch } from 'react-location';
import { useStore } from 'store/store';

import AccountHeader from '../../components/AccountHeader/AccountHeader';

function AccountContainer (): React.ReactElement {
  const [query, setQuery] = useState<string>('');
  const [, setTransactions] = useState<Transaction[] | null>(null);
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

  const search = (query: string): void => {
    const q = query.toLowerCase();
    const result: Transaction[] = data!.transactions.filter((transaction) => {
      return transaction.transactionDesc.toLowerCase().includes(q);
    });

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

        <TransactionsTable transactions={transactions as Transaction[]} />
      </Block>
    </>
  );
}

export default AccountContainer;
