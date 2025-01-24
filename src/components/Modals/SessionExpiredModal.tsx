const SessionExpiredModal = ({
  timeLimit,
  onClose,
}: {
  timeLimit: number;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950 bg-opacity-75">
      <div className="bg-neutral-800 rounded-lg shadow-lg p-6 w-11/12 max-w-md text-center">
        <h2 className="text-gray-200 text-xl font-bold mb-4">
          Session Expired
        </h2>
        <p className="text-gray-200 text-sm mb-6 w-full max-w-96">
          Your session has expired after{" "}
          <span className="text-green-500">{timeLimit}</span> minutes from when the request was made. Please
          try resubmitting your request within the allotted timeframe. Thank you
          for your understanding!
        </p>
        <button
          onClick={onClose}
          className="bg-green-500 text-gray-200 px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
