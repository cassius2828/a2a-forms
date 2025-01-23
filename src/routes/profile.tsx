import { lazy, Suspense } from "react";

// Lazy imports
const ProfileSettings = lazy(() => import("../components/Profile/Settings"));
const MainDashboard = lazy(() => import("../components/Profile/MainDashboard"));
const ComingSoon = lazy(
  () => import("../components/PlaceholderPages/ComingSoon")
);
const profileRoutes = [
  {
    path: "/profile/:userId/appointments",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        }
      >
        <ComingSoon />
      </Suspense>
    ),
  },
  {
    path: "/profile/:userId/membership",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        }
      >
        <ComingSoon />
      </Suspense>
    ),
  },
  {
    path: "/profile/:userId/preferences",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        }
      >
        <ComingSoon />
      </Suspense>
    ),
  },
  {
    path: "/profile/:userId/settings",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        }
      >
        <ProfileSettings />
      </Suspense>
    ),
  },
  {
    path: "/profile/:userId/billing",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        }
      >
        <ProfileSettings />
      </Suspense>
    ),
  },
  {
    path: "/profile/:userId",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        }
      >
        <MainDashboard />
      </Suspense>
    ),
  },
];
export default profileRoutes;
