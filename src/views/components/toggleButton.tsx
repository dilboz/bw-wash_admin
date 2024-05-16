import classNames from "classnames";
import React from "react";

interface IProps {
  checked: boolean;
  onToggle: (v: boolean) => void;
}

export const ToggleButton: React.FC<IProps> = (props): JSX.Element => {
  const handleToggle = React.useCallback((): void => {
    props.onToggle(!props.checked);
  }, [props]);

  return (
    <button
      className={classNames(
        "toggle-button",
        props.checked && "toggle-button_active"
      )}
      onClick={handleToggle}
    >
      <div className="toggle-button__filled-bar-wrap">
        <div className="toggle-button__filled-bar" />
      </div>

      <div className="toggle-button__thumb" />
    </button>
  );
};
