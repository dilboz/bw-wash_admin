import classNames from "classnames";
import { Link as LinkFromRouterDom } from "react-router-dom";

interface IProps {
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  onHover?: () => void;
}

export const Link: React.FC<IProps> = (props): JSX.Element => {
  return (
    <LinkFromRouterDom
      draggable={false}
      to={props.to}
      className={classNames(props.className, "link")}
      onClick={props.onClick}
      onMouseEnter={props.onHover}
    >
      {props.children}
    </LinkFromRouterDom>
  );
};
