export class CreateAccountDto {
  name: string;
  sortCode?: number;
  accountNumber: number;
  bankId: number;
  currencyId: number;
}
