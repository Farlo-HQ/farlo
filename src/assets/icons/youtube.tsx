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
      d="M20.179 5.101c.904.242 1.61.95 1.855 1.855.64 2.58.598 7.46.013 10.081a2.628 2.628 0 0 1-1.855 1.855c-2.554.632-13.992.554-16.398 0a2.628 2.628 0 0 1-1.855-1.855c-.604-2.46-.562-7.662-.014-10.068.242-.904.95-1.61 1.855-1.854 3.414-.713 15.184-.483 16.399-.014ZM9.963 8.851v6.29l5.485-3.146L9.962 8.85Z"
    />
  </svg>
)
export { SvgComponent as YoutubeLogo }
