import React, { type FC, type SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

export const KanbanIcon: FC<Props> = ({ width = '28px', height = '28px', ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="7" height="28" rx="2" fill="currentColor" />
      <rect opacity="0.6" x="10.5" width="7" height="28" rx="2" fill="currentColor" />
      <rect opacity="0.3" x="21" width="7" height="28" rx="2" fill="currentColor" />
    </svg>
  );
};
