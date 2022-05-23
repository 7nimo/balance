/* eslint-disable @typescript-eslint/no-shadow */
import { AccountEntity, Transaction } from '@types';
import Block from 'components/box/Block/Block';
import { SearchBar } from 'components/forms/SearchBar/SearchBar';
import { useAccount } from 'core/api/account';
import { useTransactions } from 'core/api/transaction';
import { useDebounce } from 'hooks/useDebounce';
import { ActionBar } from 'modules/Account/TransactionsTable/ActionBar/ActionBar';
import TransactionsTable from 'modules/Account/TransactionsTable/TransactionsTable';
import LineChart from 'modules/Charts/LineChart/LineChart';
import React, { useEffect, useState } from 'react';
import { useMatch } from 'react-location';

import AccountHeader from './AccountHeader/AccountHeader';

function AccountContainer (): React.ReactElement {
  const [query, setQuery] = useState<string>('');
  const [_transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [account, setAccount] = useState<AccountEntity | null>(null);

  const { data: { transactions },
    params: { accountId } } = useMatch();

  const { data: accountData } = useAccount(accountId);

  // const [assets, setAssetData] = useStore((state) => [state.assets, state.setAssetD3Data]);

  const { data } = useTransactions(accountId, (initialData) => {
    setTransactions(initialData.transactions);
    // setAssetData(accountId, initialData.transactions, assets);
  });

  useEffect(() => {
    if (data && query === '') setTransactions(data.transactions);
  }, [query, data]);

  const search = (query: string): void => {
    const q = query.toLowerCase();
    const result: Transaction[] = (transactions as Transaction[]).filter((transaction) => {
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
        <LineChart accountId={accountId} />
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

        <TransactionsTable transactions={_transactions } />
      </Block>
    </>
  );
}

export default AccountContainer;
