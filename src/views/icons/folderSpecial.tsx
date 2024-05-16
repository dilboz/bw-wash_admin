import { Icon } from "@interfaces";

export const FolderSpecialIcon: React.FC<Icon> = ({
  size = 24,
}): JSX.Element => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size + "px", height: size + "px" }}
    fill="currentColor"
  >
    <path
      fill="currentColor"
      d="M20 6H12L10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM17.94 17L15 15.28L12.06 17L12.84 13.67L10.25 11.43L13.66 11.14L15 8L16.34 11.14L19.75 11.43L17.16 13.67L17.94 17Z"
    />
  </svg>
);
