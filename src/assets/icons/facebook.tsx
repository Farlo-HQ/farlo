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
      d="M10.052 10.105H8v2.052h2.052v6.157h3.079v-6.157h1.867l.185-2.052h-2.052V9.25c0-.49.098-.685.572-.685h1.48V6h-2.467c-1.845 0-2.664.813-2.664 2.368v1.737Z"
    />
  </svg>
)
export { SvgComponent as FacebookLogo }
