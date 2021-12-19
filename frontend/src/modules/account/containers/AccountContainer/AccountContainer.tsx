/* eslint-disable @typescript-eslint/no-shadow */
import { FC, useEffect, useState } from 'react';
import { Account, Transaction } from '@types';
import { useTransactions } from 'api/transaction';
import { capitalize } from 'common/utils/helpers';
import { PageHeader } from 'common/components/PageHeader/PageHeader';
import { TransactionsTable } from 'common/components/TransactionsTable/TransactionsTable';
import { SearchBar } from 'common/components/forms/SearchBar/SearchBar';
import { ActionBar } from 'common/containers/ActionBar/ActionBar';
import { Block } from 'common/components/layout/Block/Block';
import { useDebounce } from 'hooks/useDebounce';
import { useStore } from 'store/store';
import { LineChartContainer } from 'modules/charts/containers/LineChartContainer/LineChartContainer';

type Props = {
  account?: Account;
};

export const AccountContainer: FC<Props> = ({ account }) => {
  const [query, setQuery] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  const setData = useStore((state) => state.setData);

  const { data } = useTransactions(account!.id, (initialData) => {
    setTransactions(initialData.transactions);
    setData(initialData.transactions);
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

  return (
    <>
      <PageHeader title={capitalize(account!.name)} />

      <Block>
        <LineChartContainer />
      </Block>

      <Block title="Transactions">
        <ActionBar>
          <SearchBar
            placeholder="Search"
            value={query}
            handleChange={(e) => handleChange(e.target.value)}
            handleReset={() => setQuery('')}
          />
        </ActionBar>

        <section>
          <TransactionsTable transactions={transactions} />
        </section>
      </Block>
    </>
  );
};
