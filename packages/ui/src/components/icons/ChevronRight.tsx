import * as React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgChevronRight ({ title = '', titleId = '65465' }: SVGRProps): JSX.Element {
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
        d='M12 1.5c5.799 0 10.5 4.701 10.5 10.5S17.799 22.5 12 22.5 1.5 17.799 1.5 12 6.201 1.5 12 1.5z'
        fill='var(--icon-main)'
      />
      <path
        d='M12.322 11.615a55.953 55.953 0 01-2.991-2.822c-.535-.548-.725-1.348-.197-1.903a3.576 3.576 0 01.52-.46c.525-.38 1.205-.224 1.717.174a25.705 25.705 0 014.18 4.113c.61.76.61 1.807 0 2.566a25.705 25.705 0 01-4.18 4.113c-.512.398-1.192.554-1.717.174a3.576 3.576 0 01-.52-.46c-.528-.555-.338-1.354.197-1.903a55.974 55.974 0 012.992-2.822.513.513 0 000-.77z'
        fill='var(--icon-accent)'
      />
    </svg>
  );
}

export default SvgChevronRight;
