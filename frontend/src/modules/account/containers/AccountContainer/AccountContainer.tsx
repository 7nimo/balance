/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { Account, Transaction } from '@types';
import { useTransactions } from 'api/transaction';
import { TransactionsTable } from 'common/components/TransactionsTable/TransactionsTable';
import { SearchBar } from 'common/components/forms/SearchBar/SearchBar';
import { ActionBar } from 'common/containers/ActionBar/ActionBar';
import { useDebounce } from 'hooks/useDebounce';
import { useStore } from 'store/store';
import { useAccount } from 'api/account';
import { useMatch } from 'react-location';
import AccountHeader from 'modules/account/components/AccountHeader/AccountHeader';
import Block from 'common/components/layout/Block/Block';
import LineChartContainer from 'modules/charts/containers/LineChartContainer/LineChartContainer';

function AccountContainer(): React.ReactElement {
  const [query, setQuery] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

  const {
    data: { transactions },
    params: { accountId },
  } = useMatch();

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
      <AccountHeader title={account?.name} currency={account?.currency} />

      <Block>
        <LineChartContainer accountId={accountId} />
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

        <TransactionsTable transactions={transactions as Transaction[]} />
      </Block>
    </>
  );
}

export default AccountContainer;
