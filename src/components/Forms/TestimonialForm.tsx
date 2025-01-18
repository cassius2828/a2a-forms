import { useState } from "react";
import CharCount from "../CharCount";
import { postAddTestimonial } from "../../services/formService";
import { useGlobalContext } from "../../context/useGlobalContext";
import FormModal from "../Modals/FormModal";
import { TestimonialFormData } from "../../lib/types";
const initialFormState: TestimonialFormData = {
  text: "",
  name: "",
};
const TestimonialForm = () => {
  // Local state to manage the testimonial and name
  const {
    handleInputChange,
    formError,
    formMessage,
    setFormError,
    setFormMessage,
    user,
  } = useGlobalContext();

  const [form, setForm] = useState<TestimonialFormData>(initialFormState);
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
  const handleResetForm = () => {
    setForm(initialFormState);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-1/3 mx-auto p-4 bg-neutral-900 rounded-lg shadow-md mt-20 relative"
    >
      {(error || message) && (
        <FormModal
          error={Boolean(error)}
          title={error ? " Error: Could not submit form" : "Success!"}
          text={error ? error : message || "cannot send result text"}
          setFormError={setFormError}
          setFormMessage={setFormMessage}
          formError={formError}
          formMessage={formMessage}
        />
      )}
      <h2 className="text-xl font-semibold text-white mb-4">
        Submit Your Testimonial
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

      <button
        type="submit"
        className="w-full py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition duration-300 focus:outline-none"
      >
        Submit Testimonial
      </button>
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
