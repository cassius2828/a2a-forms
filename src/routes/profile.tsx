import { lazy, Suspense } from "react";
import ConfirmEmailChange from "../components/Profile/Settings/ConfirmEmailChange";

// Lazy imports
const ProfileSettings = lazy(() => import("../components/Profile/Settings"));
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
        <ComingSoon />
      </Suspense>
    ),
  },
  {
    path: "/confirm-email",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        }
      >
        <ConfirmEmailChange />
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
        {/* <MainDashboard /> */}
        <ComingSoon text="Your profile dashboard is coming soon! Soon, you'll be able to manage your upcoming appointments, customize your account settings, and access personalized features—all in one place. We're working hard to bring you an amazing experience, so stay tuned!" />
      </Suspense>
    ),
  },
];
export default profileRoutes;
