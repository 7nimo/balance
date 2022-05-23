import * as React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgChevronUp ({ title = '', titleId = '0987' }: SVGRProps): JSX.Element {
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
        d='M1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5 1.5 17.799 1.5 12z'
        fill='var(--icon-main)'
      />
      <path
        d='M11.615 11.678a55.953 55.953 0 01-2.822 2.991c-.548.535-1.348.725-1.903.197a3.576 3.576 0 01-.46-.52c-.38-.525-.224-1.205.174-1.717a25.705 25.705 0 014.113-4.18c.76-.61 1.807-.61 2.566 0a25.705 25.705 0 014.113 4.18c.398.512.554 1.192.174 1.717a3.576 3.576 0 01-.46.52c-.555.528-1.354.338-1.903-.197a55.974 55.974 0 01-2.822-2.992.513.513 0 00-.77 0z'
        fill='var(--icon-accent)'
      />
    </svg>
  );
}

export default SvgChevronUp;
