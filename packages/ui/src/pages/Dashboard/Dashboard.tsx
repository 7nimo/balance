import Block from 'components/box/Block/Block';
import Row from 'components/box/Row/Row';
import { Shrug } from 'components/misc/Shrug/Shrug';
import React from 'react';

function Dashboard (): React.ReactElement {
  return (
    <Block title='Assets'>
      <Row style={{ flexDirection: 'column' }}>
        <h1>To do:</h1>
        <ul>
          <li>account settings</li>
          <li>add account button</li>
          <li>add account form</li>
          <li>import transactions</li>
        </ul>
      </Row>
      <Row>
        <Shrug label='¯\_(ツ)_/¯' />
      </Row>
    </Block>
  );
}

export default Dashboard;
