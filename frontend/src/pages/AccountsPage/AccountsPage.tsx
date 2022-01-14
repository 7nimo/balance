import { Account } from '@types';
import SvgBank from 'common/components/icons/Bank';
// import Block from 'common/components/layout/Block/Block';
import PageHeader from 'common/components/PageHeader/PageHeader';
import { Link, useMatch } from 'react-location';
import ColorLine from 'common/components/ColorLine';
import styled from 'styled-components';
import SvgAdd from 'common/components/icons/actions/Add';
import s from './AccountsPage.module.scss';
import { ReactComponent as Logo } from '../../assets/svg/banks/lloyds.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 -10px;
`;

function AccountsPage(): React.ReactElement {
  const {
    data: { accounts },
  } = useMatch();

  const renderAccounts = (accounts as Account[]).map((account) => {
    return (
      <div className={s.wrapper} key={account.id}>
        <Link to={`/account/${account.id}`} className={s.link}>
          <div className={s.logoWrapper}>
            <Logo className={s.logo} />
          </div>
          <h2>{account.name}</h2>
          <ColorLine />
        </Link>
      </div>
    );
  });

  const renderAddNewAccount = (
    <div className={s.wrapper}>
      <Link to="/account/new" className={s.link}>
        <div className={s.create}>
          <h3>Add new account</h3>
          <SvgAdd />
        </div>
      </Link>
    </div>
  );

  return (
    <>
      <PageHeader title="Bank Accounts" icon={<SvgBank />} />
      <Wrapper>
        {renderAccounts}
        {renderAddNewAccount}
      </Wrapper>
    </>
  );
}
export default AccountsPage;
