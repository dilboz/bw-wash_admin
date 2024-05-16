import React from "react";
import { Route, Routes } from "react-router-dom";
import { Loading } from "@components";
import { routeConfig } from "routes/route.config";

export const RouteList: React.FC = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        {routeConfig.map((route, index) => {
          const RouteTag = route.element;
          return (
            <Route
              index={route.index}
              key={index}
              path={route.path + (route.index ? "" : "/:id")}
              element={<RouteTag />}
            />
          );
        })}
      </Routes>
    </React.Suspense>
  );
};
