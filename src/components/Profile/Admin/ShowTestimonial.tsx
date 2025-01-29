import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleTestimonial,
  putChangeTestimonialStatus,
} from "../../../services/formService";
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
};
const ShowTestimonial = () => {
  const [testimonial, setTestimonial] = useState<TestimonialDataManageView>(
    initialTestmonialData
  );

  const {
    error,
    setError,
    message,
    setMessage,
    isLoading,
    setIsLoading,
    scrollToTop,
    user,
  } = useGlobalContext();
  const navigate = useNavigate();

  const { testimonialId } = useParams();

  const fetchTestimonialById = async () => {
    setIsLoading(true);
    try {
      if (testimonialId) {
        const data = await getSingleTestimonial(testimonialId);
        if (data.error) {
          setError(data.error);
        } else {
          setTestimonial(data);
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRejectTestimonial = async () => {
    setIsLoading(true);
    if (testimonialId) {
      try {
        const data = await putChangeTestimonialStatus(
          testimonialId,
          "rejected"
        );
        if (data.error) {
          setError(data.error);
        } else {
          setMessage(data.message);
        }
      } catch (err) {
        console.error(err);
        setError(
          err.response.data.error ||
            "Unable to change testimonial status to rejected"
        );
      } finally {
        setIsLoading(false);
      }
    }
    ƒ;
  };
  const handleApproveTestimonial = async () => {
    setIsLoading(true);
    if (testimonialId) {
      try {
        const data = await putChangeTestimonialStatus(
          testimonialId,
          "approved"
        );
        if (data.error) {
          setError(data.error);
        } else {
          setMessage(data.message);
        }
      } catch (err) {
        console.error(err);
        setError(
          err.response.data.error ||
            "Unable to change testimonial status to approved"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleCloseModalAndNavigate = async () => {
    if (message) setMessage("");
    if (error) setError("");
    navigate(`/submissions/${user?.id}/manage`);
  };
  useEffect(() => {
    fetchTestimonialById();
    scrollToTop(false);
  }, [testimonialId]);

  if (isLoading) return <DefaultLoader />;
  if (user?.id !== import.meta.env.VITE_ADMIN_ID)
    return <h1>Not Authorized</h1>;
  return (
    <div className="flex flex-col justify-start w-full md:w-2/3 lg:w-1/2 mx-auto p-2 bg-neutral-900 rounded-lg shadow-md mt-20 relative">
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
            {/* status */}
            <span>
              <strong className="text-white">Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded-md font-semibold ${
                  testimonial.status === "pending"
                    ? "bg-yellow-500 text-black"
                    : testimonial.status === "approved"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {testimonial.status}
              </span>
            </span>
            {/* date */}
            <span>
              <strong className="text-white">Date:</strong>{" "}
              {new Date(testimonial.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between p-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-700 text-white rounded-md font-semibold hover:bg-gray-600 transition duration-300 focus:outline-none"
        >
          Back
        </button>
        <div className="flex gap-4">
          <button
            onClick={handleRejectTestimonial}
            className="px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition duration-300 focus:outline-none"
          >
            Reject
          </button>
          <button
            onClick={handleApproveTestimonial}
            className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition duration-300 focus:outline-none"
          >
            Approve
          </button>
        </div>
      </div>
      {/* Modal */}
      {(message || error) && (
        <SimpleModal
          text={`Attemp to update the status was ${
            error ? "unsuccessful" : "successful"
          }`}
          title={message ? message : error}
          isError={Boolean(error)}
          closeModal={handleCloseModalAndNavigate}
        />
      )}
    </div>
  );
};

export default ShowTestimonial;
