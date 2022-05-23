import React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgUserFeelNeutral ({ title, titleId }: SVGRProps): JSX.Element {
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
        d='M18 12a6 6 0 11-12 0 6 6 0 0112 0z'
        fill='var(--icon-main)'
      />
      <path
        clipRule='evenodd'
        d='M17.413 20.41A9.954 9.954 0 0112 22a9.953 9.953 0 01-5.413-1.59 6 6 0 0110.826 0z'
        fill='var(--icon-main)'
        fillRule='evenodd'
      />
      <path
        clipRule='evenodd'
        d='M10 14.5a.5.5 0 00.5.5h3a.5.5 0 100-1h-3a.5.5 0 00-.5.5z'
        fill='var(--icon-accent)'
        fillRule='evenodd'
      />
      <path
        d='M10 10.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm5.5 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
        fill='var(--icon-accent)'
      />
    </svg>
  );
}

export default SvgUserFeelNeutral;
