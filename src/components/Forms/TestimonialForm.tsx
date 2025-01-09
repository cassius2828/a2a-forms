import { useState } from "react";
import CharCount from "../CharCount";

const TestimonialForm = () => {
  // Local state to manage the testimonial and name
  const [testimonial, setTestimonial] = useState("");
  const [name, setName] = useState("");

  // Handle change for testimonial textarea
  const handleTestimonialChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTestimonial(e.target.value);
  };

  // Handle change for name input field
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for handling form submission (e.g., save the data or send to the server)
    console.log("Testimonial:", testimonial);
    console.log("Name:", name);
    // Reset form after submission (optional)
    setTestimonial("");
    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-1/3 mx-auto p-4 bg-neutral-900 rounded-lg shadow-md mt-20"
    >
      <h2 className="text-xl font-semibold text-white mb-4">
        Submit Your Testimonial
      </h2>

      <div className="mb-4">
        <label
          htmlFor="testimonial"
          className="block text-sm font-medium text-white"
        >
          Your Testimonial
        </label>
        <textarea
          id="testimonial"
          name="testimonial"
          value={testimonial}
          maxLength={300}
          onChange={handleTestimonialChange}
          rows={4}
          className="mt-2 block w-full rounded-md bg-white/5 text-white px-3 py-2 border border-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Share your experience..."
        />
        <CharCount length={testimonial.length} maxCharCount={300} />
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          className="mt-2 block w-full rounded-md bg-white/5 text-white px-3 py-2 border border-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your name"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition duration-300 focus:outline-none"
      >
        Submit Testimonial
      </button>
    </form>
  );
};

export default TestimonialForm;
