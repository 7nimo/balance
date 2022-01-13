import { Account } from '@types';
import SvgBank from 'common/components/icons/Bank';
import Block from 'common/components/layout/Block/Block';
import PageHeader from 'common/components/PageHeader/PageHeader';
import { Link, useMatch } from 'react-location';
import s from './AccountsPage.module.scss';
// import img from '../../assets/svg/lloyds.svg';

function AccountsPage(): React.ReactElement {
  const {
    data: { accounts },
  } = useMatch();

  const renderAccounts = (accounts as Account[]).map((account) => {
    return (
      <div className={s.wrapper} key={account.id}>
        <Link to={`/account/${account.id}`} className={s.link}>
          {/* <div>{img}</div> */}
          <div>
            <h3>{account.name}</h3>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <>
      <PageHeader title="Bank Accounts" icon={<SvgBank />} />
      <Block>
        <div>{JSON.stringify(accounts)}</div>
      </Block>

      <div>{renderAccounts}</div>
    </>
  );
}
export default AccountsPage;
