// React and Router imports
import { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { confirmEmailChange } from "../../../services/authService";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { isTokenExpired } from "../../../lib/utils";
import SessionExpiredModal from "../../Modals/SessionExpiredModal";
import NoAccessPage from "../../PlaceholderPages/NoAccessPage";

const ConfirmEmailChange = () => {
  // State to manage feedback messages (either success or error)
  const [feedback, setFeedback] = useState({ message: "", error: "" });
  const [password, setPassword] = useState<string>("");
  const { user, setError, setMessage } = useGlobalContext();
  // Extracting query parameters from the URL
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const token = queryParams.get("token");
  const userId = queryParams.get("userId");

  if (token && isTokenExpired(token, 10000)) {
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
  if (userId !== user?.id) {
    return (
      <div className="w-full flex flex-col items-center gap-5">
        <NoAccessPage />
        <p className="text-gray-100 mt-4 p-2 text-center leading-8 md:w-1/2">
          Please login to access the email change. Once logged in, click on the
          link from your email again and you should be able to access the
          confirm email change form. Thank you!
        </p>
        <Link
          className=" text-white underline mt-4 rounded-md hover:text-green-600 transition duration-200"
          to={`/auth/login`}
        >
          Login
        </Link>
      </div>
    );
  }
  ///////////////////////////
  // Confirm Email Change Action
  ///////////////////////////
  const handleConfirmEmail = async () => {
    try {
      if (userId && email && token && password) {
        console.log("click");
        const data = await confirmEmailChange(userId, email, token, password);
        // Update feedback state based on response
        if (data.message) {
          setFeedback({ message: data.message, error: "" });
        }
        if (data.passwordError) {
          setFeedback({ message: "", error: data.passwordError });
        }
        if (data.error) {
          setFeedback({ message: "", error: data.error });
        }
      }
    } catch (err) {
      console.error(err);
      console.log(`Could not use service file to confirm email change`);
      setError(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-32 min-h-72 p-4 rounded-md bg-neutral-800">
      {/* Display message if available */}
      {feedback.message && (
        <div className="relative flex justify-center text-center w-full md:w-[40rem] bg-neutral-700 mb-12 h-40 p-4 rounded-md">
          <Link to={`/profile/${userId}`}>
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
          <button onClick={() => setFeedback({ message: "", error: "" })}>
            <span className="absolute top-0 right-3 text-2xl text-gray-100">
              x
            </span>
            <span className="text-2xl text-red-500 w-full">
              {feedback.error}
            </span>
          </button>
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

          {/* Styled form */}
          <form className="mb-8">
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-200 text-sm font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </form>

          {/* Buttons */}
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
