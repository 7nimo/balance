import { Row } from 'common/components/layout/Row/Row';
import { Section } from 'common/components/layout/Section/Section';
import { FC } from 'react';
import { Account } from '@types';
import { useTransactions } from 'api/transaction';

type Props = {
  account: Account | undefined;
};

export const AccountContainer: FC<Props> = ({ account }) => {
  const { data } = useTransactions(account!.id);

  const renderTransactions = (): JSX.Element => {
    return <p>{JSON.stringify(data)}</p>;
  };

  return (
    <Section title="ok">
      <Row>
        <p>{JSON.stringify(account)}</p>
      </Row>

      <Row>{data ? renderTransactions() : <div>loading...</div>}</Row>
    </Section>
  );
};
