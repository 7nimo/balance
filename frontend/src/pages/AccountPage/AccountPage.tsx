import { useParams } from 'react-router-dom';
import { AccountContainer } from 'modules/account/containers/AccountContainer/AccountContainer';
import { useAccounts } from 'api/account';

export default function AccountPage(): JSX.Element {
  const { id } = useParams<string>();
  const { data } = useAccounts();

  // todo: handle no accounts created for fresh account

  if (data && id) {
    const account = data.accounts.find((acc) => acc.id === id);

    if (account) {
      return <AccountContainer account={account} />;
    }
  }

  return <div>loading...</div>;
}
