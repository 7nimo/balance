import * as React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgVisibilityShow ({ title, titleId }: SVGRProps): JSX.Element {
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
      <g
        clipRule='evenodd'
        fillRule='evenodd'
      >
        <path
          d='M2.06 12.717a1.67 1.67 0 010-1.434C3.826 7.568 7.613 5 12 5s8.174 2.568 9.94 6.283c.216.454.216.98 0 1.434A11.001 11.001 0 0112 19a11.001 11.001 0 01-9.94-6.283z'
          fill='var(--icon-main)'
        />
        <path
          d='M12 16.5a4.5 4.5 0 004.102-6.354c-.047-.104-.204-.088-.255.014a1.5 1.5 0 11-2.007-2.007c.102-.05.118-.208.014-.255A4.5 4.5 0 1012 16.5z'
          fill='var(--icon-accent)'
        />
      </g>
    </svg>
  );
}

SvgVisibilityShow.defaultProps = {
  title: 'Show',
  titleId: 32
};

export default SvgVisibilityShow;
