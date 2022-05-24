import { Bank } from './bank';
import { Currency } from './currency';

export type ContextData = {
  banks: Bank[];
  currency: Currency[];
}
