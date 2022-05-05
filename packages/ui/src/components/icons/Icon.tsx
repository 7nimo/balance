import React from 'react';

interface Props {
  className?: string;
  icon: React.ReactElement;
  size: number;
  tooltip?: string;
}

function Icon ({ className, icon, size = 24, tooltip }: Props): React.ReactElement<Props> {
  const extraProps: Record<string, unknown> = {
    'data-testid': icon,
    ...(tooltip
      ? {
        'data-for': tooltip,
        'data-tip': true
      }
      : {})
  };

  return (
    <svg
      className={className}
      height={`${size}px`}
      width={`${size}px`}
      {...extraProps}
    >
      {icon}
    </svg>
  );
}

export default Icon;
