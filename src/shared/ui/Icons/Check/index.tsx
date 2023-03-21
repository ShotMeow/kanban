import React, { type FC, type SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

export const CheckIcon: FC<Props> = ({ width = '10px', height = '8px', ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.20628 5.76093L8.49776 0.256559C8.66218 0.0855196 8.87145 0 9.12556 0C9.37967 0 9.58894 0.0855196 9.75336 0.256559C9.91779 0.427599 10 0.645286 10 0.909621C10 1.17395 9.91779 1.39164 9.75336 1.56268L3.83408 7.72012C3.65471 7.90671 3.44544 8 3.20628 8C2.96711 8 2.75785 7.90671 2.57848 7.72012L0.246636 5.29446C0.0822119 5.12342 0 4.90573 0 4.6414C0 4.37706 0.0822119 4.15938 0.246636 3.98834C0.411061 3.8173 0.620329 3.73178 0.874439 3.73178C1.12855 3.73178 1.33782 3.8173 1.50224 3.98834L3.20628 5.76093Z"
        fill="currentColor"
      />
    </svg>
  );
};
