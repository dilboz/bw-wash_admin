import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppPaths, AuthPaths, Paths } from "@constants";
import { LSBWAdminStates, LSTokenName } from "@utils/LocaStorage";
import { useAppSelector } from '@store';

interface IProps {
  children: React.ReactNode;
}

const pathList: ReadonlyArray<string> = Object.values(Paths);
const appPathList: ReadonlyArray<string> = Object.values(AppPaths);
const authPathList: ReadonlyArray<string> = Object.values(AuthPaths);

export const RouteController: React.FC<IProps> = React.memo(
  (props): JSX.Element => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.user);

    const token: string = localStorage.getItem(LSTokenName) || "";
    const path = "/" + pathname.split("/")[1];

    React.useEffect(() => {
      if (appPathList.includes(path) && token === "") {
        navigate(Paths.login);
      } else if (authPathList.includes(path) && token !== "") {
        navigate(Paths.products);
      } else if (!pathList.includes(path)) {
        navigate(Paths.notFound);
      }
    }, [path, navigate, token]);

    React.useEffect(() => {
      if (user.roleName === 3) {
        navigate(Paths.login);
        localStorage.removeItem(LSTokenName);
        localStorage.removeItem(LSBWAdminStates);
      } 
    }, [user.roleName, navigate]);

    if (
      (appPathList.includes(path) && token === "") ||
      (authPathList.includes(path) && token !== "") ||
      !pathList.includes(path)
    )
      return <></>;

    return <div>{props.children}</div>;
  }
);
