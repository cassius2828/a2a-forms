import React, { Suspense } from "react";
const Landing = React.lazy(() => import("../components/Landing"));

import authRoutes from "./auth";
import formRoutes from "./forms";
import profileRoutes from "./profile";
import submissionsRoutes from "./submissions";
import ShareExp from "../components/ShareExp";
const ShowSpotlight = React.lazy(() =>
  import("../components/Display/Spotlights").then((module) => ({
    default: module.ShowSpotlight,
  }))
);

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
  {
    path: "/share-your-experience",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        }
      >
        <ShareExp />
      </Suspense>
    ),
  },
  {
    path: "/spotlights/:spotlightId",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        }
      >
        <ShowSpotlight />
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
