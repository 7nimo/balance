import React from 'react';

interface Props {
  className?: string;
  icon: React.ReactElement;
  size: number;
  tooltip?: string;
}

function Icon({ className, size = 24, icon, tooltip }: Props): React.ReactElement<Props> {
  const extraProps: Record<string, unknown> = {
    'data-testid': icon,
    ...(tooltip
      ? {
          'data-for': tooltip,
          'data-tip': true,
        }
      : {}),
  };

  return (
    <svg className={className} width={`${size}px`} height={`${size}px`} {...extraProps}>
      {icon}
    </svg>
  );
}

export default Icon;
