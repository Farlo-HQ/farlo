import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={17}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M2.668 8.65a.5.5 0 0 1 .432-.495l.068-.005h10a.5.5 0 0 1 .068.996l-.068.004h-10a.5.5 0 0 1-.5-.5Z"
    />
    <path
      fill="#fff"
      d="M8.782 4.989a.5.5 0 0 1 .65-.757l.056.048 4.033 4.016a.5.5 0 0 1 .049.652l-.05.057-4.032 4.016a.5.5 0 0 1-.755-.652l.049-.056 3.677-3.663L8.782 4.99Z"
    />
  </svg>
);
export { SvgComponent as ArrowRight };
