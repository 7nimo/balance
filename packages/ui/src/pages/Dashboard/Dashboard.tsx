import Block from 'common/components/layout/Block/Block';
import Row from 'common/components/layout/Row/Row';
import { Shrug } from 'common/components/Shrug/Shrug';
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
