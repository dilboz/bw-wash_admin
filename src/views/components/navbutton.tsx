import classNames from "classnames";
import React from "react";
import { Link } from "@components";

interface IProps {
  children: React.ReactNode;
  src: string;
  icon?: React.ReactNode;
  active?: boolean;
}

export const Navbutton: React.FC<IProps> = (props): JSX.Element => {
  const IconTag: any = props.icon ? props.icon : null;

  return (
    <Link
      to={props.src}
      className={classNames("navbutton", props.active && "navbutton_active")}
    >
      {props.icon && (
        <span className="navbutton__icon">{<IconTag size={20} />}</span>
      )}
      {props.children}
    </Link>
  );
};
