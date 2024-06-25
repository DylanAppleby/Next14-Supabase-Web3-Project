import { ISvgIcon } from './model'

const RightArrow = ({ className }: ISvgIcon) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.41083 12.2454C6.08539 12.5708 6.08539 13.0985 6.41083 13.4239C6.73626 13.7493 7.2639 13.7493 7.58934 13.4239L13.4227 7.59056C13.7481 7.26512 13.7481 6.73748 13.4227 6.41205L7.58934 0.578714C7.2639 0.253276 6.73626 0.253276 6.41083 0.578714C6.08539 0.90415 6.08539 1.43179 6.41083 1.75722L10.8216 6.16797L1.16675 6.16797C0.706512 6.16797 0.333416 6.54106 0.333416 7.0013C0.333416 7.46154 0.706512 7.83464 1.16675 7.83464L10.8216 7.83464L6.41083 12.2454Z"
      fill="currentColor"
    />
  </svg>
)

export default RightArrow
