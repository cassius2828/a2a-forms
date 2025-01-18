import { useState } from "react";
import { useGlobalContext } from "../../context/useGlobalContext";

export default function FormModal({
  title,
  text,
  error,
  setFormError,
  setFormMessage,
  formError,
  formMessage,
}: {
  title: string;
  text: string;
  error: boolean;
  setFormError: (error: string) => void;
  setFormMessage: (message: string) => void;
  formError: string;
  formMessage: string;
}) {
  const { handleResetForm } = useGlobalContext();
  const [open, setOpen] = useState(true);

  const closeModal = () => {
    if (formError) {
      setFormError("");
    }
    if (formMessage) {
      setFormMessage("");
      //   handleResetForm()
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-900/50 z-10 transition-opacity"></div>

      {/* Modal Panel */}
      <div className="fixed inset-0 z-20 flex items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className={`
              text-base font-semibold ${
                error ? "text-red-500" : "text-green-500"
              }
              `}
              >
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{text}</p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              onClick={closeModal}
              className={`inline-flex w-full justify-center rounded-md 
                ${error ? "bg-red-500" : "bg-green-500"}
              
              px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus:outline-none focus-visible:outline-2 focus-visible:outline-neutral-900-600`}
            >
              close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
