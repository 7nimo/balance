import * as React from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
  &:hover {
    --icon-main: rgba(79,227,204,.7);
    --icon-accent: rgba(64,70,140,.7);
  }
`;

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgDarkMode ({ title, titleId }: SVGRProps): JSX.Element {
  return (
    <Svg
      aria-labelledby={titleId}
      fill='none'
      height='1em'
      viewBox='0 0 24 24'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <g transform='scale(.5)'>
        <circle
          cx={24}
          cy={24}
          fill='var(--icon-accent)'
          r={20}
        />
        <path
          clipRule='evenodd'
          d='M32.944 13.229c.726.603 0 1.771-.944 1.771a9 9 0 100 18c.944 0 1.67 1.168.944 1.771A13.943 13.943 0 0124 38c-7.732 0-14-6.268-14-14s6.268-14 14-14c3.4 0 6.518 1.212 8.944 3.229z'
          fill='var(--icon-main)'
          fillRule='evenodd'
        />
      </g>
    </Svg>
  );
}

export default SvgDarkMode;
