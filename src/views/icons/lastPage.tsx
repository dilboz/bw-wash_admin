import { Icon } from "@interfaces";

export const LastPageIcon: React.FC<Icon> = ({ size = 24 }): JSX.Element => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size + "px", height: size + "px" }}
    fill="currentColor"
  >
    <path
      fill="currentColor"
      d="M5.59 7.41L10.18 12L5.59 16.59L7 18L13 12L7 6L5.59 7.41ZM18 18L16 18L16 6L18 6L18 18Z"
    />
  </svg>
);
