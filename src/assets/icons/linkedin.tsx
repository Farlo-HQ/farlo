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
      d="M7.453 8.164a1.625 1.625 0 1 0 0-3.25 1.625 1.625 0 0 0 0 3.25ZM10.611 9.395v9.014h2.8V13.95c0-1.176.22-2.315 1.679-2.315 1.438 0 1.456 1.345 1.456 2.39v4.384h2.8v-4.944c0-2.428-.523-4.294-3.36-4.294-1.363 0-2.277.748-2.65 1.456h-.038V9.395h-2.687Zm-4.56 0h2.803v9.014H6.05V9.395Z"
    />
  </svg>
)
export { SvgComponent as LinkedinLogo }
