import { Account } from '@types';
import { Block } from 'common/components/layout/Block/Block';
import { PageHeader } from 'common/components/PageHeader/PageHeader';
import { Link, useMatch } from 'react-location';
import s from './AccountsPage.module.scss';

function AccountPage(): React.ReactElement {
  const {
    data: { accounts },
    // params: { accountId },
  } = useMatch();

  const renderAccounts = (accounts as Account[]).map((account: Account) => {
    return (
      <div className={s.wrapper} key={account.id}>
        <Link to={`/account/${account.id}`} className={s.link}>
          <div>
            <p>{account.name}</p>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <>
      <PageHeader title="Bank Accounts" />
      <Block>
        <div>{JSON.stringify(accounts)}</div>
      </Block>

      <div>{renderAccounts}</div>
    </>
  );
}
export default AccountPage;
