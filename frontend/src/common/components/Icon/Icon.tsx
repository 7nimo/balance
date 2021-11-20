// import React, { ReactElement, ReactNode } from 'react';

// type IconOptions = {
//   fill: string;
//   stroke: string;
//   'stroke-linecap': 'butt' | 'round' | 'square' | 'inherit';
//   'stroke-linejoin': 'miter' | 'round' | 'bevel' | 'inherit';
//   'stroke-width': number | string;
// };

export interface IconProps {
  // slug: string;
  // elementRef = React.useRef<HTMLInputElement>(null);
  // innerRef:
  className?: string | undefined;
  label: string;
  size?: number | undefined;
  icon: JSX.Element | null;
}

// const pathArray = [''];

export default function Icon({
  // elementRef,
  className,
  label,
  size,
  icon,
}: // innerRef,
IconProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      viewBox="0 0 24 24"
      width={`${size}px`}
      height={`${size}px`}
      // ref={innerRef}
    >
      <title id="title">{label}</title>
      {icon}
    </svg>
  );
}

Icon.defaultProps = {
  className: '',
  size: 24,
};
