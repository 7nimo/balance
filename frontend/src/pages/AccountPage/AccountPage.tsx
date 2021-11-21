import { useParams } from 'react-router-dom';
import { AccountContainer } from 'modules/account/containers/AccountContainer/AccountContainer';
import { useAccounts } from 'api/account';

export default function AccountPage(): JSX.Element {
  const { id } = useParams<string>();
  const { data } = useAccounts();

  if (data && id) {
    const result = data.accounts.find((account) => account.id === id);

    return <AccountContainer account={result} />;
  }

  return <div>loading...</div>;
}
