import React, { type FC, type SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

export const TrashIcon: FC<Props> = ({ width = '12px', height = '14px', ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 5H5V11H4V5ZM7 5H8V11H7V5Z" fill="currentColor" />
      <path
        d="M0 2V3H1V13C1 13.2652 1.10536 13.5196 1.29289 13.7071C1.48043 13.8946 1.73478 14 2 14H10C10.2652 14 10.5196 13.8946 10.7071 13.7071C10.8946 13.5196 11 13.2652 11 13V3H12V2H0ZM2 13V3H10V13H2ZM4 0H8V1H4V0Z"
        fill="currentColor"
      />
    </svg>
  );
};
