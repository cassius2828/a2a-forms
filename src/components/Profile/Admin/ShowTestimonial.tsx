import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleTestimonial } from "../../../services/formService";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { TestimonialDataManageView } from "../../../lib/types";
import { DefaultLoader } from "../../Loaders";
import SimpleModal from "../../Modals/SimpleModal";

const initialTestmonialData = {
  id: "",
  name: "Anonymous",
  text: "No testimonial available.",
  createdAt: "",
  status: "pending",
  admin_comment: "",
};
const ShowTestimonial = () => {
  const [testimonial, setTestimonial] = useState<TestimonialDataManageView>(
    initialTestmonialData
  );
  const [isApproved, setIsApproved] = useState<boolean>(false);

  const {
    error,
    setError,
    message,
    isLoading,
    setIsLoading,
    scrollToTop,
    user,
    handleRejectTestimonial,
    handleApproveTestimonial,
    handleCloseModalAndNavigate,
    handleInputChange,
  } = useGlobalContext();
  const navigate = useNavigate();

  const { testimonialId } = useParams();

  const fetchTestimonialById = async (id: string) => {
    setIsLoading(true);
    try {
      if (id) {
        const data = await getSingleTestimonial(id);
        if (data.error) {
          setError(data.error);
        } else {
          setTestimonial(data);
          setIsApproved(Boolean(data.status === "approved"));
        }
      }
    } catch (err) {
      console.error(err);
      setError("Unable to get testimonial");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (testimonialId) fetchTestimonialById(testimonialId);

    scrollToTop(false);
  }, [testimonialId]);

  if (!testimonialId) return <span>cannot locate testimonial ID</span>;
  if (isLoading) return <DefaultLoader />;
  if (user?.id !== import.meta.env.VITE_ADMIN_ID)
    return <h1>Not Authorized</h1>;
  return (
    <div className="flex flex-col justify-start w-full md:w-2/3 lg:w-1/2 mx-auto p-4 bg-neutral-900 rounded-lg shadow-md mt-20 relative">
      {/* Text Heading */}
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">
        Testimonial Review
      </h2>

      {/* Testimonial Content */}
      <div className="mb-4 text-white p-4">
        <div className="w-full flex flex-col">
          {/* card */}
          <div className="flex flex-col p-5 gap-y-4 justify-between items-center text-sm text-gray-200 bg-neutral-800 rounded-md min-h-48 mt-4">
            <p className="text-lg text-gray-300 mb-2">{testimonial.text}</p>
            <span>
              <strong className="text-white">By:</strong> {testimonial.name}
            </span>
          </div>
          {/* status and date */}
          <div className="mt-8 flex gap-8 justify-end">
            {/* date */}
            <span>
              <strong className="text-white">Date:</strong>{" "}
              {new Date(testimonial.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div>
        <label className="text-gray-300" htmlFor="adminComment">
          Admin Comment
        </label>
      </div>
      <input
        name="admin_comment"
        id="admin_comment"
        type="textarea"
        value={testimonial.admin_comment}
        onChange={(e) => handleInputChange(e, setTestimonial)}
        className="w-full h-auto my-3 p-3 bg-neutral-800 text-gray-100 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
        placeholder="Add any comments or feedback here..."
      />
      <div className="mt-2 text-gray-100">
        <p>
          Current Status:{" "}
          <span
            className={`${
              testimonial.status === "pending"
                ? "text-yellow-500"
                : isApproved
                ? "text-green-500"
                : "text-red-500"
            } capitalize`}
          >
            {testimonial.status}
          </span>
        </p>
      </div>
      {/* Action Buttons */}
      <div className="mt-8 flex flex-col-reverse md:flex-row justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-700 text-white rounded-md font-semibold hover:bg-gray-600 transition duration-300 focus:outline-none"
        >
          Back
        </button>
        <div className="flex gap-4 items-center w-full max-w-md">
          <button
            onClick={() =>
              handleRejectTestimonial(testimonialId, testimonial.admin_comment)
            }
            className={` w-full px-4 py-2 hover:bg-red-700 bg-red-600 text-white rounded-md font-semibold  transition duration-300 focus:outline-none`}
          >
            {testimonial.status === "pending"
              ? "Reject"
              : !isApproved
              ? "Update Comment"
              : "Reject"}
          </button>
          <button
            onClick={() =>
              handleApproveTestimonial(testimonialId, testimonial.admin_comment)
            }
            className=" w-full px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition duration-300 focus:outline-none"
          >
            {testimonial.status === "pending"
              ? "Approve"
              : isApproved
              ? "Update Comment"
              : "Approve"}
          </button>
        </div>
      </div>
      {/* Modal */}
      {(message || error) && (
        <SimpleModal
          text={`Attemp to update the status / admin comment was ${
            error ? "unsuccessful" : "successful"
          }`}
          title={message ? message : error}
          isError={Boolean(error)}
          closeModal={() =>
            handleCloseModalAndNavigate(
              navigate(`/submissions/${user?.id}/manage`)
            )
          }
        />
      )}
    </div>
  );
};

export default ShowTestimonial;
