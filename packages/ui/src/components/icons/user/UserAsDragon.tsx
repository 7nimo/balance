import React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgUserAsDragon ({ title, titleId }: SVGRProps): JSX.Element {
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
        d='M9.204 3.983a.5.5 0 01.9-.08l1.254 2.131a6.06 6.06 0 011.416.016l1.264-2.146a.5.5 0 01.9.079l.946 2.537 1.01-.395a.5.5 0 01.677.53l-.318 2.443a6 6 0 11-10.505 0l-.32-2.442a.5.5 0 01.678-.53l1.134.442.964-2.585z'
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
        d='M10.5 13.5a.5.5 0 01.5.5 1 1 0 102 0 .5.5 0 111 0 2 2 0 01-4 0 .5.5 0 01.5-.5z'
        fill='var(--icon-accent)'
        fillRule='evenodd'
      />
      <path
        d='M10.052 11.671a.967.967 0 11-1.368-1.368c.404-.404 1.772.964 1.368 1.368zm5.12-1.347a.952.952 0 01-1.392 1.298c-.373-.4 1.018-1.699 1.392-1.298z'
        fill='var(--icon-accent)'
      />
    </svg>
  );
}

export default SvgUserAsDragon;
