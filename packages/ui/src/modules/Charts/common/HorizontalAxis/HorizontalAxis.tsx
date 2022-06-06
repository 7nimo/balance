import { formatDate } from 'core/utils/d3.utils';
import React from 'react';
import styled from 'styled-components';

type Props = {
  ticks: Date[];
};

function HorizontalAxis ({ ticks }: Props): React.ReactElement<Props> {
  return (
    <Wrapper>
      {ticks ? ticks.map((tick, i) => <Tick key={i}>{formatDate(tick)}</Tick>) : null}
    </Wrapper>
  );
}

export default React.memo(HorizontalAxis);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  height: 2rem;
  border-top: 1px solid var(--line);
`;

const Tick = styled.span`
  display: block;
  font-size: .75rem;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--text-color);
`;
