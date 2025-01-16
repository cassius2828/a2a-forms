import { useGlobalContext } from "../../context/useGlobalContext";
import CharCount from "../CharCount";

const AIF2 = () => {
  const {
    spotlightFormData,
    handleInputChange,
    handleNextFormStep,
    handlePrevFormStep,
  } = useGlobalContext();

  return (
    <>
      {/* General Bio Input */}
      <div>
        <label
          htmlFor="generalBio"
          className="block text-sm font-medium text-white"
        >
          General Bio
        </label>
        <textarea
          id="generalBio"
          name="generalBio"
          maxLength={250}
          value={spotlightFormData.generalBio}
          onChange={handleInputChange}
          rows={3}
          className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-neutral-500 focus:outline focus:outline-2 focus:outline-gray-300 outline outline-gray-300/30 sm:text-sm"
          placeholder="Tell us about yourself."
        />
        <CharCount
          length={spotlightFormData.generalBio.length}
          maxCharCount={250}
        />
      </div>

      {/* Action Bio Input */}
      <div>
        <label
          htmlFor="actionBio"
          className="block text-sm font-medium text-white"
        >
          Action Bio
        </label>
        <textarea
          id="actionBio"
          name="actionBio"
          maxLength={250}
          value={spotlightFormData.actionBio}
          onChange={handleInputChange}
          rows={3}
          className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-neutral-500 focus:outline focus:outline-2 focus:outline-gray-300 outline outline-gray-300/30 sm:text-sm"
          placeholder="Describe your actions."
        />
        <CharCount
          length={spotlightFormData.actionBio.length}
          maxCharCount={250}
        />
      </div>

      {/* Community Impact Input */}
      <div>
        <label
          htmlFor="communityImpact"
          className="block text-sm font-medium text-white"
        >
          Community Impact
        </label>
        <textarea
          id="communityImpact"
          name="communityImpact"
          maxLength={250}
          value={spotlightFormData.communityImpact}
          onChange={handleInputChange}
          rows={3}
          className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-neutral-500 focus:outline focus:outline-2 focus:outline-gray-300 outline outline-gray-300/30 sm:text-sm"
          placeholder="Describe your community involvement."
        />
        <CharCount
          length={spotlightFormData.communityImpact.length}
          maxCharCount={250}
        />
      </div>
      {/* Prev + Next Button */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={handlePrevFormStep}
          className="w-full  bg-neutral-500 hover:bg-neutral-600 text-white font-medium py-2 px-4 rounded-md"
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
export default AIF2;
