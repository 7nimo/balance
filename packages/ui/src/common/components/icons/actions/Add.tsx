import React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgAdd ({ title, titleId }: SVGRProps): JSX.Element {
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
          cx={24}
          cy={24}
          fill='var(--icon-main)'
          r={20}
        />
        <path
          clipRule='evenodd'
          d='M22.638 34.911c-.942-.133-1.487-.968-1.521-1.92-.041-1.145-.088-3.04-.108-6-2.96-.02-4.855-.067-6-.108-.952-.034-1.787-.579-1.92-1.521A9.73 9.73 0 0113 24c0-.537.036-.989.089-1.362.133-.942.968-1.487 1.92-1.521 1.145-.041 3.04-.088 6-.108.02-2.96.067-4.855.108-6 .034-.952.579-1.787 1.521-1.92A9.73 9.73 0 0124 13c.537 0 .989.036 1.362.089.942.133 1.487.968 1.521 1.92.041 1.145.088 3.04.108 6 2.96.02 4.855.067 6 .108.952.034 1.787.579 1.92 1.521.053.373.089.825.089 1.362 0 .537-.036.989-.089 1.362-.133.942-.968 1.487-1.92 1.521-1.145.041-3.04.088-6 .108-.02 2.96-.067 4.855-.108 6-.034.952-.579 1.787-1.521 1.92A9.73 9.73 0 0124 35a9.73 9.73 0 01-1.362-.089z'
          fill='var(--icon-accent)'
          fillRule='evenodd'
        />
      </g>
    </svg>
  );
}

export default SvgAdd;
