import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/useGlobalContext";
import {
  getAllUserTestimonials,
  getSpotlightByUserId,
} from "../../services/formService";
import { formatDate, getStatusClass } from "../../lib/utils";
import { TestimonialDisplayData } from "../../lib/types";

type Submission = {
  id: number;
  title: string;
  status: "pending" | "approved" | "rejected";
  date: string;
  type: "spotlight" | "testimonial"; // Type of submission (spotlight or testimonial)
};





const ViewYourSubmissions = () => {
  const { user, error, setError } = useGlobalContext();
 
  const [spotlightSubmission, setSpotlightSubmission] = useState({
    id: null,
    title: "",
    status: "",
    date: "",
    type: "",
  });
  const [testimonialSubmissions, setTestimonialSubmissions] = useState<TestimonialDisplayData[]>([]);
  const fetchUserSpotlightSubmission = async (userId: string) => {
    try {
      const data = await getSpotlightByUserId(userId);
      if (data.error) {
        setError(data.error);
      } else {
        setSpotlightSubmission({
          id: data.id,
          title: `${data.first_name} ${data.last_name}, ${data.sport} | class ${data.grad_year}`,
          status: data.status,
          date: formatDate(data.createdAt),
          type: "spotlight",
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.error);
    }
  };
  const fetchUserTestimonialSubmissions = async (userId: string) => {
    try {
      const data = await getAllUserTestimonials(userId);
      if (data.error) {
        setError(data.error);
      } else {
        setTestimonialSubmissions(data);
      }
    } catch (err) {
      console.error(err);
      setError(err.error);
    }
  };
  useEffect(() => {
    if (user) {
      fetchUserSpotlightSubmission(user?.id);
      fetchUserTestimonialSubmissions(user?.id);
    }
  }, [user?.id]);
  return (
    <div className="p-8 space-y-6 mt-20 bg-red-800 w-full">
      {/* Dashboard Title */}
      <h1 className="text-3xl font-semibold text-gray-200">View Submissions</h1>
      <div className="flex justify-around w-full md:w-3/4 mx-auto ">
        {/* Spotlight Submissions Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-medium text-gray-300">
            Spotlight Submission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              key={spotlightSubmission.id}
              className="bg-neutral-800 p-4 rounded-lg shadow-md flex flex-col w-96"
            >
              <h3 className="font-semibold text-lg text-gray-200 capitalize">
                {spotlightSubmission.title}
              </h3>
              <p
                className={`my-2 p-2 inline-block text-md rounded-md ${getStatusClass(
                  spotlightSubmission.status
                )}`}
              >
                {spotlightSubmission.status.charAt(0).toUpperCase() +
                  spotlightSubmission.status.slice(1)}
              </p>
              <p className="mt-2 text-sm text-gray-200">
                Date Submitted: {spotlightSubmission.date}
              </p>
              <div className=" flex justify-between items-center mt-3">
                <Link
                  to={`/spotlight-form`}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Submissions Section */}
        <div className="space-y-4 w-full bg-blue-400">
          <h2 className="text-xl font-medium text-gray-300 ">
            Testimonial Submissions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-x-12 gap-y-6">
            {testimonialSubmissions.slice(0, 4).map((submission) => (
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
          </div>{" "}
          {user && (
            <Link
              to={`/submissions/testimonials/${user?.id}`}
              className="text-sm text-gray-100 hover:underline w-full flex justify-center"
            >
              View All Testimonial Submissions
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewYourSubmissions;
