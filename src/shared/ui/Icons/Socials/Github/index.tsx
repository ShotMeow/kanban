import React, { type FC, type SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

export const GithubIcon: FC<Props> = ({ width = '17px', height = '17px', ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.52939 0.411865C7.46337 0.411865 6.40778 0.627047 5.4229 1.04513C4.43802 1.4632 3.54314 2.07599 2.78935 2.8485C1.26699 4.40865 0.411743 6.52466 0.411743 8.73105C0.411743 12.4081 2.74151 15.5278 5.96421 16.6343C6.3701 16.7008 6.49998 16.4429 6.49998 16.2183V14.8124C4.25139 15.3115 3.77245 13.6976 3.77245 13.6976C3.39904 12.7326 2.87139 12.4747 2.87139 12.4747C2.13268 11.9589 2.92821 11.9755 2.92821 11.9755C3.73998 12.0338 4.17021 12.8324 4.17021 12.8324C4.87645 14.0969 6.06974 13.7226 6.53245 13.5229C6.60551 12.9822 6.81657 12.6161 7.04386 12.4081C5.24174 12.2001 3.35033 11.4847 3.35033 8.31509C3.35033 7.39166 3.6588 6.65125 4.18645 6.06059C4.10527 5.85261 3.82116 4.98742 4.26763 3.86433C4.26763 3.86433 4.94951 3.63971 6.49998 4.71288C7.14127 4.52986 7.83939 4.43835 8.52939 4.43835C9.21939 4.43835 9.91751 4.52986 10.5588 4.71288C12.1093 3.63971 12.7912 3.86433 12.7912 3.86433C13.2376 4.98742 12.9535 5.85261 12.8723 6.06059C13.4 6.65125 13.7084 7.39166 13.7084 8.31509C13.7084 11.493 11.8089 12.1918 9.99868 12.3998C10.2909 12.6577 10.5588 13.1652 10.5588 13.9389V16.2183C10.5588 16.4429 10.6887 16.7091 11.1027 16.6343C14.3254 15.5195 16.647 12.4081 16.647 8.73105C16.647 7.63856 16.4371 6.55676 16.0291 5.54743C15.6212 4.53811 15.0232 3.62101 14.2694 2.8485C13.5156 2.07599 12.6208 1.4632 11.6359 1.04513C10.651 0.627047 9.59542 0.411865 8.52939 0.411865Z"
        fill="currentColor"
      />
    </svg>
  );
};