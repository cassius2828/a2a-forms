import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/useGlobalContext";
import {
  deleteSpotlight,
  getAllUserTestimonials,
  getSpotlightByUserId,
} from "../../services/formService";
import { formatDate, getStatusClass } from "../../lib/utils";
import {
  AthleteSpotlightSubmissionDisplay,
  StatusType,
  TestimonialDisplayData,
} from "../../lib/types";
import ConfirmationModal from "../Modals/ConfirmationModal";

const ViewYourSubmissions = () => {
  const { user, error, setError } = useGlobalContext();
  const { userId } = useParams();
  const [spotlightSubmission, setSpotlightSubmission] =
    useState<AthleteSpotlightSubmissionDisplay>({
      id: "",
      title: "",
      status: "pending",
      date: "",
      type: "",
      admin_comment: "",
    });
  const [testimonialSubmissions, setTestimonialSubmissions] = useState<
    TestimonialDisplayData[]
  >([]);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
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
    if (user && userId) {
      fetchUserSpotlightSubmission(userId);
      fetchUserTestimonialSubmissions(userId);
    }
    console.log(spotlightSubmission);
  }, [userId]);

  return (
    <div className="p-8 space-y-6 mt-20 w-full">
      {/* Dashboard Title */}
      {showConfirmationModal && (
        <ConfirmationModal
          title="Delete your athlete spotlight?"
          info="This is irreversable, your athlete spotlight will be removed from the website. Any new spotlights form submissions must be approved again by the admin."
          id={spotlightSubmission.id}
          greenAction={() => setShowConfirmationModal(false)}
          greenActionText="Keep Spotlight"
          redAction={deleteSpotlight}
          redActionText="Delete"
        />
      )}
      <h1 className="text-3xl font-semibold text-gray-200 text-center pb-12">
        View Submissions
      </h1>
      <div className="flex flex-col gap-12 justify-around w-full md:w-3/4 mx-auto ">
        {/* Spotlight Submissions Section */}
        <SpotlightSubmission
          spotlightSubmission={spotlightSubmission}
          setShowConfirmationModal={setShowConfirmationModal}
        />

        {/* Testimonial Submissions Section */}
        <TestimonailSubmissions
          testimonialSubmissions={testimonialSubmissions}
        />
      </div>
    </div>
  );
};

export default ViewYourSubmissions;

export const TestimonailSubmissions = ({
  testimonialSubmissions,
}: {
  testimonialSubmissions: TestimonialDisplayData[];
}) => {
  const { user } = useGlobalContext();
  return (
    <div className="space-y-4 w-full mt-12 md:mt-0 ">
      <h2 className="text-xl font-medium text-gray-300 ">
        Testimonial Submissions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {testimonialSubmissions.slice(0, 3).map((submission) => (
          <div
            key={submission.id}
            className="bg-neutral-800 p-4 rounded-lg shadow-md flex flex-col"
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
            <div className="text-gray-200 mb-3 mt-5">
              <span className="font-semibold">Admin Comment:</span>
              <p className="text-sm mt-1">
                {submission.admin_comment ? submission.admin_comment : "N/A"}
              </p>
            </div>
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
      {user && testimonialSubmissions.length > 3 ? (
        <Link
          to={`/submissions/testimonials/${user?.id}`}
          className="text-sm text-gray-100 hover:underline w-full flex justify-center"
        >
          View All {testimonialSubmissions.length } Testimonial Submissions
        </Link>
      ) : (
        <Link
          to={`/testimonial-form`}
          className="text-sm text-gray-100 bg-gray-500 hover:bg-gray-600 rounded-md px-4 py-2 w-48 flex justify-center font-semibold transition duration-300 relative z-10"
        >
          Create a Testimonial
        </Link>
      )}
    </div>
  );
};

export const SpotlightSubmission = ({
  spotlightSubmission,
  setShowConfirmationModal,
}: {
  spotlightSubmission: AthleteSpotlightSubmissionDisplay;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="space-y-4 w-full">
      <h2 className="text-xl font-medium text-gray-300">
        Spotlight Submission
      </h2>
      {spotlightSubmission.id ? (
        <div>
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
            <div className="text-gray-200 mb-3 mt-5">
              <span className="font-semibold">Admin Comment:</span>
              <p className="text-sm mt-1">
                {spotlightSubmission.admin_comment
                  ? spotlightSubmission.admin_comment
                  : "N/A"}
              </p>
            </div>
            <div className=" flex justify-between items-center mt-3">
              <Link
                to={`/spotlight-form`}
                className="text-sm text-blue-500 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => setShowConfirmationModal(true)}
                className="text-sm text-gray-100 bg-red-500 hover:bg-red-600 rounded-md px-4 py-2 flex justify-center font-semibold transition duration-300 relative z-10"
              >
                delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Link
          to={`/spotlight-form`}
          className="text-sm text-gray-100 bg-gray-500 hover:bg-gray-600 rounded-md px-4 py-2 w-48 flex justify-center font-semibold transition duration-300 relative z-10"
        >
          Create a Spotlight
        </Link>
      )}
    </div>
  );
};
