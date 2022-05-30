import { Transaction } from '@types';
import Block from 'components/box/Block/Block';
import { useTransactions } from 'core/api/transaction';
import { useDebounce } from 'hooks/useDebounce';
import { SearchBar } from 'modules/Account/components/SearchBar/SearchBar';
import LineChart from 'modules/Charts/LineChart/LineChart';
import React, { useEffect, useState } from 'react';
import { useMatch } from 'react-location';
import { LocationGenerics } from 'routes';

import { SearchWrapper } from './components/TransactionsTable/SearchWrapper';
import TransactionsTable from './components/TransactionsTable/TransactionsTable';

export default function AccountOverview (): React.ReactElement {
  const { params: { accountId } } = useMatch<LocationGenerics>();
  const { data: { _account, _transactions } } = useMatch<LocationGenerics>();

  const { data: transactions } = useTransactions(accountId);

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
    <>
      <Block>
        <LineChart />
      </Block>

      <Block title='Transactions'>
        <SearchWrapper>
          <SearchBar
            handleChange={(e) => handleChange(e.target.value)}
            handleReset={() => setQuery('')}
            placeholder='Search'
            value={query}
          />
        </SearchWrapper>

        <TransactionsTable transactions={filteredTransactions} />
      </Block>
    </>
  );
}

// useEffect(() => {
//   return () => {
//     debouncedSearch.cancel();
//   };
// }, [debouncedSearch]);
