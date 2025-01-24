import { useEffect, useState } from "react";
import { BackendDeleteResponseType } from "../../lib/types";
import { useNavigate } from "react-router-dom";
import {
  deleteUserById,
  getUser,
  validateUserPassword,
} from "../../services/authService";
import { useGlobalContext } from "../../context/useGlobalContext";

const ConfirmationModalWithPasswordInput = ({
  id,
  title,
  info,
  greenAction,
  redAction,
  redActionText,
  greenActionText,
}: {
  id: string | null;
  title: string;
  info: string;
  greenAction: () => void;
  redAction?: (id: string | null) => Promise<BackendDeleteResponseType> | void;
  greenActionText: string;
  redActionText: string;
}) => {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleKeep = () => {
    setError("");
    setMessage("");
    greenAction();
  };
  const { setUser } = useGlobalContext();
  const handleDelete = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    console.log("click");
    e.preventDefault();
    try {
      if (id && password) {
        const data = await validateUserPassword(id, password);
        if (data.error) {
          setError(data.error);
        }
        if (data.message) {
          const deleteFnData = await deleteUserById(id);
          if (deleteFnData.error) {
            setError(deleteFnData.error);
          }
          if (deleteFnData.message) {
            setMessage(deleteFnData.message);
            setUser(null);
            navigate("/");
          }
        }
      }
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };
  useEffect(() => {
    console.log(id, password);
  }, [id, password]);
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-900/50 z-10 transition-opacity"></div>

      {/* Modal Panel */}
      <div className="fixed inset-0 z-20 flex items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
          {message || error ? (
            <>
              {message && (
                <div>
                  <p className="text-xl text-green-600 text-center mb-2">
                    {message}
                  </p>
                  <button
                    onClick={() => navigate("/testimonial-form")}
                    className={`inline-flex w-full justify-center rounded-md 
                      bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm 
                      hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2`}
                  >
                    close
                  </button>
                </div>
              )}
              {error && (
                <div>
                  <p className="text-xl text-red-600 text-center mb-3">
                    {error}
                  </p>
                  <button
                    onClick={() => setError("")}
                    className={`inline-flex w-full justify-center rounded-md 
                      bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm 
                      hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2`}
                  >
                    close
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-base font-semibold text-gray-900">
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{info}</p>
                </div>
              </div>
              {/* password form */}
              <form onSubmit={handleDelete} className=" z-20 w-full">
                <div className="flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-gray-600 text-sm font-medium my-2"
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
                      required
                    />
                  </div>
                </div>
                {/* Option Buttons */}
                <div className="mt-5 sm:mt-6 flex gap-6">
                  <button
                    type="submit"
                    className={`inline-flex w-full justify-center rounded-md 
                    bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm 
                    hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2`}
                  >
                    {redActionText}
                  </button>
                  <button
                    type="button"
                    onClick={handleKeep}
                    className={`inline-flex w-full justify-center rounded-md 
                    bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm 
                    hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2`}
                  >
                    {greenActionText}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmationModalWithPasswordInput;

/*


*/
