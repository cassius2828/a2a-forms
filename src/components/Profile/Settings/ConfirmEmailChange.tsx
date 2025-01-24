// React and Router imports
import { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { confirmEmailChange } from "../../../services/authService";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { isTokenExpired } from "../../../lib/utils";
import SessionExpiredModal from "../../Modals/SessionExpiredModal";

const ConfirmEmailChange = () => {
  // State to manage feedback messages (either success or error)
  const [feedback, setFeedback] = useState({ message: "", error: "" });
  const { user } = useGlobalContext();
  // Extracting query parameters from the URL
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const token = queryParams.get("token");
  const userId = queryParams.get("userId");

  if (token && isTokenExpired(token, 10)) {
    let navigatePath: string = "/";
    if (user) {
      navigatePath = `/profile/${user.id}/settings`;
    }
    return (
      <SessionExpiredModal
        timeLimit={10}
        onClose={() => navigate(navigatePath)}
      />
    );
  }
  ///////////////////////////
  // Confirm Email Change Action
  ///////////////////////////
  const handleConfirmEmail = async () => {
    try {
      if (userId && email && token) {
        console.log("click");
        const data = await confirmEmailChange(userId, email, token);
        // Update feedback state based on response
        if (data.message) {
          setFeedback({ message: data.message, error: "" });
        }
        if (data.error) {
          setFeedback({ message: "", error: data.error });
        }
      }
    } catch (err) {
      console.error(err);
      console.log(`Could not use service file to confirm email change`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-32 min-h-72 p-4 rounded-md bg-neutral-800">
      {/* Display message if available */}
      {feedback.message && (
        <div className="relative flex justify-center text-center w-full md:w-[40rem] bg-neutral-700 mb-12 h-40 p-4 rounded-md">
          <Link to={`/profiles/${userId}`}>
            <span className="absolute top-0 right-3 text-2xl text-gray-100">
              x
            </span>
            <span className="text-2xl text-green-500 w-full">
              {feedback.message}
            </span>
          </Link>
        </div>
      )}
      {/* Display error if available */}
      {feedback.error && (
        <div className="relative flex justify-center text-center w-full md:w-[40rem] bg-neutral-700 mb-12 h-40 p-4 rounded-md">
          <Link to={`/profile/${userId}`}>
            <span className="absolute top-0 right-3 text-2xl text-gray-100">
              x
            </span>
            <span className="text-2xl text-red-500 w-full">
              {feedback.error}
            </span>
          </Link>
        </div>
      )}

      {!(feedback.message || feedback.error) && (
        <>
          {/* Header and action buttons */}
          <h1 className="text-3xl font-bold text-gray-200 mb-6">
            Confirm Email Change
          </h1>
          <div className="flex flex-col text-gray-100 gap-2 mb-8">
            <span>From: {user?.email}</span>
            <span>To: {email}</span>
          </div>
          <div className="flex space-x-4">
            <Link to={`/profile/${userId}`}>
              {/* Button to cancel email change */}
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                type="button"
              >
                Cancel Email Change
              </button>
            </Link>
            {/* Button to confirm email change */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              type="button"
              onClick={handleConfirmEmail}
            >
              Confirm Email Change
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ConfirmEmailChange;
