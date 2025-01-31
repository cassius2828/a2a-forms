import { lazy, Suspense } from "react";
const AthleteInfoForm = lazy(
  () => import("../components/Forms/AthleteInfoForm")
);
const TestimonialForm = lazy(
  () => import("../components/Forms/TestimonialForm")
);

const fromRoutes = [
  {
    path: "/spotlight-form",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        }
      >
        {<AthleteInfoForm />}
      </Suspense>
    ),
  },
  {
    path: "/testimonial-form",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        }
      >
        {<TestimonialForm />}
      </Suspense>
    ),
  },
  {
    path: "/testimonial-form/:id",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        }
      >
        {<TestimonialForm />}
      </Suspense>
    ),
  },
];

export default fromRoutes;
