import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ColorLineProps {
  colors?: string[];
}

type LineProps = {
  gradient?: string;
};

// const defaultGradient = `linear-gradient(to right, #bcbcbc 25%,#ffcd02 25%, #ffcd02 50%, #e84f47 50%, #e84f47 75%, #65c1ac 75%)`;
const defaultGradient = 'linear-gradient(to right, #9647E6 25%,#7737E6 25%, #7737E6 50%, #BC8FEA 50%, #BC8FEA 75%, #6239E6 75%)';

const Line = React.memo(styled.div`
  width: 100%;
  height: 10%;
  margin-bottom: auto;
  border-radius: 20px;
  background-image: ${(props: LineProps) => props.gradient || defaultGradient};
`);

function ColorLines ({ colors }: ColorLineProps): React.ReactElement<ColorLineProps> {
  const [gradient, setGradient] = useState<string | null>(null);

  useEffect(() => {
    if (colors && colors?.length > 2) {
      const colorsLength = colors.length;
      const colorPalette = colors.map((color, i) => {
        const string = `${color} ${(100 / colorsLength) * (i + 1)}%`;

        return string;
      });

      setGradient(`linear-gradient(to right, ${colorPalette.join(', ')}) ${colorsLength}`);
    }
  }, [colors]);

  return <Line gradient={gradient} />;
}

export default React.memo(ColorLines);
