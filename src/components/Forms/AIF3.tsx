import { useGlobalContext } from "../../context/useGlobalContext";

const AIF3 = () => {
  const {
    handleFileChange,
    handleResetForm,
    spotlightFormData,
    handlePrevFormStep,
  } = useGlobalContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(spotlightFormData);
  };
  return (
    <>
      {/* Profile Image Upload */}
      <div>
        <label
          htmlFor="profileImage"
          className="block text-sm font-medium text-white"
        >
          Profile Image
        </label>
        <input
          id="profileImage"
          name="profileImage"
          type="file"
          onChange={handleFileChange}
          className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-neutral-500 focus:outline focus:outline-2 focus:outline-gray-300 outline outline-gray-300/30 sm:text-sm"
        />
      </div>

      {/* Action Image 1 */}
      <div>
        <label
          htmlFor="actionImage1"
          className="block text-sm font-medium text-white"
        >
          Action Image 1
        </label>
        <input
          id="actionImage1"
          name="actionImage1"
          type="file"
          onChange={handleFileChange}
          className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-neutral-500 focus:outline focus:outline-2 focus:outline-gray-300 outline outline-gray-300/30 sm:text-sm"
        />
      </div>

      {/* Action Image 2 */}
      <div>
        <label
          htmlFor="actionImage2"
          className="block text-sm font-medium text-white"
        >
          Action Image 2
        </label>
        <input
          id="actionImage2"
          name="actionImage2"
          type="file"
          onChange={handleFileChange}
          className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-neutral-500 focus:outline focus:outline-2 focus:outline-gray-300 outline outline-gray-300/30 sm:text-sm"
        />
      </div>
      {/* Prev + Submit Button */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={handlePrevFormStep}
          className="w-full bg-neutral-500 hover:bg-neutral-600 text-white font-medium py-2 px-4 rounded-md"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </div>
      <span
        onClick={handleResetForm}
        className="w-full flex justify-center text-white hover:text-gray-400 duration-200 transition-colors cursor-pointer"
      >
        Reset form
      </span>
    </>
  );
};
export default AIF3;
