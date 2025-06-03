import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={112}
    height={112}
    viewBox="0 0 112 112"
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeWidth={3}
      d="M102.667 27.346c0-3.708-3.689-7.121-9.88-9.832-5.48-2.4-11.12 2.178-11.12 8.163v15.015m21-13.346v59.343c0 8.824-20.893 15.978-46.666 15.978-25.774 0-46.667-7.154-46.667-15.978V27.346m93.333 0c0 5.577-8.348 10.488-21 13.346M9.334 27.346c0-3.708 3.69-7.121 9.88-9.832 5.481-2.4 11.12 2.178 11.12 8.163v15.015m-21-13.346c0 5.577 8.348 10.488 21 13.346m0 0c7.363 1.663 16.185 2.631 25.667 2.631 9.482 0 18.303-.968 25.666-2.631"
    />
    <path
      stroke="#fff"
      strokeWidth={3}
      d="M91 60.667a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={3}
      d="M98 93.333 86.352 83.307c-3.756-3.234-9.349-3.556-13.483-.777l-1.077.725c-2.873 1.931-6.782 1.607-9.264-.768L47.03 67.662c-3.093-2.96-8.055-3.118-11.348-.362l-6.328 5.297L11.666 89.15"
    />
  </svg>
)
export { SvgComponent as LiveWebinars }
