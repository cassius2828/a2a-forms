import { Link } from "react-router-dom";

const PromptLoginOrRegister = () => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 mx-auto p-4 bg-neutral-900 rounded-lg shadow-md mt-20 text-center">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Create Athlete Spotlight
      </h2>

      <p className="text-sm text-gray-200 mb-6">
        To create an Athlete Spotlight, you need to either sign in or create an
        account. Your post will be subject to review before being published.
        <br />
        <br />
        If you create an account, you will be able to edit your spotlight in the
        future. Without an account, you will not be able to make any changes
        after submission!
        <br />
        <br />
        <span className="font-semibold text-white">
          Email is required for sign up, but your phone number is optional.
        </span>
      </p>

      <div className="flex justify-center gap-4">
        <Link
          to="/login"
          className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
        >
          Register
        </Link>
      </div>
    </div>
  );
};
export default PromptLoginOrRegister;
