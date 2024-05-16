import { Icon } from "@interfaces";

export const KeyboardArrowLeftIcon: React.FC<Icon> = ({
  size = 24,
}): JSX.Element => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size + "px", height: size + "px" }}
    fill="currentColor"
  >
    <path
      fill="currentColor"
      d="M15.41 7.41L10.83 12L15.41 16.59L14 18L8 12L14 6L15.41 7.41Z"
    />
  </svg>
);
