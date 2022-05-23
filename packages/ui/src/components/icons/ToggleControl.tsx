import * as React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgToggleControl ({ title, titleId }: SVGRProps): JSX.Element {
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
        <path
          d='M4 13c0-5.233 3.884-8.576 9.113-8.799C15.849 4.084 19.413 4 24 4s8.15.084 10.887.201C40.115 4.424 44 7.767 44 13s-3.885 8.576-9.113 8.799c-2.736.117-6.3.201-10.887.201s-8.15-.084-10.887-.201C7.884 21.576 4 18.233 4 13z'
          fill='var(--icon-accent)'
        />
        <circle
          cx={35}
          cy={13}
          fill='var(--icon-main)'
          r={5}
        />
        <path
          d='M44 35c0-5.233-3.885-8.576-9.113-8.799C32.151 26.084 28.587 26 24 26s-8.15.084-10.887.201C7.884 26.424 4 29.767 4 35s3.884 8.576 9.113 8.799c2.736.117 6.3.201 10.887.201s8.15-.084 10.887-.201C40.115 43.576 44 40.233 44 35z'
          fill='var(--icon-main)'
        />
        <circle
          fill='var(--icon-accent)'
          r={5}
          transform='matrix(-1 0 0 1 13 35)'
        />
      </g>
    </svg>
  );
}

export default SvgToggleControl;
