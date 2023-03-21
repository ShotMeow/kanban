import React, { type FC, type SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

export const GoogleIcon: FC<Props> = ({ width = '14px', height = '14px', ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M13.5823 6.48606H7.46511V8.25896H11.8079C11.5877 10.7332 9.47305 11.7918 7.47178 11.7918C4.91683 11.7918 2.67541 9.83053 2.67541 7.07053C2.67541 4.40795 4.8101 2.34931 7.47846 2.34931C9.53976 2.34931 10.7472 3.62865 10.7472 3.62865L12.0147 2.34282C12.0147 2.34282 10.387 0.576416 7.41175 0.576416C3.62268 0.576416 0.694153 3.69359 0.694153 7.07053C0.694153 10.3501 3.44923 13.5647 7.51181 13.5647C11.0807 13.5647 13.6824 11.1813 13.6824 7.6615C13.6824 6.91468 13.5823 6.48606 13.5823 6.48606Z"
        fill="currentColor"
      />
    </svg>
  );
};
