import { Icon } from "@interfaces";

export const KeyboardArrowRightIcon: React.FC<Icon> = ({
  size = 24,
}): JSX.Element => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size + "px", height: size + "px" }}
    fill="currentColor"
  >
    <path
      fill="currentColor"
      d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"
    />
  </svg>
);
