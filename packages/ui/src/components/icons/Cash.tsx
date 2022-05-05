import * as React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgCash ({ title, titleId }: SVGRProps): JSX.Element {
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
        d='M12 18.746c-5.12 1.417-8.1.51-9.332-.079a1.515 1.515 0 01-.84-1.144c-.144-.873-.328-2.642-.328-5.995 0-2.218.08-3.743.177-4.774.093-.998 1.18-1.432 2.144-1.156 1.586.455 4.254.734 8.18-.352 5.123-1.418 8.103-.486 9.333.115.459.224.753.65.836 1.153.145.877.33 2.651.33 5.993 0 2.187-.08 3.702-.175 4.734-.093 1.01-1.203 1.452-2.176 1.17-1.59-.462-4.248-.745-8.149.335z'
        fill='var(--icon-main)'
      />
      <path
        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
        fill='var(--icon-accent)'
      />
      <path
        clipRule='evenodd'
        d='M22.435 9.39a4 4 0 01-4.812-4.877c1.816.082 3.031.516 3.71.848.46.224.754.65.837 1.153.09.55.198 1.454.265 2.876zm.055 4.397A4 4 0 0017.03 18c1.31.002 2.342.185 3.119.41.973.283 2.083-.159 2.176-1.169.076-.817.141-1.937.165-3.454zM6.377 19.489a4 4 0 00-4.814-4.878c.067 1.446.174 2.359.266 2.912.083.502.38.924.84 1.144.68.326 1.894.748 3.708.822zM1.51 10.213A4 4 0 006.97 6c-1.325.003-2.367-.178-3.148-.402-.963-.276-2.05.158-2.144 1.156a45.55 45.55 0 00-.167 3.46z'
        fill='var(--icon-accent)'
        fillRule='evenodd'
      />
    </svg>
  );
}

SvgCash.defaultProps = {
  title: 'Cash',
  titleId: 2
};

export default SvgCash;
