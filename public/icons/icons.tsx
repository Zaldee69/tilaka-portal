import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface IconProps {
  svgClassName?: string;
  pathClassName?: string;
  width?: number;
  height?: number;
  fill?: string;
}

export const MailIcon = ({
  svgClassName,
  pathClassName,
  width = 24,
  height = 24,
  fill = '#323232'
}: IconProps): ReactNode => (
  <svg
    className={cn(svgClassName)}
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="#000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="mail" clipPath="url(#clip0_1_1669)">
      <path
        className={cn(pathClassName)}
        id="Vector"
        d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM19.6 8.25L13.06 12.34C12.41 12.75 11.59 12.75 10.94 12.34L4.4 8.25C4.15 8.09 4 7.82 4 7.53C4 6.86 4.73 6.46 5.3 6.81L12 11L18.7 6.81C19.27 6.46 20 6.86 20 7.53C20 7.82 19.85 8.09 19.6 8.25Z"
        fill={fill}
      />
    </g>
    <defs>
      <clipPath id="clip0_1_1669">
        <rect width={width} height={height} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const UserIcon = ({
  svgClassName,
  pathClassName,
  width = 24,
  height = 24,
  fill = '#323232'
}: IconProps): ReactNode => {
  return (
    <svg
      className={cn(svgClassName)}
      width={width}
      height={height}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={cn(pathClassName)}
        d="M0.5 2V16C0.5 17.1 1.39 18 2.5 18H16.5C17.6 18 18.5 17.1 18.5 16V2C18.5 0.9 17.6 0 16.5 0H2.5C1.39 0 0.5 0.9 0.5 2ZM12.5 6C12.5 7.66 11.16 9 9.5 9C7.84 9 6.5 7.66 6.5 6C6.5 4.34 7.84 3 9.5 3C11.16 3 12.5 4.34 12.5 6ZM3.5 14C3.5 12 7.5 10.9 9.5 10.9C11.5 10.9 15.5 12 15.5 14V15H3.5V14Z"
        fill={fill}
      />
    </svg>
  );
};
