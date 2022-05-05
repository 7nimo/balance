import * as React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgMenuTripleDots ({ title, titleId }: SVGRProps): JSX.Element {
  return (
    <svg
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
          fill='var(--icon-main)'
          r={21}
          transform='matrix(-1 0 0 1 24 24)'
        />
        <path
          d='M11 24c0-1.72 1.101-2.987 2.822-3a25.995 25.995 0 01.356 0c1.72.013 2.822 1.28 2.822 3s-1.101 2.987-2.822 3a25.995 25.995 0 01-.356 0C12.102 26.986 11 25.72 11 24zm10 0c0-1.72 1.101-2.987 2.822-3a25.995 25.995 0 01.356 0c1.72.013 2.822 1.28 2.822 3s-1.101 2.987-2.822 3a25.995 25.995 0 01-.356 0C22.102 26.986 21 25.72 21 24zm10 0c0-1.72 1.101-2.987 2.822-3a25.995 25.995 0 01.356 0c1.72.013 2.822 1.28 2.822 3s-1.101 2.987-2.822 3a25.995 25.995 0 01-.356 0C32.102 26.986 31 25.72 31 24z'
          fill='var(--icon-accent)'
        />
      </g>
    </svg>
  );
}

export default SvgMenuTripleDots;
