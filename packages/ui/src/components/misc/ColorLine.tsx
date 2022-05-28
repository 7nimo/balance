import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  colors?: string[];
}

type LineProps = {
  gradient?: string;
};

const defaultGradient = 'linear-gradient(to right, #9647E6 25%,#7737E6 25%, #7737E6 50%, #BC8FEA 50%, #BC8FEA 75%, #6239E6 75%)';

const Line = React.memo(styled.div`
  width: 100%;
  height: 16px;
  margin-bottom: auto;
  border-radius: 20px;
  background-image: ${({ gradient }: LineProps) => gradient || defaultGradient};
`);

function ColorLines ({ colors }: Props): React.ReactElement<Props> {
  const [gradient, setGradient] = useState<string>('');

  useEffect(() => {
    if (colors && colors?.length > 2) setGradient(generateGradientFromColors(colors));
  }, [colors]);

  return <Line gradient={gradient} />;
}

export default React.memo(ColorLines);

function generateGradientFromColors (colors: string[]) {
  const gradientStepArray = colors.map((color, i) => `${color} ${(100 / colors.length) * (i + 1)}%`);

  return `linear-gradient(to right, ${gradientStepArray.join(', ')})`;
}
