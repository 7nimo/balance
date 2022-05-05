import React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgLogout ({ title, titleId }: SVGRProps): JSX.Element {
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
          r={22}
        />
        <path
          d='M16.96 9.448c-.546-.74-1.57-.715-2.346-.22C9.736 12.332 6.5 17.787 6.5 24c0 9.665 7.835 17.5 17.5 17.5S41.5 33.665 41.5 24c0-6.212-3.236-11.667-8.114-14.773-.776-.494-1.8-.52-2.345.22A3.783 3.783 0 0030.5 10.5c-.149.446-.236.86-.286 1.223-.122.89.444 1.658 1.17 2.19A12.482 12.482 0 0136.5 24c0 6.904-5.596 12.5-12.5 12.5S11.5 30.904 11.5 24c0-4.142 2.014-7.813 5.117-10.088.725-.531 1.29-1.298 1.169-2.19A6.773 6.773 0 0017.5 10.5a3.783 3.783 0 00-.54-1.052z'
          fill='var(--icon-accent)'
        />
        <path
          d='M26.883 8.008c-.034-.95-.579-1.786-1.521-1.92A9.726 9.726 0 0024 6c-.537 0-.989.036-1.362.089-.942.133-1.487.968-1.521 1.92C21.063 9.5 21 12.263 21 17s.063 7.5.117 8.992c.034.95.579 1.786 1.521 1.92A9.73 9.73 0 0024 28a9.73 9.73 0 001.362-.089c.942-.133 1.487-.968 1.521-1.92C26.937 24.5 27 21.737 27 17s-.063-7.5-.117-8.992z'
          fill='var(--icon-accent)'
        />
      </g>
    </svg>
  );
}

export default SvgLogout;
