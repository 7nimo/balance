import * as React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgBitcoin ({ title, titleId }: SVGRProps): JSX.Element {
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
          r={20}
        />
        <path
          clipRule='evenodd'
          d='M19.9 14.702v-1.777c0-.445.293-.848.735-.898.156-.018.312-.027.465-.027.528 0 .907.108 1.136.324.242.216.364.607.364 1.172v.955c.332-.012.669-.019 1.01-.019.27 0 .534.006.79.017v-1.524c0-.445.293-.848.735-.898.156-.018.312-.027.465-.027.528 0 .907.108 1.136.324.242.216.364.607.364 1.172v1.335c.74.198 1.381.471 1.926.818 1.275.791 1.912 2.027 1.912 3.707 0 .869-.232 1.622-.695 2.259-.444.637-1.12 1.149-2.028 1.535 1.12.367 1.96.917 2.52 1.65.56.734.84 1.603.84 2.607 0 1.834-.666 3.195-1.998 4.083-.673.449-1.499.784-2.477 1.006v2.587c0 .406-.245.78-.643.857-.197.038-.392.06-.557.06-.529 0-.914-.152-1.157-.457-.229-.305-.343-.856-.343-1.653v-1.077c-.201.007-.406.01-.615.01-.367 0-.761-.01-1.185-.03v2.29c0 .406-.245.78-.643.857a3.03 3.03 0 01-.557.06c-.529 0-.914-.152-1.157-.457-.229-.305-.343-.856-.343-1.653V32.44a9.51 9.51 0 01-1.01-.256c-.927-.308-1.39-.878-1.39-1.708V16.315c0-.367.097-.647.29-.84.193-.193.463-.347.81-.463.395-.128.828-.231 1.3-.31zm7.012 10.736c.56.444.84 1.052.84 1.824 0 .907-.338 1.574-1.014 1.998-.656.406-1.573.608-2.75.608-.503 0-1.014-.019-1.536-.057a7.414 7.414 0 01-1.303-.203V24.77h3.388c1.043 0 1.835.222 2.375.667zm-2.838-3.418H21.15v-4.489c.309-.058.676-.106 1.1-.145.445-.038.908-.057 1.39-.057 2.356 0 3.534.762 3.534 2.287 0 .753-.26 1.342-.782 1.767-.502.425-1.274.637-2.317.637z'
          fill='var(--icon-accent)'
          fillRule='evenodd'
        />
      </g>
    </svg>
  );
}

SvgBitcoin.defaultProps = {
  title: 'Crypto',
  titleId: 3
};

export default SvgBitcoin;
