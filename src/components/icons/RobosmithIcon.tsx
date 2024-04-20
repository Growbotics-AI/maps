import * as React from "react";

export interface IconProps {
  size?: number;
  color?: string; // Include if you want to change the icon color dynamically
}

const RobosmithIcon: React.FunctionComponent<IconProps> = ({ size = 24, color = "black", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size} 
    height={size}
    fill={color} 
    viewBox="0 0 2048 2048"
    {...props}
  >

    <path d="M991 161c-39.7 3.1-78.1 10.8-115 22.9-25.3 8.4-38.7 13.9-63.5 26.1-50.7 25-89.5 52.5-130.2 92.3-27.7 27.2-46.6 50-67.7 81.7-33.4 50-55 100.5-65.6 153.1l-1.1 5.6-13 1.2c-30.8 2.8-55 13.5-75.7 33.6-20 19.2-31.7 42-35.7 69.1-1.4 9.6-1.5 24.4-1.2 121.4.3 108.2.3 110.7 2.4 119.5 7.8 33.3 25.6 59.4 52.8 77.4 24.3 16 46.3 21 93 21.1l20 .1 7.5 13.1c38.7 67.8 94.9 128 159 170.3 20 13.2 31.2 19.7 54.1 31C832.5 1211 842 1215 865 1223l16.5 5.8v48.7l-160 .5c-159.8.5-160 .5-169.5 2.7-51.8 11.8-92 39.6-122.1 84.4-15.6 23.2-28.2 54.6-32.8 81.4-.7 3.8-1.4 7.9-1.6 9.1-.4 1.6-3 2.9-13.6 6.4-49.6 16.3-87.2 54.1-103.6 104-10.2 31.1-10.1 68.9.2 99.7 18.3 54.7 62.6 93.8 120.8 106.5 8.9 1.9 13.2 2.2 33.2 2.3 20.4 0 24.2-.3 33.9-2.3 20.1-4.3 40.4-12.6 56.6-23 9.4-6.1 24.9-19 29.6-24.8 2-2.4 4-4.4 4.5-4.4s.9 12.6.9 28v28h929v-57.1l9.3 9.3c20.1 20 45.8 34.5 74 41.8 17.1 4.4 27 5.3 48.4 4.7 20.8-.6 30-2.2 47.8-8.1 38.6-12.9 71.8-41.4 90.3-77.5 10.3-20 15.4-37.4 17.4-59.8 3.9-42.7-10.6-86-39.8-119.8-19.7-22.7-49.6-41.5-77.5-49l-6.7-1.7-2.2-11.2c-9.1-45.8-29.3-84.2-60.5-115.1-29.3-29-64.7-47.2-103-53-8.6-1.3-32.1-1.5-165.2-1.5H1164v-50.5l10.8-3.3c53.1-16.6 114.9-51.7 162.2-92.2 23-19.6 52.8-51.3 73.9-78.4 13.9-17.9 43.1-63 43.1-66.5 0-.5 12.9-1.1 28.8-1.4 39.5-.8 52.7-3.3 73.4-13.9 35-17.9 58.3-50.2 65.5-90.8 1.7-9.8 1.8-18 1.8-119 0-99.1-.2-109.3-1.7-117.6-6.5-33.3-25-61.4-52.4-79.7-19.3-12.8-40.4-19.8-63.9-21.1-6.8-.3-8.1-.7-8.3-2.2-1.1-6.1-7.8-31.6-10.8-41.4-20.8-67-61.4-133.2-115.4-188.3-43.4-44.4-87.7-76.3-143.5-103.3-52.8-25.5-104.7-40.1-165-46.4-13.8-1.5-57.6-2-71.5-1zm79 55.4c31.1 4.4 60.5 11.1 86 19.8 98.2 33.4 180.9 99.8 237.3 190.3 10.5 16.9 25.2 45.5 32 62.5 6.2 15.2 12.4 33.7 11.6 34.4-1.4 1.4-64.9 13.1-97.9 18-105.2 15.8-199.1 22.6-314 22.6-110 0-201.8-6.1-302-20.1-37.3-5.2-113-18.5-114.6-20.2-1-.9 3.9-16.1 10.7-33.2 30.8-78.4 92.9-154.4 165.4-202.6 60-39.9 126.9-64.8 193-71.8 5.5-.6 11.6-1.3 13.5-1.5 9.3-1.1 68.1.3 79 1.8zM608.6 577c81.8 16.9 188.4 30.3 281.9 35.5 88.6 4.8 180.7 4.8 265.5 0 94.3-5.5 191.6-17.6 276.8-34.6 8.5-1.7 15.5-2.9 15.7-2.7.8.8 3.6 31.6 6.5 71.3 1.7 23.1 4 50.4 5 60.6 2.6 25.4 3.4 41 2.6 50.2l-.8 7.7h-37.4c-37.3 0-37.4 0-37.4-2.1 0-1.1-.9-6.5-2-12-18.7-91.6-113.6-145.7-203.9-116.3-46 15-83.5 51.6-98.5 96.3-1.7 5.3-3.5 10.2-3.9 10.7-.4.8-17.7 1.2-56.4 1.3l-55.8.1-2.9-9c-9.8-30.9-32.2-60.4-60.9-80.1-50.6-34.8-118.6-36.4-172-4-36.3 22-62.7 60.3-70.3 101.8-.8 4.8-1.8 9.8-2 11l-.4 2.3h-35.4c-19.5 0-36.1.3-37 .6-1.4.5-1.6-1.3-1.6-16.3 0-9.3.9-26.3 2-37.8 2.9-30.7 5.7-66 8-99.5 2.1-31.5 2.7-37 4-37 .4 0 5.2.9 10.6 2zm-67.2 24.3c-.3 2.8-1.6 18.2-2.9 34.2-1.3 15.9-3.6 41.4-5.1 56.5-2.3 22.8-2.7 32.7-2.8 58-.1 18.6.4 35 1.2 42 4.9 43.8 13.3 82.1 26.6 120.3 3.5 10 6.7 19 7.1 20.1.8 1.8.2 1.9-15.1 1.3-18.2-.6-23.9-1.9-36.4-8-6.8-3.3-10.2-5.8-17-12.7-12.3-12.3-18.3-23.9-20.9-40-.7-4.2-1.1-42.8-1.1-111 0-85.4.3-105.7 1.4-111 4.6-21.6 18.1-39.1 37-48.4 8.8-4.2 24.7-8.2 27.8-6.9.3.2.4 2.7.2 5.6zm977-3.3c20.1 5.1 36.4 18.6 45.2 37.7 7.1 15.2 6.8 8.8 7.2 120.8.3 107.1.1 114.7-4.3 127.6-7.1 21-24.1 38.5-44.3 45.3-9.5 3.3-18.9 4.6-32.2 4.6-10.3 0-11.2-.1-10.5-1.8 12.1-29.4 25.3-78 30.4-112.2 5.7-37.9 7.4-78 4.7-107.5-.9-9.4-3.4-37.9-5.6-63.5-2.2-25.6-4.2-48-4.5-49.8-.6-3.1-.5-3.2 2.8-3.2 1.9 0 6.8.9 11.1 2zm-678 84.5c51.7 13.6 85 63.9 76.1 115-9.1 52-55.3 88.3-108.3 85.2-15.9-1-26.5-3.8-40.7-10.9-26.7-13.3-45-35.9-53.2-65.5-2.5-8.7-2.8-11.5-2.8-25.3 0-16.7 1.7-25.7 7.1-39 12.7-31.2 42.4-54.9 77.3-61.5 11.7-2.2 32-1.3 44.5 2zm417.1-.1c41 10.5 71.1 44.6 76.5 86.6 3.9 29.8-8.2 63.6-30.2 84.6-12.4 11.9-29.7 21.6-46.6 26.1-8.6 2.3-11.6 2.6-26.2 2.6s-17.6-.3-26.2-2.6c-42.9-11.4-72.2-45.6-76.8-89.5-.9-8.5-.2-22.9 1.6-30.2 9.9-41.5 41.6-71.5 83.9-79.5 11.9-2.2 31.2-1.4 44 1.9zM1076 798.6c0 5.6 3.7 22.4 7.1 32.1 4.6 13.2 14.1 30.8 22.9 42.5 22.9 30.5 54.8 50.7 93 59 14.1 3 48.6 3.3 62 .5 58.2-12.2 101.2-50.3 118.7-104.9l3.8-11.8h72.8l-.7 5.2c-.4 2.9-2.2 12.3-4.2 20.9-19.2 86.6-62.8 165.7-125.5 227.6-17.2 17-28 26.3-45.4 39.3-39.6 29.6-80.2 50.9-127 66.5-66.9 22.3-131.8 27.5-201 15.9-123.8-20.6-235.3-97.3-302.3-208.1-10.4-17.2-26.3-49.4-33.6-67.8-10.6-27.1-19.5-57.5-24.6-84-1.1-6.1-2.3-12-2.6-13.3l-.4-2.2h72.7l3.6 11.2c8 24.9 19.7 44 38.6 62.9 18.6 18.5 36.2 29.5 60.3 37.3 18.7 6.2 25.6 7.1 50.8 7.1 19.4-.1 23.9-.4 32.7-2.3 63.6-13.8 111.6-64.8 121.4-129l1.2-8.2H1076v3.6zm35 460.9v18.5H935.1l-.3-17.8c-.2-9.7-.2-17.8-.2-18 .1-.2 6.2.6 13.5 1.7 28.1 4.3 44.3 5.5 74.9 5.5 31.4 0 47.4-1.3 74-5.8 7.4-1.3 13.6-2.4 13.8-2.5.1 0 .2 8.2.2 18.4zm-394 83.2c0 13.4.9 26.4 2.6 38l.6 4.3H617v-57h100v14.7zm165.2 9c.4 21.3.7 24.5 2.7 30.8 8.2 25.4 27.7 44.2 53.6 51.7l8 2.3h154l8-2.3c22.3-6.5 41.5-23.4 49.9-44.1 4.5-11.2 5.6-19.2 5.6-41.6V1328h112v10.2c0 11.7-2.2 33.3-4.5 45.5-13.4 69.9-56.5 132.1-117 168.8-97.9 59.5-224.4 46.5-305.7-31.3-41.8-40.1-68.9-93.8-76.2-151.2-1.8-13.9-3.1-39.4-2.2-40.9.5-.8 16.8-1.1 56.1-1.1h55.3l.4 23.7zm228.8-5c0 16-.3 19.4-1.9 22.8-2.7 5.9-6.8 10.3-12.2 13l-4.8 2.5H1023c-76.1 0-73 .3-79.9-6.3-1.8-1.8-4.4-5.5-5.7-8.2-2.2-4.7-2.4-6.1-2.4-23.8V1328h176v18.7zm316 9.8v28.5h-101.2l.6-3.8c1.8-11.6 2.7-23 2.9-37.2l.2-16h97.5v28.5zM558 1424c0 48.4-.1 88-.2 88-.2 0-4.4-3.9-9.3-8.8-24.9-24.1-56.4-40.5-87.6-45.4l-8-1.3.6-4c1.1-7 4.6-18.6 8.6-29 14.5-37.4 48.2-70.5 85.9-84.6 4.1-1.5 8.1-2.8 8.8-2.9.9 0 1.2 18.2 1.2 88zm937.6-85.6c18.7 6.3 37.2 18.3 53.4 34.6 12.6 12.5 21.1 24.3 29 40 7.7 15.3 16.3 42.7 13.6 43.5-.6.2-3.3.6-6.1 1-7.6.9-26.1 6-34.4 9.5-21.3 8.7-37.5 19.4-53.3 35.2l-10.8 10.7v-88.5c0-48.6.4-88.4.8-88.4.5 0 4 1.1 7.8 2.4zm-760.7 103.3c9.8 28.3 26.2 57.7 47.5 85.3 9.7 12.5 36.7 40 48.6 49.4 47.7 37.7 102.4 59.2 164 64.7 16.8 1.5 52.1.7 68.4-1.6 86.8-11.9 158.8-55.1 209.3-125.5 13.7-19.1 29.9-49.7 36.4-69l3.4-10H1427v291H617v-291h115.5l2.4 6.7zm-285.6 67.8c72.2 10.9 113.6 89 81.3 153.3-30.7 61.1-110.5 79.2-165.3 37.5-18.7-14.2-31.6-33.9-38.1-58.2-2.2-8.4-2.5-11.6-2.5-26.1 0-14.5.3-17.7 2.6-26.1 5.3-20 14.4-36.3 27.8-49.8 25-25 58.6-36 94.2-30.6zm1180 0c42.6 6.4 75.9 35.9 88.3 78 3.7 12.8 4.5 35.7 1.6 49.5-8.7 41.8-39 72.6-82 83.2-7 1.7-11.8 2.2-24.2 2.2-16.3 0-22.1-.8-35.5-5.1-47.5-15.3-78.5-62.5-73.5-111.7 3.9-38.1 25.7-69.2 60.5-86.2 20.9-10.1 41.9-13.4 64.8-9.9z" />
    <path d="M799 731.9c-9.1 2.9-14.2 6.1-21 13-10.7 10.8-15 21.4-15 36.6 0 13.5 4.4 24.8 13.4 34.3 9.3 9.9 17.4 14.1 31.5 16.3 15.8 2.4 32.7-3.6 44-15.6 10-10.7 14.3-21.6 14.2-35.8 0-22.4-14.6-42.1-36-48.7-8.3-2.6-23.3-2.6-31.1-.1zm417.7-.4c-25.1 6.9-41.1 32.3-36.7 58.2 3.1 18.6 17.1 34.7 34.9 40.4 9.2 2.9 23.1 2.9 32.2 0 13.2-4.2 25.1-14.5 30.8-26.5 3.9-8 5.1-13.4 5.1-22.6 0-9.4-1.3-14.8-5.3-23-6.1-12.4-20.4-23.9-33.7-26.9-6.2-1.4-21.5-1.2-27.3.4zm-283.2 278.6c-8.8.7-14.9 3.4-19.7 8.7-4.8 5.4-6.9 10.4-7.1 17.2-.4 11.2 5.3 21.3 14.7 26.3l4.1 2.2 94.9.3c105.7.3 101.4.5 109.5-6.5 16.9-14.4 9.3-42.7-12.9-47.9-3.9-.9-172.5-1.2-183.5-.3z" />
  </svg>
)
export default RobosmithIcon
