export class CreateBankAccountDto {
  name: string;
  sortCode?: number;
  accountNumber: number;
  currencyId: number;
}
