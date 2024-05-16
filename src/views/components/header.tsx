import React from "react";
import { Link } from "@components";
import { AppPaths, AuthPaths } from "@constants";
import { useAppSelector } from "@store";
import { LSTokenName, LSBWAdminStates } from "@utils/LocaStorage";
import { history } from "@utils/history";
import classNames from "classnames";

interface IProps {
  disabled: boolean;
}

export const Header: React.FC<IProps> = (props): JSX.Element => {
  const { firstName } = useAppSelector((state) => state.user);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleSignOut = React.useCallback(() => {
    localStorage.removeItem(LSTokenName);
    localStorage.removeItem(LSBWAdminStates);
    history.push(AuthPaths.login);
  }, []);

  React.useEffect(() => {
    const handleWindowClick = (e: any) => {
      if (!e.target.closest("#profile-menu")) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, []);

  return (
    <div className={classNames("header", props.disabled && "header_disabled")}>
      <div className="container header__container">
        <h2 className="header__title">
          <Link to={AppPaths.products}>Панель администратора</Link>
        </h2>

        <div id="profile-menu" className="header__profile-wrap">
          <button className="header__profile" onClick={() => setOpen(!open)}>
            {firstName}
          </button>
          {open && (
            <div className="header__profile-menu">
              <button className="header__profile-item" onClick={handleSignOut}>
                Выход
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
