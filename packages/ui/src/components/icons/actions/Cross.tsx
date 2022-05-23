import React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgCross ({ title, titleId }: SVGRProps): JSX.Element {
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
          d='M28.6 14.244a1.966 1.966 0 012.718.075l1.12 1.12c.746.745.785 1.938.075 2.718a217.791 217.791 0 01-4.8 5.097c2.171 2.228 3.92 4.117 5.013 5.317.71.78.671 1.973-.074 2.718l-1.12 1.12a1.966 1.966 0 01-2.718.075 218.7 218.7 0 01-5.314-5.01 218.7 218.7 0 01-5.314 5.01c-.78.71-1.972.67-2.718-.075l-1.12-1.12a1.966 1.966 0 01-.075-2.718c1.093-1.2 2.842-3.089 5.013-5.317a218.008 218.008 0 01-4.8-5.097 1.966 1.966 0 01.075-2.718l1.12-1.12a1.966 1.966 0 012.718-.075 218.03 218.03 0 015.1 4.803 218.234 218.234 0 015.102-4.803z'
          fill='var(--icon-accent)'
          fillRule='evenodd'
        />
      </g>
    </svg>
  );
}

export default SvgCross;
