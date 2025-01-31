import { lazy, Suspense } from "react";
import MainDashboard from "../components/Profile/MainDashboard";
import AdminDashboard from "../components/Profile/Admin/AdminDashboard";
import ShowTestimonial from "../components/Profile/Admin/ShowTestimonial";
import ShowSpotlight from "../components/Profile/Admin/ShowSpotlight";
const ViewYourSubmissions = lazy(
  () => import("../components/Submissions/ViewYourSubmissions")
);

const TestimonialsGrid = lazy(
  () => import("../components/Submissions/TestimonialsGrid")
);
const submissionRoutes = [
  {
    path: "/submissions/:userId/manage",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        }
      >
        <AdminDashboard />
      </Suspense>
    ),
  },
  {
    path: "/submissions/:userId/manage/testimonials/:testimonialId",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        }
      >
        <ShowTestimonial />
      </Suspense>
    ),
  },
  {
    path: "/submissions/:userId/manage/spotlights/:spotlightId",
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
  {
    path: "/submissions/:userId",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        }
      >
        <ViewYourSubmissions />
      </Suspense>
    ),
  },
  {
    path: "/submissions/testimonials/:userId",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        }
      >
        <TestimonialsGrid />
      </Suspense>
    ),
  },
];

export default submissionRoutes;
