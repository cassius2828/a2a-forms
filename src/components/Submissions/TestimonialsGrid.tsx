import { Link, useParams } from "react-router-dom";
import { formatDate, getStatusClass } from "../../lib/utils";
import { useEffect } from "react";
import { useGlobalContext } from "../../context/useGlobalContext";

const TestimonialsGrid = () => {
  const { user, userTestimonials, fetchUserTestimonialSubmissions } =
    useGlobalContext();
  const { userId } = useParams();
  useEffect(() => {
    if (userId) fetchUserTestimonialSubmissions(userId);
  }, [userId]);
  return (
    <div className="flex flex-wrap gap-8 justify-center w-full md:w-4/5 mt-20">
      {userTestimonials.map((submission) => (
        <div
          key={submission.id}
          className="bg-neutral-800 p-4 rounded-lg shadow-md flex flex-col w-72"
        >
          <h3 className="font-semibold text-lg text-gray-200 capitalize">
            {submission.name}
          </h3>
          <p
            className={`my-2 p-2 inline-block text-md rounded-md ${getStatusClass(
              submission.status
            )}`}
          >
            {submission.status.charAt(0).toUpperCase() +
              submission.status.slice(1)}
          </p>
          <p className="mt-2 text-sm text-gray-200">
            {submission.text.slice(0, 60) + "..."}
          </p>
          <p className="mt-2 text-sm text-gray-200">
            Date Submitted: {formatDate(submission.createdAt)}
          </p>
          <div className=" flex justify-between items-center mt-3">
            <Link
              to={`/testimonial-form/${submission.id}`}
              className="text-sm text-blue-500 hover:underline"
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TestimonialsGrid;
