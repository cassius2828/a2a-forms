import { useGlobalContext } from "../../context/GlobalContext";

const AIF1 = () => {
  const {
    spotlightFormData,
    setSpotlightFormData,
    handleInputChange,
    handleNextFormStep,
    handlePrevFormStep,
  } = useGlobalContext();

  return (
    <>
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={spotlightFormData.name}
          onChange={(e) => handleInputChange(e, setSpotlightFormData)}
          placeholder="Jane Smith"
          className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-neutral-500 focus:outline focus:outline-2 focus:outline-gray-300 outline outline-gray-300/30 sm:text-sm"
        />
      </div>

      {/* Sport Input */}
      <div>
        <label htmlFor="sport" className="block text-sm font-medium text-white">
          Sport
        </label>
        <input
          id="sport"
          name="sport"
          type="text"
          value={spotlightFormData.sport}
          onChange={(e) => handleInputChange(e, setSpotlightFormData)}
          placeholder="Basketball"
          className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-neutral-500 focus:outline focus:outline-2 focus:outline-gray-300 outline outline-gray-300/30 sm:text-sm"
        />
      </div>

      {/* Graduation Year Input */}
      <div>
        <label
          htmlFor="graduationYear"
          className="block text-sm font-medium text-white"
        >
          Graduation Year
        </label>
        <input
          id="graduationYear"
          name="graduationYear"
          type="text"
          value={spotlightFormData.graduationYear}
          onChange={(e) => handleInputChange(e, setSpotlightFormData)}
          placeholder="2024"
          className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-neutral-500 focus:outline focus:outline-2 focus:outline-gray-300 outline outline-gray-300/30 sm:text-sm"
        />
      </div>

      {/* Location Input */}
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-white"
        >
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={spotlightFormData.location}
          onChange={(e) => handleInputChange(e, setSpotlightFormData)}
          placeholder="New York, NY"
          className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-neutral-500 focus:outline focus:outline-2 focus:outline-gray-300 outline outline-gray-300/30 sm:text-sm"
        />
      </div>
      {/* Prev + Next Button */}
      <div className="flex justify-center items-center gap-4">
        <button
          disabled
          onClick={handlePrevFormStep}
          className="w-full cursor-not-allowed opacity-30 bg-neutral-500 text-white font-medium py-2 px-4 rounded-md"
        >
          Back
        </button>
        <button
          onClick={handleNextFormStep}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
        >
          Next
        </button>
      </div>
    </>
  );
};
export default AIF1;
