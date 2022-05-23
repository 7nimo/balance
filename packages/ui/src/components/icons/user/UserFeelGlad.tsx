import React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgUserFeelGlad ({ title, titleId }: SVGRProps): JSX.Element {
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
        d='M12 15.5a2.5 2.5 0 002.303-1.526c.216-.509-.25-.974-.803-.974h-3c-.552 0-1.019.465-.803.974A2.5 2.5 0 0012 15.5zm-2-4.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm5.5 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
        fill='var(--icon-accent)'
      />
    </svg>
  );
}

export default SvgUserFeelGlad;
