import React, { type FC, type SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {}

export const SunIcon: FC<Props> = ({ width = '24px', height = '24px', ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11.2 3.2V0.8C11.2 0.587827 11.2843 0.384344 11.4343 0.234315C11.5843 0.0842854 11.7878 0 12 0C12.2122 0 12.4157 0.0842854 12.5657 0.234315C12.7157 0.384344 12.8 0.587827 12.8 0.8V3.2C12.8 3.41217 12.7157 3.61566 12.5657 3.76569C12.4157 3.91571 12.2122 4 12 4C11.7878 4 11.5843 3.91571 11.4343 3.76569C11.2843 3.61566 11.2 3.41217 11.2 3.2ZM18.4 12C18.4 13.2658 18.0246 14.5032 17.3214 15.5556C16.6182 16.6081 15.6186 17.4284 14.4492 17.9128C13.2797 18.3972 11.9929 18.524 10.7514 18.277C9.50994 18.0301 8.36957 17.4205 7.47452 16.5255C6.57946 15.6304 5.96992 14.4901 5.72297 13.2486C5.47603 12.0071 5.60277 10.7203 6.08717 9.55083C6.57157 8.38138 7.39188 7.38184 8.44435 6.67859C9.49683 5.97535 10.7342 5.6 12 5.6C13.6968 5.60185 15.3236 6.27673 16.5234 7.47656C17.7233 8.67639 18.3981 10.3032 18.4 12ZM16.8 12C16.8 11.0506 16.5185 10.1226 15.9911 9.33326C15.4636 8.54391 14.714 7.92868 13.8369 7.56538C12.9598 7.20208 11.9947 7.10702 11.0636 7.29223C10.1325 7.47744 9.27718 7.9346 8.60589 8.60589C7.9346 9.27718 7.47744 10.1325 7.29223 11.0636C7.10702 11.9947 7.20208 12.9598 7.56538 13.8369C7.92868 14.714 8.54391 15.4636 9.33326 15.9911C10.1226 16.5185 11.0506 16.8 12 16.8C13.2726 16.7987 14.4928 16.2925 15.3927 15.3927C16.2925 14.4928 16.7987 13.2726 16.8 12ZM5.034 6.166C5.18411 6.31611 5.38771 6.40044 5.6 6.40044C5.81229 6.40044 6.01589 6.31611 6.166 6.166C6.31611 6.01589 6.40044 5.81229 6.40044 5.6C6.40044 5.38771 6.31611 5.18411 6.166 5.034L4.566 3.434C4.41589 3.28389 4.21229 3.19956 4 3.19956C3.78771 3.19956 3.58411 3.28389 3.434 3.434C3.28389 3.58411 3.19956 3.78771 3.19956 4C3.19956 4.21229 3.28389 4.41589 3.434 4.566L5.034 6.166ZM5.034 17.834L3.434 19.434C3.28389 19.5841 3.19956 19.7877 3.19956 20C3.19956 20.2123 3.28389 20.4159 3.434 20.566C3.58411 20.7161 3.78771 20.8004 4 20.8004C4.21229 20.8004 4.41589 20.7161 4.566 20.566L6.166 18.966C6.24033 18.8917 6.29929 18.8034 6.33952 18.7063C6.37974 18.6092 6.40044 18.5051 6.40044 18.4C6.40044 18.2949 6.37974 18.1908 6.33952 18.0937C6.29929 17.9966 6.24033 17.9083 6.166 17.834C6.09167 17.7597 6.00343 17.7007 5.90632 17.6605C5.8092 17.6203 5.70512 17.5996 5.6 17.5996C5.49488 17.5996 5.3908 17.6203 5.29368 17.6605C5.19657 17.7007 5.10833 17.7597 5.034 17.834ZM18.4 6.4C18.5051 6.40008 18.6092 6.37946 18.7063 6.33931C18.8034 6.29916 18.8917 6.24027 18.966 6.166L20.566 4.566C20.7161 4.41589 20.8004 4.21229 20.8004 4C20.8004 3.78771 20.7161 3.58411 20.566 3.434C20.4159 3.28389 20.2123 3.19956 20 3.19956C19.7877 3.19956 19.5841 3.28389 19.434 3.434L17.834 5.034C17.722 5.14588 17.6457 5.28849 17.6148 5.44375C17.5839 5.59902 17.5997 5.75997 17.6603 5.90623C17.7209 6.05249 17.8235 6.17748 17.9552 6.26538C18.0869 6.35327 18.2417 6.40012 18.4 6.4ZM18.966 17.834C18.8159 17.6839 18.6123 17.5996 18.4 17.5996C18.1877 17.5996 17.9841 17.6839 17.834 17.834C17.6839 17.9841 17.5996 18.1877 17.5996 18.4C17.5996 18.6123 17.6839 18.8159 17.834 18.966L19.434 20.566C19.5083 20.6403 19.5966 20.6993 19.6937 20.7395C19.7908 20.7797 19.8949 20.8004 20 20.8004C20.1051 20.8004 20.2092 20.7797 20.3063 20.7395C20.4034 20.6993 20.4917 20.6403 20.566 20.566C20.6403 20.4917 20.6993 20.4034 20.7395 20.3063C20.7797 20.2092 20.8004 20.1051 20.8004 20C20.8004 19.8949 20.7797 19.7908 20.7395 19.6937C20.6993 19.5966 20.6403 19.5083 20.566 19.434L18.966 17.834ZM4 12C4 11.7878 3.91571 11.5843 3.76569 11.4343C3.61566 11.2843 3.41217 11.2 3.2 11.2H0.8C0.587827 11.2 0.384344 11.2843 0.234315 11.4343C0.0842854 11.5843 0 11.7878 0 12C0 12.2122 0.0842854 12.4157 0.234315 12.5657C0.384344 12.7157 0.587827 12.8 0.8 12.8H3.2C3.41217 12.8 3.61566 12.7157 3.76569 12.5657C3.91571 12.4157 4 12.2122 4 12ZM12 20C11.7878 20 11.5843 20.0843 11.4343 20.2343C11.2843 20.3843 11.2 20.5878 11.2 20.8V23.2C11.2 23.4122 11.2843 23.6157 11.4343 23.7657C11.5843 23.9157 11.7878 24 12 24C12.2122 24 12.4157 23.9157 12.5657 23.7657C12.7157 23.6157 12.8 23.4122 12.8 23.2V20.8C12.8 20.5878 12.7157 20.3843 12.5657 20.2343C12.4157 20.0843 12.2122 20 12 20ZM23.2 11.2H20.8C20.5878 11.2 20.3843 11.2843 20.2343 11.4343C20.0843 11.5843 20 11.7878 20 12C20 12.2122 20.0843 12.4157 20.2343 12.5657C20.3843 12.7157 20.5878 12.8 20.8 12.8H23.2C23.4122 12.8 23.6157 12.7157 23.7657 12.5657C23.9157 12.4157 24 12.2122 24 12C24 11.7878 23.9157 11.5843 23.7657 11.4343C23.6157 11.2843 23.4122 11.2 23.2 11.2Z"
        fill="currentColor"
      />
    </svg>
  );
};
