import { Row } from 'common/components/layout/Row/Row';
import { Block } from 'common/components/layout/Block/Block';
import { Shrug } from 'common/components/Shrug/Shrug';
import { Chart } from 'modules/charts/components/Chart';

export default function Dashboard(): JSX.Element {
  return (
    <>
      <Block title="Assets">
        <Row>
          <div>d3 soon</div>
        </Row>
        <Row>
          <div>
            radial-gradient( closest-side, rgba(0, 0, 0, 0.35) 0, rgba(0, 0, 0, 0.14) 35%,
            transparent 100%)
          </div>
        </Row>
        <Row>
          <Shrug label="¯\_(ツ)_/¯" />
        </Row>
      </Block>
      <Block>
        <Chart />
      </Block>
    </>
  );
}
