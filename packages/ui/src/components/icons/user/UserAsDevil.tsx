import React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgUserAsDevil ({ title, titleId }: SVGRProps): JSX.Element {
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
        d='M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12z'
        fill='var(--icon-accent)'
      />
      <path
        clipRule='evenodd'
        d='M12 18a6 6 0 01-5.419-8.58L5.663 6.8A.5.5 0 016.3 6.16l2.386.836C9.636 6.367 10.775 6 12 6s2.364.367 3.314.997l2.386-.836a.5.5 0 01.637.638L17.42 9.42A6 6 0 0112 18z'
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
        d='M10.5 13.5a.5.5 0 01.5.5 1 1 0 102 0 .5.5 0 111 0 2 2 0 01-4 0 .5.5 0 01.5-.5zm5.298-1.737a.5.5 0 01-.612-.353 1 1 0 00-1.225-.707.5.5 0 11-.259-.966 2 2 0 012.45 1.414.5.5 0 01-.354.612zm-7.596 0a.5.5 0 00.612-.353 1 1 0 011.225-.707.5.5 0 10.259-.966 2 2 0 00-2.45 1.414.5.5 0 00.354.612z'
        fill='var(--icon-accent)'
        fillRule='evenodd'
      />
    </svg>
  );
}

export default SvgUserAsDevil;
