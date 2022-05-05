import React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgUserBasic ({ title, titleId }: SVGRProps): JSX.Element {
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
      <path
        d='M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z'
        fill='var(--icon-accent)'
      />
      <path
        d='M17 12a5 5 0 11-10 0 5 5 0 0110 0z'
        fill='var(--icon-main)'
      />
      <path
        clipRule='evenodd'
        d='M5.764 19.818A7 7 0 0112 16a7 7 0 016.236 3.818A9.958 9.958 0 0112 22a9.958 9.958 0 01-6.236-2.182z'
        fill='var(--icon-main)'
        fillRule='evenodd'
      />
    </svg>
  );
}

export default SvgUserBasic;
