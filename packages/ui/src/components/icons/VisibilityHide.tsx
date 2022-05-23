import * as React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgVisibilityHide ({ title, titleId }: SVGRProps): JSX.Element {
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
        clipRule='evenodd'
        d='M2.06 12.717a1.67 1.67 0 010-1.434A11.001 11.001 0 0112 5c4.387 0 8.174 2.568 9.94 6.283.216.454.216.98 0 1.434A11.001 11.001 0 0112 19a11.001 11.001 0 01-9.94-6.283z'
        fill='var(--icon-main)'
        fillRule='evenodd'
      />
      <path
        clipRule='evenodd'
        d='M12 16.5a4.5 4.5 0 004.102-6.354c-.047-.104-.204-.088-.255.014a1.5 1.5 0 11-2.007-2.007c.102-.05.118-.208.014-.255A4.5 4.5 0 1012 16.5z'
        fill='var(--icon-main)'
        fillRule='evenodd'
      />
      <path
        d='M3.348 18.761c-.265.271-.447.625-.31.978.103.263.305.604.7.998.394.395.735.597.997.7.354.137.708-.045.979-.31 1.31-1.282 5.426-5.317 7.746-7.637 2.32-2.321 6.355-6.437 7.637-7.747.266-.27.448-.625.31-.978-.103-.263-.305-.604-.699-.998-.394-.394-.736-.597-.998-.699-.353-.138-.707.044-.978.31-1.31 1.282-5.426 5.316-7.747 7.637-2.32 2.32-6.355 6.437-7.637 7.746z'
        fill='var(--icon-accent)'
      />
    </svg>
  );
}

SvgVisibilityHide.defaultProps = {
  title: 'Hide',
  titleId: 31
};

export default SvgVisibilityHide;
