import React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgIncognitoMode ({ title, titleId }: SVGRProps): JSX.Element {
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
          d='M40 22H8s.647-6.84 2.495-13.71c.584-2.173 2.46-3.71 4.702-3.906C17.413 4.19 20.49 4 24 4c3.51 0 6.587.19 8.803.384 2.242.195 4.118 1.733 4.702 3.906C39.353 15.16 40 22 40 22z'
          fill='var(--icon-accent)'
        />
        <path
          clipRule='evenodd'
          d='M39.98 21.808C36.835 21.906 31.775 22 24 22s-12.834-.094-15.98-.192c.08-.777.42-3.838 1.144-7.65C12.348 14.075 17.107 14 24 14c6.893 0 11.652.074 14.836.159a96.842 96.842 0 011.145 7.65z'
          fill='var(--icon-main)'
          fillRule='evenodd'
        />
        <path
          d='M3.05 22.063c.11 1.089 1.063 1.674 2.157 1.713C7.7 23.865 13.259 24 24 24s16.3-.135 18.793-.224c1.094-.04 2.047-.624 2.157-1.713.031-.302.05-.654.05-1.063 0-.409-.019-.761-.05-1.063-.11-1.089-1.063-1.674-2.157-1.713C40.3 18.135 34.741 18 24 18s-16.3.135-18.793.224c-1.094.04-2.047.624-2.157 1.713C3.019 20.24 3 20.591 3 21c0 .409.019.761.05 1.063z'
          fill='var(--icon-accent)'
        />
        <circle
          cx={14}
          cy={34}
          fill='var(--icon-accent)'
          r={8}
        />
        <circle
          cx={14}
          cy={34}
          fill='var(--icon-main)'
          r={5}
        />
        <circle
          cx={34}
          cy={34}
          fill='var(--icon-accent)'
          r={8}
          transform='rotate(90 34 34)'
        />
        <circle
          cx={34}
          cy={34}
          fill='var(--icon-main)'
          r={5}
          transform='rotate(90 34 34)'
        />
        <path
          clipRule='evenodd'
          d='M20 31.07V35h.646c.824-.92 2.021-1.5 3.354-1.5s2.53.58 3.354 1.5H28v-3.93c-1.177-.68-2.543-1.07-4-1.07s-2.823.39-4 1.07z'
          fill='var(--icon-accent)'
          fillRule='evenodd'
        />
      </g>
    </svg>
  );
}

SvgIncognitoMode.defaultProps = {
  title: 'Incognito mode',
  titleId: 5
};

export default SvgIncognitoMode;
