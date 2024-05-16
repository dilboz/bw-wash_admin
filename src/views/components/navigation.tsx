import React from "react";
import { useLocation } from "react-router-dom";
import { Navbutton } from "@components";
import { navigationList } from "@utils/navigation";
import classNames from "classnames";

interface IProps {
  disabled: boolean;
}

export const Navigation: React.FC<IProps> = (props): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <div className="container">
      <div
        className={classNames(
          "navigation",
          props.disabled && "navigation_disabled"
        )}
      >
        {navigationList.map((navbar, index) => (
          <Navbutton
            active={navbar.src === pathname}
            key={index}
            src={navbar.src}
            icon={navbar.icon}
          >
            {navbar.name}
          </Navbutton>
        ))}
      </div>
    </div>
  );
};
