import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={89}
    height={88}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a-icon)">
      <mask
        id="b-icon"
        width={89}
        height={88}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}
      >
        <path fill="#fff" d="M88.5 0H.5v88h88V0Z" />
      </mask>
      <g mask="url(#b-icon)">
        <path
          fill="url(#c-icon)"
          d="M86.687 0H2.313A1.813 1.813 0 0 0 .5 1.813v84.374C.5 87.188 1.312 88 2.313 88h84.374a1.813 1.813 0 0 0 1.813-1.813V1.813A1.813 1.813 0 0 0 86.687 0Z"
        />
        <g fill="#FAFAFA" filter="url(#d-icon)">
          <path d="M46.853 16.807H34.37a5.458 5.458 0 0 0-3.825 1.563L18.938 29.978a5.462 5.462 0 0 0-1.631 3.893v12.477h13.837V30.645h15.709V16.807Z" />
          <path d="M31.144 42.809 18.938 55.014a5.462 5.462 0 0 0-1.631 3.894v12.291h13.837V42.81ZM43.321 30.64 55.51 18.446c1.024-1.042 2.107-1.64 3.57-1.64h12.614v13.846h-15.02l-13.357-.014h.005ZM71.694 35.874H53.456a5.458 5.458 0 0 0-3.825 1.564l-11.617 11.62a5.463 5.463 0 0 0-1.631 3.894v18.243H50.22V49.707h21.474V35.874Z" />
        </g>
      </g>
    </g>
    <rect
      width={87}
      height={87}
      x={1}
      y={0.5}
      stroke="#fff"
      strokeOpacity={0.04}
      rx={15.5}
    />
    <defs>
      <linearGradient
        id="c-icon"
        x1={44.5}
        x2={44.5}
        y1={0}
        y2={88}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2C2E30" />
        <stop offset={1} stopColor="#1D1F22" />
      </linearGradient>
      <clipPath id="a-icon">
        <rect width={88} height={88} x={0.5} fill="#fff" rx={16} />
      </clipPath>
      <filter
        id="d-icon"
        width={54.387}
        height={55.593}
        x={17.307}
        y={16.807}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={1.2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.956863 0 0 0 0 0.972549 0 0 0 0 0.984314 0 0 0 1 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_289_27685"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_289_27685"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={0.5} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend in2="shape" result="effect2_innerShadow_289_27685" />
      </filter>
    </defs>
  </svg>
)
export { SvgComponent as LogoIconBlack }
