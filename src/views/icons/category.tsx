import { Icon } from "@interfaces";

export const CategoryIcon: React.FC<Icon> = ({ size = 24 }): JSX.Element => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size + "px", height: size + "px" }}
    fill="currentColor"
  >
    <path
      fill="currentColor"
      d="M3 15H11V13H3V15ZM3 19H11V17H3V19ZM3 11H11V9H3V11ZM3 5V7H11V5H3ZM13 5H21V19H13V5Z"
    />
  </svg>
);
