import React, { type FC, type SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

export const LogoutIcon: FC<Props> = ({ width = '13px', height = '13px', ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1.44444 13C1.04722 13 0.707055 12.8587 0.423944 12.5761C0.141315 12.2929 0 11.9528 0 11.5556V1.44444C0 1.04722 0.141315 0.707055 0.423944 0.423944C0.707055 0.141315 1.04722 0 1.44444 0H6.5V1.44444H1.44444V11.5556H6.5V13H1.44444ZM9.38889 10.1111L8.39583 9.06389L10.2375 7.22222H4.33333V5.77778H10.2375L8.39583 3.93611L9.38889 2.88889L13 6.5L9.38889 10.1111Z"
        fill="white"
      />
    </svg>
  );
};
