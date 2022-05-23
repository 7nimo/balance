import { AccountEntity } from '@types';
import { IconButton } from 'components/buttons/IconButton/IconButton';
import SvgAdd from 'components/icons/actions/Add';
import ColorLine from 'components/misc/ColorLine';
import Modal from 'components/Modal/Modal';
import { RelativeElements } from 'components/RelativeElements/RelativeElements';
import { Toolbox } from 'components/RelativeElements/Toolbox';
import AddAccountModal from 'modules/Account/AddAccount/AddAccountModal';
import React, { useState } from 'react';
import { Link, useMatch } from 'react-location';

import { ReactComponent as Logo } from '../../assets/svg/banks/lloyds.svg';
import s from './AccountsPage.module.scss';
import { Wrapper } from './Wrapper';

function AccountsPage (): React.ReactElement {
  const { data: { accounts } } = useMatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddAccount = () => {
    setIsOpen(true);
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
    <IconButton
      icon={<SvgAdd />}
      onClick={handleAddAccount}
    />
  );

  return (
    <Wrapper>
      <RelativeElements>
        <Toolbox>
          {renderActions}
        </Toolbox>
        <Modal
          handleClose={() => setIsOpen(false)}
          isOpen={isOpen}
          title='Add Account'
        >
          <AddAccountModal />
        </Modal>
      </RelativeElements>
      {renderAccounts}
    </Wrapper>
  );
}

export default AccountsPage;
