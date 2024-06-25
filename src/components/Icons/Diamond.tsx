import { ISvgIcon } from './model'

const Diamond = ({ className }: ISvgIcon) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
  >
    <rect
      x="4.68591"
      y="0.707107"
      width="5.62689"
      height="5.62689"
      rx="0.5"
      transform="rotate(45 4.68591 0.707107)"
      stroke="black"
      strokeOpacity="0.6"
    />
    <rect
      x="4.68591"
      y="3.37207"
      width="1.85839"
      height="1.85839"
      rx="0.929195"
      transform="rotate(45 4.68591 3.37207)"
      fill="black"
      fillOpacity="0.4"
    />
    <rect
      x="4.68591"
      y="4.02911"
      width="0.929195"
      height="0.929195"
      rx="0.464598"
      transform="rotate(45 4.68591 4.02911)"
      stroke="black"
      strokeOpacity="0.6"
      strokeWidth="0.929195"
    />
  </svg>
)

export default Diamond
