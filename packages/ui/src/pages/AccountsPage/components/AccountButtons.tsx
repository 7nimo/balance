/* eslint-disable @typescript-eslint/no-misused-promises */
import { AccountEntity } from '@types';
import ColorLine from 'components/misc/ColorLine';
import React from 'react';
import { Link, useLoadRoute } from 'react-location';
import styled from 'styled-components';

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
          <Img
            alt={`Logo of ${account.bank.name}`}
            src={`assets/img/${account.bank.img}.svg`}
          />
        </LogoWrapper>
        <H2>{account.name}</H2>
        <ColorLine colors={account.bank.colors} />
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 280px;
  width: 280px;
  padding: 1rem;
  background: var(--card-bg);
  color: var(--text-color);
  border-radius: var(--card-border-radius);
  border: 1px solid var(--line);
  margin: 10px;
  cursor: pointer;
  overflow: hidden;

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

  [class*="dark"] & {
    background: #eeeeeedc;
  }
`;

const Img = styled.img`
  height: 80%;
  width: 80%;
`;

const H2 = styled.h2`
  width: 100%;
  font-weight: 600;
  margin-top: .75rem;
  margin-bottom: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;
