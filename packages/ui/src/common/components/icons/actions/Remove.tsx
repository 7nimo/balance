import React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgRemove ({ title, titleId }: SVGRProps): JSX.Element {
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
          d='M15.008 21.117c-.95.034-1.786.579-1.92 1.521A9.73 9.73 0 0013 24c0 .537.036.989.089 1.362.133.942.968 1.487 1.92 1.521C16.5 26.937 19.263 27 24 27s7.5-.063 8.992-.117c.95-.034 1.786-.579 1.92-1.521A9.73 9.73 0 0035 24a9.73 9.73 0 00-.089-1.362c-.133-.942-.968-1.487-1.92-1.521C31.5 21.063 28.737 21 24 21s-7.5.063-8.992.117z'
          fill='var(--icon-accent)'
        />
      </g>
    </svg>
  );
}

export default SvgRemove;
