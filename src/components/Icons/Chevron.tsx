import { ISvgIcon } from './model'

const Chevron = ({ className, color }: ISvgIcon) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M6 9L12 15L18 9"
      stroke={color || '#131719'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Chevron
