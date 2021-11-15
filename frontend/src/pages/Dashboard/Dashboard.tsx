import { Row } from 'components/layouts/Row/Row';
import { Section } from 'components/Section/Section';
import { Shrug } from 'components/Shrug/Shrug';

export default function Dashboard(): JSX.Element {
  return (
    <Section title="Assets">
      <Row>
        <p>d3 soon</p>
      </Row>
      <Row>
        <Shrug label="¯\_(ツ)_/¯" />
      </Row>
    </Section>
  );
}
