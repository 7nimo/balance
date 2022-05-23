import React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgCalendar ({ title, titleId }: SVGRProps): JSX.Element {
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
        d='M2.281 4.343c.089-.86.652-1.539 1.496-1.718C5.109 2.34 7.622 2 12 2s6.89.34 8.223.625c.844.18 1.407.859 1.496 1.718C21.85 5.616 22 7.953 22 12c0 4.047-.15 6.384-.281 7.657-.089.86-.652 1.539-1.496 1.718C18.891 21.66 16.378 22 12 22s-6.89-.34-8.223-.625c-.844-.18-1.407-.859-1.496-1.718C2.15 18.384 2 16.047 2 12s.15-6.384.281-7.657z'
        fill='var(--icon-main)'
      />
      <path
        clipRule='evenodd'
        d='M21.903 7H2.097c.053-1.182.12-2.043.184-2.657.089-.86.652-1.539 1.496-1.718C5.109 2.34 7.622 2 12 2s6.89.34 8.223.625c.844.18 1.407.859 1.496 1.718.063.614.131 1.475.184 2.657z'
        fill='var(--icon-accent)'
        fillRule='evenodd'
      />
      <path
        d='M5.5 11a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1zm0 5a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1zm5-5a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1zm0 5a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1zm5-5a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1z'
        fill='var(--icon-accent)'
      />
    </svg>
  );
}

SvgCalendar.defaultProps = {
  title: 'Calendar',
  titleId: 22
};

export default SvgCalendar;
