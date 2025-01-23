import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./index";
const NotFound404 = lazy(
  () => import("../components/PlaceholderPages/NotFound404.js")
);
import { DefaultLoader } from "../components/Loaders/index.js";

const AppRoutes = () => {
  return (
    <Suspense fallback={<DefaultLoader />}>
      <Routes>
        {routes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
