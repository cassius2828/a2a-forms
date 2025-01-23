import { lazy, Suspense } from "react";
const ViewYourSubmissions = lazy(
  () => import("../components/Submissions/ViewYourSubmissions")
);

const TestimonialsGrid = lazy(
  () => import("../components/Submissions/TestimonialsGrid")
);
const submissionRoutes = [
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
