import * as React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgPieChart ({ title, titleId }: SVGRProps): JSX.Element {
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
        d='M21 12.5a9.5 9.5 0 11-19 0 9.5 9.5 0 0119 0z'
        fill='var(--icon-main)'
      />
      <path
        d='M22.94 12.246C22.36 6.339 17.66 1.64 11.754 1.06c-.754-.074-1.393.393-1.499 1.143C10.127 3.118 10 4.672 10 7.24c0 3.197.197 4.821.348 5.599.083.424.389.73.814.813.777.152 2.401.348 5.598.348 2.568 0 4.122-.127 5.036-.255.75-.106 1.218-.745 1.144-1.5z'
        fill='var(--icon-accent)'
      />
    </svg>
  );
}

SvgPieChart.defaultProps = {
  title: 'Pie chart',
  titleId: 1
};

export default SvgPieChart;
