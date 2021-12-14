/* eslint-disable @typescript-eslint/no-shadow */
import { FC, useEffect, useMemo, useState } from 'react';
import { Account, Transaction } from '@types';
import { useTransactions } from 'api/transaction';
import { capitalize } from 'common/utils/helpers';
import { PageHeader } from 'common/components/PageHeader/PageHeader';
import { TransactionsTable } from 'common/components/TransactionsTable/TransactionsTable';
import { SearchBar } from 'common/components/forms/SearchBar/SearchBar';
import { ActionBar } from 'common/containers/ActionBar/ActionBar';
import { Block } from 'common/components/layout/Block/Block';
import { debounce } from 'lodash';

type Props = {
  account?: Account;
};

export const AccountContainer: FC<Props> = ({ account }) => {
  const [query, setQuery] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { data } = useTransactions(account!.id, (initialData) => {
    setTransactions(initialData.transactions);
  });

  useEffect(() => {
    if (data && query === '') setTransactions(data.transactions);
  }, [query, data]);

  const debouncedSearch = useMemo(
    () =>
      debounce((q: string): void => {
        if (data) {
          const query = q.toLowerCase();
          const result: Transaction[] = data.transactions.filter((transaction) =>
            transaction.transactionDesc.toLowerCase().includes(query)
          );
          setTransactions(result);
        }
      }, 1000),
    [data]
  );

  const handleChange = (query: string): void => {
    setQuery(query);
    debouncedSearch(query);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <>
      <PageHeader title={capitalize(account!.name)} />

      <Block title="Transactions">
        <ActionBar>
          <SearchBar
            placeholder="Search"
            value={query}
            handleChange={(e) => handleChange(e.target.value)}
            handleReset={() => setQuery('')}
          />
          <p style={{ marginLeft: 'auto' }}>Query: {query}</p>
        </ActionBar>

        <section>
          <TransactionsTable transactions={transactions} />
        </section>
      </Block>
    </>
  );
};
