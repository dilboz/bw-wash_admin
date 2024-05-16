import { Icon } from "@interfaces";

export const AddIcon: React.FC<Icon> = ({ size = 24 }): JSX.Element => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size + "px", height: size + "px" }}
    fill="currentColor"
  >
    <path fill="currentColor" d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
  </svg>
);
