import { Transaction } from '@types';
import React from 'react';

import Spinner from '../../../components/status/Spinner/Spinner';
import s from './TransactionsTable.module.scss';

type Props = {
  transactions?: Transaction[] | null;
};

function TransactionsTable ({ transactions = null }: Props): React.ReactElement<Props> {
  if (!transactions || !transactions?.length) {
    return (
      <div className={s.emptyTable}>
        {transactions === null ? <Spinner size={48} /> : <p>Hmmm, can&apos;t find anything!</p>}
      </div>
    );
  }

  const renderTransactions = transactions?.map((transaction) => {
    return (
      <tr
        className={s.row}
        key={transaction.id.toString()}
      >
        <td className={s.date}>
          <div>{transaction.transactionDate}</div>
        </td>
        <td className={s.desc}>
          <div>{transaction.transactionDesc}</div>
        </td>
        <td className={s.type}>
          <div>{transaction.transactionType}</div>
        </td>
        <td className={s.amount}>
          <div>{Math.round((+transaction.creditAmount + Number.EPSILON) * 100) / 100}</div>
        </td>
        <td className={s.amount}>
          <div>{Math.round((+transaction.debitAmount + Number.EPSILON) * 100) / 100}</div>
        </td>
        <td className={s.balance}>
          <div>{Math.round((+transaction.balance + Number.EPSILON) * 100) / 100}</div>
        </td>
      </tr>
    );
  });

  return (
    <table className={s.transactionsTable}>
      <thead className={s.head}>
        <tr className={s.row}>
          <th>
            <div>Date</div>
          </th>
          <th>
            <div>Description</div>
          </th>
          <th>
            <div>Type</div>
          </th>
          <th>
            <div>Credit</div>
          </th>
          <th>
            <div>Debit</div>
          </th>
          <th>
            <div>Balance</div>
          </th>
        </tr>
      </thead>
      <tbody className={s.body}>{renderTransactions}</tbody>
    </table>
  );
}

export default TransactionsTable;
