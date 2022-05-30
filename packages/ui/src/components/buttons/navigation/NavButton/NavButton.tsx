/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link, useMatchRoute } from 'react-location';
import styled from 'styled-components';

import s from './NavButton.module.scss';

interface Props {
  link: string;
  label: string;
  small?: boolean;
  icon: React.ReactElement;
}

type WrapperProps = {
  small?: boolean;
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  ${({ small }: WrapperProps) =>
    small
      ? `
    font-size: 12px;
    height: 32px;
    `
      : null}
`;

function NavButton ({ icon, label, link, small = false }: Props): React.ReactElement {
  const matchRoute = useMatchRoute();
  const isParentRouteActive = matchRoute({ fuzzy: true, to: `${link}` });

  return (
    <Wrapper small={small}>
      <Link
        activeOptions={{ exact: true }}
        className={`${s.focusableLink} ${isParentRouteActive ? ' active' : ''}`}
        // getActiveProps={() => ({ className: 'active' })}
        to={`/${link}`}
      >
        <div className={s.iconWrapper}>{icon}</div>
        <span className={s.label}>{label}</span>
      </Link>
    </Wrapper>
  );
}

export default NavButton;
