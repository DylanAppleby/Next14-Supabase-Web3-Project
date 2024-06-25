import { ISvgIcon } from './model'

const Cross = ({ className, color, size }: ISvgIcon) => (
  <svg
    className={className}
    width={size || '16'}
    height={size || '16'}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L4 12"
      stroke={color || 'currentColor'}
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 4L12 12"
      stroke={color || 'currentColor'}
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Cross
