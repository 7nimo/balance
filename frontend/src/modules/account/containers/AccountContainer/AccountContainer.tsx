import { FC, useEffect, useMemo, useRef, useState } from 'react';
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

export function usePrevious(value: any): any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const AccountContainer: FC<Props> = ({ account }) => {
  const [query, setQuery] = useState<string>('');
  const prevQuery = usePrevious(query);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { data } = useTransactions(account!.id, (initialData) => {
    setTransactions(initialData.transactions);
  });

  useEffect(() => {
    if (data && query === '') setTransactions(data.transactions);
  }, [query, data]);

  const search = (): void => {
    if (data) {
      const value = query.toLowerCase();
      const result: Transaction[] = data.transactions.filter((transaction) =>
        transaction.transactionDesc.toLowerCase().includes(value)
      );
      console.log('search: ', result);
      setTransactions(result);
    }
  };

  // const debouncedSearch = debounce(search, 1000);
  const debouncedSearch = useMemo(() => debounce(search, 1000), [search]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  useEffect(() => {
    if (data && query && query !== prevQuery) {
      console.log(prevQuery);
      debouncedSearch();
    }
  }, [debouncedSearch, data, query, prevQuery]);

  return (
    <>
      <PageHeader title={capitalize(account!.name)} />

      <Block title="Transactions">
        <ActionBar>
          <SearchBar
            placeholder="Search"
            value={query}
            handleChange={(e) => setQuery(e.target.value)}
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
