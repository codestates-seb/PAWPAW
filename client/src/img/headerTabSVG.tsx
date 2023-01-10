import React from 'react';

type Props = {
  width: string;
  height: string;
  fill: string;
};

export const HeaderTabSVG = ({ width, height, fill }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 33 27'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M23.8333 26.4216H0V22.6471H23.8333V26.4216ZM33 7.54902H0V11.3235H33V7.54902ZM0 0V3.77451H20.1667V0H0ZM25.6667 0V3.77451H33V0H25.6667ZM14.6667 15.098V18.8725H33V15.098H14.6667ZM0 15.098V18.8725H9.16667V15.098H0Z'
        fill={fill}
      />
    </svg>
  );
};
