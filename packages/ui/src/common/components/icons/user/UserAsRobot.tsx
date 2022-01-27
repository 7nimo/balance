import React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgUserAsRobot ({ title, titleId }: SVGRProps): JSX.Element {
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
        d='M12.5 4.25a.5.5 0 10-1 0v1.77a6 6 0 101 0V4.25z'
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
        d='M8.5 11c0-.501.387-.916.887-.94a56.89 56.89 0 015.226 0c.5.024.887.439.887.94a.934.934 0 01-.887.94 56.89 56.89 0 01-5.226 0A.934.934 0 018.5 11z'
        fill='var(--icon-accent)'
      />
    </svg>
  );
}

export default SvgUserAsRobot;
