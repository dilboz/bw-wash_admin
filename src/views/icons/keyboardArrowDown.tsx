import { Icon } from "@interfaces";

export const KeyboardArrowDownIcon: React.FC<Icon> = ({
  size = 24,
}): JSX.Element => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size + "px", height: size + "px" }}
    fill="currentColor"
  >
    <path
      fill="currentColor"
      d="M7.41 8.59003L12 13.17L16.59 8.59003L18 10L12 16L6 10L7.41 8.59003Z"
    />
  </svg>
);
