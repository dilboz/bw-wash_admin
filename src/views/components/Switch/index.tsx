import { FC, LegacyRef, useRef, useState } from "react";
import styles from "./Switch.module.scss";

interface IProps {
  checked: boolean;
  onChange?: (value: boolean) => void;
}

export const Switch: FC<IProps> = ({ checked, onChange }) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleClick = () => {
    setIsChecked((prevState) => {
      onChange && onChange(!prevState);
      return !prevState;
    });
  };

  return (
    <div
      className={`${styles.root} ${isChecked ? styles.active : ""}`}
      onClick={handleClick}
    >
      <div
        className={`${styles.ball} ${isChecked ? styles.ballActive : ""}`}
      ></div>
    </div>
  );
};
