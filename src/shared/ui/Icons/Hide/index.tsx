import React, { type FC, type SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

export const HideIcon: FC<Props> = ({ width = '20px', height = '20px', ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.219732 0.21934C0.0927148 0.346328 0.0154866 0.514682 0.00209013 0.693791C-0.0113063 0.8729 0.0400186 1.05087 0.146732 1.19534L0.219732 1.27934L4.25373 5.31434C2.28676 6.69297 0.882618 8.73439 0.298732 11.0643C0.253712 11.2561 0.285971 11.458 0.388538 11.6262C0.491105 11.7944 0.655742 11.9155 0.846869 11.9633C1.038 12.0111 1.24026 11.9818 1.40995 11.8817C1.57965 11.7816 1.70313 11.6187 1.75373 11.4283C2.27263 9.36034 3.55064 7.56329 5.33373 6.39434L7.14373 8.20434C6.42073 8.95983 6.02232 9.96842 6.03386 11.0141C6.04539 12.0597 6.46594 13.0593 7.20544 13.7986C7.94493 14.538 8.94456 14.9584 9.9902 14.9697C11.0359 14.9811 12.0444 14.5825 12.7997 13.8593L18.7187 19.7793C18.8526 19.9135 19.0322 19.9921 19.2216 19.9992C19.411 20.0063 19.596 19.9415 19.7396 19.8177C19.8831 19.694 19.9744 19.5205 19.9953 19.3321C20.0161 19.1437 19.9648 18.9544 19.8517 18.8023L19.7787 18.7183L13.6657 12.6043L13.6667 12.6023L12.4667 11.4043L9.59673 8.53434H9.59873L6.71873 5.65734L6.71973 5.65534L5.58673 4.52534L1.27973 0.21934C1.13911 0.0788896 0.948483 0 0.749732 0C0.550982 0 0.360358 0.0788896 0.219732 0.21934ZM8.20373 9.26434L11.7387 12.8003C11.2672 13.2557 10.6357 13.5077 9.98023 13.502C9.32474 13.4963 8.69771 13.2334 8.23419 12.7699C7.77067 12.3064 7.50774 11.6793 7.50205 11.0238C7.49635 10.3684 7.74834 9.73585 8.20373 9.26434ZM9.99973 3.49934C8.99973 3.49934 8.02973 3.64734 7.11073 3.92434L8.34773 5.16034C10.4873 4.7367 12.7078 5.15142 14.5502 6.31877C16.3926 7.48611 17.716 9.31681 18.2467 11.4323C18.2985 11.6213 18.4222 11.7824 18.5913 11.8814C18.7604 11.9803 18.9615 12.0091 19.1516 11.9617C19.3417 11.9143 19.5056 11.7944 19.6084 11.6276C19.7113 11.4608 19.7447 11.2605 19.7017 11.0693C19.1595 8.9068 17.9103 6.9874 16.1525 5.61591C14.3948 4.24443 12.2292 3.49947 9.99973 3.49934ZM10.1947 7.00934L13.9957 10.8093C13.9466 9.81724 13.5303 8.87885 12.8278 8.17656C12.1253 7.47427 11.1868 7.05825 10.1947 7.00934Z"
        fill="currentColor"
      />
    </svg>
  );
};
