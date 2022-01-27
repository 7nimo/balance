import { Account } from '@types';
import React from 'react';
// import Block from 'common/components/layout/Block/Block';
import { Link, useMatch } from 'react-location';
import ColorLine from 'src/common/components/ColorLine';
import styled from 'styled-components';

import { ReactComponent as Logo } from '../../assets/svg/banks/lloyds.svg';
// import SvgAdd from 'common/components/icons/actions/Add';
import s from './AccountsPage.module.scss';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 -10px;
`;

function AccountsPage (): React.ReactElement {
  const { data: { accounts } } = useMatch();

  const renderAccounts = (accounts as Account[]).map((account) => {
    return (
      <div
        className={s.wrapper}
        key={account.id}
      >
        <Link
          className={s.link}
          to={`/account/${account.id}`}
        >
          <div className={s.logoWrapper}>
            <Logo className={s.logo} />
          </div>
          <h2>{account.name}</h2>
          <ColorLine />
        </Link>
      </div>
    );
  });

  // const renderAddNewAccount = (
  //   <div className={s.wrapper}>
  //     <Link to="/account/new" className={s.link}>
  //       <div className={s.create}>
  //         <h3>Add new account</h3>
  //         <SvgAdd />
  //       </div>
  //     </Link>
  //   </div>
  // );

  return <Wrapper>{renderAccounts}</Wrapper>;
}

export default AccountsPage;
