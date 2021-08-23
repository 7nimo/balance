export class CreateBankAccountDto {
  name: string;
  sortCode?: number;
  accountNumber: number;
  bankId: number;
  currencyId: number;
}
