import { AccountEntity } from '@types';
import { IconButton } from 'components/buttons/IconButton/IconButton';
import SvgAdd from 'components/icons/actions/Add';
import ColorLine from 'components/misc/ColorLine';
import { RelativeElements } from 'components/RelativeElements/RelativeElements';
import { Toolbox } from 'components/RelativeElements/Toolbox';
import React from 'react';
import { Link, useMatch } from 'react-location';

import { ReactComponent as Logo } from '../../assets/svg/banks/lloyds.svg';
import { Wrapper } from '../../components/_Layout/Root/Wrapper';
import s from './AccountsPage.module.scss';
import { Wrapper } from './Wrapper';

function AccountsPage (): React.ReactElement {
  const { data: { accounts } } = useMatch();

  const handleAddAccount = () => {
    // open modal
  };

  const renderAccounts = (accounts as AccountEntity[]).map((account) => {
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

  const renderActions = (
    <div>
      <IconButton
        icon={<SvgAdd />}
        onClick={handleAddAccount}
      />
    </div>
  );

  return (
    <Wrapper>
      {renderAccounts}
      <RelativeElements>
        <Toolbox>
          {renderActions}
        </Toolbox>
      </RelativeElements>
      {renderAccounts}
    </Wrapper>
  );
}

export default AccountsPage;
