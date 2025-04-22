import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#ABADAE"
      d="M16.238 6.5h1.994l-4.355 4.977L19 18.252h-4.012l-3.141-4.108L8.25 18.25H6.257l4.658-5.324L6 6.5h4.113l2.84 3.755L16.239 6.5Zm-.7 10.558h1.105L9.513 7.63H8.328l7.21 9.428Z"
    />
  </svg>
)
export { SvgComponent as TwitterLogo }
