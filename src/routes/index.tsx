import React from "react";
import { RouteList } from "./route.list";
import { RouteController } from "./route.controller";
import { Router } from "react-router-dom";
import { History } from "history";

interface IProps {
  history: History;
  children: React.ReactNode;
}

export const CustomRouter: React.FC<IProps> = ({ history, children }) => {
  const [state, setState] = React.useState<any>({
    action: history.action,
    location: history.location,
  });

  React.useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
};

export const Routes: React.FC = () => {
  return (
    <RouteController>
      <RouteList />
    </RouteController>
  );
};
