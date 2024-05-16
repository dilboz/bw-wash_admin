import { Icon } from "@interfaces";

export const ArrowDropDownIcon: React.FC<Icon> = ({
  size = 24,
}): JSX.Element => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size + "px", height: size + "px" }}
    fill="currentColor"
  >
    <path fill="currentColor" d="M7 10L12 15L17 10L7 10Z" />
  </svg>
);
