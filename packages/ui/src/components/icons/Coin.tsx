import React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgCoin ({ title, titleId }: SVGRProps): JSX.Element {
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
        fill='var(--icon-main)'
      />
      <path
        clipRule='evenodd'
        d='M10.75 6c0-.69.56-1.25 1.25-1.25A7.25 7.25 0 0119.25 12a1.25 1.25 0 01-2.5 0A4.75 4.75 0 0012 7.25c-.69 0-1.25-.56-1.25-1.25zM6 10.75c.69 0 1.25.56 1.25 1.25A4.75 4.75 0 0012 16.75a1.25 1.25 0 010 2.5A7.25 7.25 0 014.75 12c0-.69.56-1.25 1.25-1.25z'
        fill='var(--icon-accent)'
        fillRule='evenodd'
      />
    </svg>
  );
}

SvgCoin.defaultProps = {
  title: 'Coin',
  titleId: 111222
};

export default SvgCoin;
