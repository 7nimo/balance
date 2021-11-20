import { Row } from 'common/components/layouts/Row/Row';
import { Section } from 'common/components/Section/Section';
import { Shrug } from 'common/components/Shrug/Shrug';

export default function Dashboard(): JSX.Element {
  return (
    <Section title="Assets">
      <Row>
        <div>d3 soon</div>
      </Row>
      <Row>
        <div>
          radial-gradient( closest-side, rgba(0, 0, 0, 0.35) 0, rgba(0, 0, 0, 0.14) 35%, transparent
          100%)
        </div>
      </Row>
      <Row>
        <Shrug label="¯\_(ツ)_/¯" />
      </Row>
    </Section>
  );
}
