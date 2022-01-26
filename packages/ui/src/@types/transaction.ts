export type Transaction = {
  id: number;
  transactionDate: string;
  transactionDesc: string;
  transactionType: string;
  debitAmount: string;
  creditAmount: string;
  balance: string;
  account: string;
};

export type Transactions = {
  transactions: Transaction[];
};
