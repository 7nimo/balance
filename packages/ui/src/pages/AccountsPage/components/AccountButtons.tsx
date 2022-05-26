/* eslint-disable @typescript-eslint/no-misused-promises */
import { AccountEntity } from '@types';
import ColorLine from 'components/misc/ColorLine';
import React from 'react';
import { Link, useLoadRoute } from 'react-location';
import styled from 'styled-components';

import { ReactComponent as Logo } from '../../../assets/svg/banks/0pm0xahjtbhcxsul89ypocwgk.svg';

type Props = {
  account: AccountEntity;
}

export default function AccountButton ({ account }: Props): React.ReactElement<Props> {
  const loadRoute = useLoadRoute();

  return (
    <Link
      onMouseEnter={() => loadRoute({ to: account.id })}
      to={`/account/${account.id}`}
    >
      <Wrapper>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <H2>{account.name}</H2>
        <ColorLine />
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 300px;
  padding: 1rem;
  background: var(--card-bg);
  color: var(--text-color);
  border-radius: var(--card-border-radius);
  border: 1px solid var(--line);
  margin: 10px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 255, .2);
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--card-border-radius);
  height: 66%;
  width: 66%;
  background: var(--bg);
  font-size: 150px;

  [class*="dark"] & {
    background: #eeeeeedc;
  }
`;

const H2 = styled.h2`  
  font-weight: 600;
  margin-top: .75rem;
  margin-bottom: 1rem;
`;
