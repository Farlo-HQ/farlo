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
      stroke="#CB1A36"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M8 20h23.333"
    />
  </svg>
)
export { SvgComponent as MinusIcon }
