import { useEffect, useState } from "react";
import { SpotlightFormDataFromServer } from "../../../lib/types";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { DefaultLoader } from "../../Loaders";
import { useNavigate, useParams } from "react-router-dom";
import { getSpotlightBySpotlightId } from "../../../services/formService";
import SimpleModal from "../../Modals/SimpleModal";
import MissingItems from "../../PlaceholderPages/MissingItems";
const initialSpotlight: SpotlightFormDataFromServer = {
  first_name: "",
  last_name: "",
  sport: "",
  location: "",
  grad_year: "",
  general_bio: "",
  action_bio: "",
  community_bio: "",
  profile_image: null,
  action_image_1: null,
  action_image_2: null,
  status: "pending",
  admin_comment: "",
};

const ShowSpotlight = () => {
  const [spotlight, setSpotlight] =
    useState<SpotlightFormDataFromServer>(initialSpotlight);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const {
    user,
    setError,
    setIsLoading,
    isLoading,
    handleRejectSpotlight,
    handleApproveSpotlight,
    message,
    error,
    handleCloseModalAndNavigate,
  } = useGlobalContext();
  const { spotlightId } = useParams();
  const navigate = useNavigate();

  const fetchSpotlightById = async (id: string) => {
    setIsLoading(true);
    try {
      if (id) {
        const data = await getSpotlightBySpotlightId(id);
        if (data.error) {
          setError(data.error);
        } else {
          setSpotlight(data);
          setIsApproved(Boolean(data.status === "approved"));
        }
      }
    } catch (err) {
      console.error(err);
      setError("Unable to get spotlight");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (spotlightId) fetchSpotlightById(spotlightId);
  }, [spotlightId]);

  if (isLoading)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <DefaultLoader />
      </div>
    );
  if (!spotlightId) return <MissingItems item="Spotlight ID" />;
  if (String(user?.id) !== String(import.meta.env.VITE_ADMIN_ID))
    return (
      <h1 className="mt-80 text-center w-full text-4xl">Not Authorized</h1>
    );
  return (
    <div className="w-full md:w-3/4 lg:w-1/2 mx-auto mt-24 bg-neutral-900 shadow-lg rounded-lg p-8 border text-gray-100">
      <h2 className="text-2xl font-semibold text-gray-200 text-center mb-6">
        Review Athlete Profile
      </h2>

      {/* Basic Information */}
      <div className="grid grid-cols-2 gap-6 text-gray-300">
        <div className="flex flex-col">
          <span className="font-bold text-gray-200">First Name:</span>
          <span className="text-lg">{spotlight.first_name || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-gray-200">Last Name:</span>
          <span className="text-lg">{spotlight.last_name || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-gray-200">Sport:</span>
          <span className="text-lg">{spotlight.sport || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-gray-200">Graduation Year:</span>
          <span className="text-lg">{spotlight.grad_year || "N/A"}</span>
        </div>
        <div className="flex flex-col col-span-2">
          <span className="font-bold text-gray-200">Location:</span>
          <span className="text-lg">{spotlight.location || "N/A"}</span>
        </div>
      </div>

      <hr className="my-5" />

      {/* Bios Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-200 mb-4">Bios</h3>
        <div className="space-y-4">
          <div>
            <span className="font-bold block text-gray-200">General Bio:</span>
            <p className="text-gray-300">{spotlight.general_bio || "N/A"}</p>
          </div>
          <div>
            <span className="font-bold block text-gray-200">Action Bio:</span>
            <p className="text-gray-300">{spotlight.action_bio || "N/A"}</p>
          </div>
          <div>
            <span className="font-bold block text-gray-200">
              Community Bio:
            </span>
            <p className="text-gray-300">{spotlight.community_bio || "N/A"}</p>
          </div>
        </div>
      </div>

      <hr className="my-5" />
      {/* Image Section */}
      <div className="mt-4 flex flex-col md:flex-row justify-around gap-4 text-gray-100 w-full">
        <div className="flex flex-col items-center">
          <span className="font-bold text-gray-200 mb-2">Profile</span>
          <img
            src={
              spotlight.profile_image || import.meta.env.VITE_NO_IMG_AVAILABLE
            }
            alt="Profile"
            className="md:w-40 md:h-40 object-cover rounded-md shadow"
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-gray-200 mb-2">Action 1</span>
          <img
            src={
              spotlight.action_image_1 || import.meta.env.VITE_NO_IMG_AVAILABLE
            }
            alt="Action 1"
            className="md:w-40 md:h-40 object-cover rounded-md shadow"
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-gray-200 mb-2">Action 2</span>
          <img
            src={
              spotlight.action_image_2 || import.meta.env.VITE_NO_IMG_AVAILABLE
            }
            alt="Action 2"
            className="md:w-40 md:h-40 object-cover rounded-md shadow"
          />
        </div>
      </div>

      {/* admin comment */}
      <div className="mt-6">
        <label
          htmlFor="admin_comment"
          className="font-bold text-gray-200 block mb-2"
        >
          Admin Comment:
        </label>
        <textarea
          id="admin_comment"
          name="admin_comment"
          value={spotlight.admin_comment || ""}
          onChange={(e) =>
            setSpotlight({ ...spotlight, admin_comment: e.target.value })
          }
          className="w-full h-28 p-3 bg-neutral-800 text-gray-100 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
          placeholder="Add any comments or feedback here..."
        />
      </div>
      <div className="mt-2">
        <p>
          Current Status:{" "}
          <span
            className={`${
              spotlight.status === "pending"
                ? "text-yellow-500"
                : isApproved
                ? "text-green-500"
                : "text-red-500"
            } capitalize`}
          >
            {spotlight.status}
          </span>
        </p>
      </div>
      {/* Approve/Reject Buttons */}
      <div className="mt-8 flex flex-col-reverse md:flex-row justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-700 text-white rounded-md font-semibold hover:bg-gray-600 transition duration-300 focus:outline-none"
        >
          Back
        </button>
        <div className="flex gap-4 items-center w-full max-w-sm">
          <button
            onClick={() =>
              handleRejectSpotlight(spotlightId, spotlight.admin_comment)
            }
            className={`w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold  transition duration-300 focus:outline-none`}
          >
            {spotlight.status === "pending"
              ? "Reject"
              : !isApproved
              ? "Update Comment"
              : "Reject"}
          </button>
          <button
            onClick={() =>
              handleApproveSpotlight(spotlightId, spotlight.admin_comment)
            }
            className={`w-full px-5 py-2 bg-green-600 hover:bg-green-700  text-white rounded-lg transition`}
          >
            {spotlight.status === "pending"
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
          text={`Attempt to update the status / admin comment was ${
            error ? "unsuccessful" : "successful"
          }`}
          title={message ? message : error}
          isError={Boolean(error)}
          closeModal={() =>
            handleCloseModalAndNavigate(() =>
              navigate(`/submissions/${user?.id}/manage`)
            )
          }
        />
      )}
    </div>
  );
};

export default ShowSpotlight;
