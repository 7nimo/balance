import React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgCheck ({ title, titleId }: SVGRProps): JSX.Element {
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
          d='M34.513 15.94c.842.6 1.088 1.749.552 2.634-4.155 6.864-7.937 11.432-10.171 13.876-1.202 1.316-3.134 1.484-4.497.337-1.945-1.638-4.805-4.42-7.541-8.47-.516-.764-.404-1.781.239-2.441l1.647-1.693c.767-.788 2.028-.81 2.802-.028 2.724 2.752 4.837 5.248 4.837 5.248s3.105-4.636 7.927-10.256a1.978 1.978 0 012.65-.314l1.555 1.108z'
          fill='var(--icon-accent)'
          fillRule='evenodd'
        />
      </g>
    </svg>
  );
}

export default SvgCheck;
