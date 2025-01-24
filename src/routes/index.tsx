import React, { Suspense } from "react";
const Landing = React.lazy(() => import("../components/Landing"));

import authRoutes from "./auth";
import formRoutes from "./forms";
import profileRoutes from "./profile";
import submissionsRoutes from "./submissions";

const routes = [
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        }
      >
        <Landing />
      </Suspense>
    ),
  },
  ...authRoutes,
  ...formRoutes,
  ...profileRoutes,
  ...submissionsRoutes,
  ...profileRoutes,
];

export default routes;
