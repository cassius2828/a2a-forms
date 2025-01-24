import { useNavigate } from "react-router-dom";

const NoAccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-72 flex flex-col items-center justify-center bg-neutral-800 rounded-md mt-32 p-4 text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg mb-8">
        You do not have permission to view this page.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-200"
      >
        Go Back
      </button>
    </div>
  );
};

export default NoAccessPage;
