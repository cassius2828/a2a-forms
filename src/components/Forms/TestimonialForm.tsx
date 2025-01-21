import { useEffect, useState } from "react";
import CharCount from "../CharCount";
import {
  deleteTestimonial,
  getSingleTestimonial,
  postAddTestimonial,
  putUpdateTestimonial,
} from "../../services/formService";
import { useGlobalContext } from "../../context/useGlobalContext";
import FormModal from "../Modals/FormModal";
import { TestimonialFormData } from "../../lib/types";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "../Modals/ConfirmationModal";
import DefaultLoader from "../Loaders/Default";
const initialFormState: TestimonialFormData = {
  text: "",
  name: "",
};
const TestimonialForm = () => {
  // Local state to manage the testimonial and name
  const {
    handleInputChange,
    error,
    message,
    setError,
    setMessage,
    user,
    isLoading,
    setIsLoading,
  } = useGlobalContext();

  const [form, setForm] = useState<TestimonialFormData>(initialFormState);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();
  // Handle form submissions
  const handlePostTestimonial = async () => {
    try {
      const data = await postAddTestimonial(form, user?.id);
      if (data.error) {
        setError(data.error);
      } else {
        setMessage(data.message);
        setForm(initialFormState);
      }
    } catch (err) {
      console.error(err);
      setError(err.error);
    }
  };
  const handleUpdateTestimonial = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await putUpdateTestimonial(form, id);
      if (data.error) {
        setError(data.error);
      } else {
        setForm(initialFormState);
        navigate("/submissions");
      }
    } catch (err) {
      console.error(err);
      setError(err.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      handleUpdateTestimonial(id);
    } else {
      handlePostTestimonial();
    }
  };
  const handleResetForm = () => {
    setForm(initialFormState);
  };
  const fetchSingleTestimonial = async (id: string) => {
    try {
      const data = await getSingleTestimonial(id);
      if (data.error) {
        setError(data.error);
      } else {
        setForm(data);
        console.log("Retrieved form data \n", data);
      }
    } catch (err) {
      console.error(err);
      setError(err.error);
    }
  };

  useEffect(() => {
    // fetch targeted testimonial data if an id is in the url
    if (id) {
      fetchSingleTestimonial(id);
    } else {
      handleResetForm();
    }
  }, [id]);
  if (isLoading) return <DefaultLoader />;
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-1/3 mx-auto p-4 bg-neutral-900 rounded-lg shadow-md mt-20 relative"
    >
      {(error || message) && (
        <FormModal
          isError={Boolean(error)}
          title={error ? " Error: Could not submit form" : "Success!"}
          text={error ? error : message || "cannot send result text"}
          setError={setError}
          setMessage={setMessage}
          error={error}
          message={message}
        />
      )}
      {id && showConfirmationModal && (
        <ConfirmationModal
          item="testimonial"
          info=""
          id={id}
          closeModal={() => setShowConfirmationModal(false)}
          serviceDelete={deleteTestimonial}
        />
      )}
      <h2 className="text-xl font-semibold text-white mb-4">
        {id ? "Update Testimonial" : "Submit New Testimonial"}
      </h2>

      <div className="mb-4">
        <label htmlFor="text" className="block text-sm font-medium text-white">
          Your Testimonial
        </label>
        <textarea
          id="text"
          name="text"
          value={form.text}
          maxLength={300}
          onChange={(e) => handleInputChange(e, setForm)}
          rows={4}
          className="mt-2 block w-full rounded-md bg-white/5 text-white px-3 py-2 border border-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Share your A2A experience..."
          required
        />
        <CharCount length={form.text.length} maxCharCount={300} />
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={(e) => handleInputChange(e, setForm)}
          className="mt-2 block w-full rounded-md bg-white/5 text-white px-3 py-2 border border-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your name"
          required
        />
      </div>
      <div className="flex gap-4">
        {id ? (
          <>
            <button
              type="button"
              onClick={() => setShowConfirmationModal(true)}
              className="w-full py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition duration-300 focus:outline-none"
            >
              Delete Testimonial
            </button>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition duration-300 focus:outline-none"
            >
              Re-submit Testimonial
            </button>
          </>
        ) : (
          <>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition duration-300 focus:outline-none"
            >
              Submit Testimonial
            </button>
          </>
        )}
      </div>
      <button
        onClick={handleResetForm}
        className="text-white absolute -bottom-10 left-1/2 -translate-x-1/2"
      >
        reset form
      </button>
    </form>
  );
};

export default TestimonialForm;
