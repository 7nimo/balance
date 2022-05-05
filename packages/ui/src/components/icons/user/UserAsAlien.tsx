import React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgUserAsAlien ({ title, titleId }: SVGRProps): JSX.Element {
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
        clipRule='evenodd'
        d='M16.444 6.633a1 1 0 10-.78-.45l-.397.784A5.972 5.972 0 0012 6a5.972 5.972 0 00-3.267.967l-.397-.785a1 1 0 10-.78.45l.534.817a6 6 0 107.82 0l.534-.816z'
        fill='var(--icon-main)'
        fillRule='evenodd'
      />
      <path
        clipRule='evenodd'
        d='M17.413 20.41A9.954 9.954 0 0112 22a9.953 9.953 0 01-5.413-1.59 6 6 0 0110.826 0z'
        fill='var(--icon-main)'
        fillRule='evenodd'
      />
      <path
        clipRule='evenodd'
        d='M10.5 13.5a.5.5 0 01.5.5 1 1 0 102 0 .5.5 0 111 0 2 2 0 01-4 0 .5.5 0 01.5-.5zM12 12a2 2 0 100-4 2 2 0 000 4zm.5-2a.5.5 0 100-1 .5.5 0 000 1z'
        fill='var(--icon-accent)'
        fillRule='evenodd'
      />
    </svg>
  );
}

export default SvgUserAsAlien;
