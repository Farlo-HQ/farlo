import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    {...props}
  >
    <path
      fill="#575A5D"
      d="M26.982 3.333H13.015c-6.066 0-9.683 3.617-9.683 9.684v13.95c0 6.083 3.617 9.7 9.683 9.7h13.95c6.067 0 9.684-3.617 9.684-9.684V13.018c.016-6.067-3.6-9.683-9.667-9.683Z"
      opacity={0.4}
    />
    <path
      fill="#575A5D"
      d="M27.364 13.017v13.966a1.935 1.935 0 0 1-1.934 1.934 1.938 1.938 0 0 1-1.95-1.934V13.018c0-1.067.867-1.933 1.95-1.933 1.067 0 1.934.866 1.934 1.933ZM16.516 21.55v5.433a1.938 1.938 0 0 1-1.95 1.934 1.935 1.935 0 0 1-1.933-1.934V21.55c0-1.067.867-1.933 1.933-1.933 1.083 0 1.95.866 1.95 1.933Z"
    />
  </svg>
)
export { SvgComponent as ChartInactiveIcon }
