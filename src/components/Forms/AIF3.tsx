import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/useGlobalContext";
import { postAddSpotlight } from "../../services/formService";

const AIF3 = () => {
  const {
    handleFileChange,
    handleResetForm,
    spotlightFormData,
    handlePrevFormStep,
    user,
    setFormError,
    setFormMessage,
    formError,
  } = useGlobalContext();
  const [photos, setPhotos] = useState<(File | null)[]>([null, null, null]);
  useEffect(() => {
    // If profileImage exists, replace the 0th index
    if (spotlightFormData.profileImage) {
      setPhotos((prev) => {
        const updatedPhotos = [...prev];
        updatedPhotos[0] = spotlightFormData.profileImage || null;
        return updatedPhotos;
      });
    }

    // If actionImage1 exists, replace the 1st index
    if (spotlightFormData.actionImage1) {
      setPhotos((prev) => {
        const updatedPhotos = [...prev];
        updatedPhotos[1] = spotlightFormData.actionImage1 || null;
        return updatedPhotos;
      });
    }

    // If actionImage2 exists, replace the 2nd index
    if (spotlightFormData.actionImage2) {
      setPhotos((prev) => {
        const updatedPhotos = [...prev];
        updatedPhotos[2] = spotlightFormData.actionImage2 || null;
        return updatedPhotos;
      });
    }
    console.log(photos, " <-- photos state");
    console.log(spotlightFormData, " <-- form state");
  }, [
    spotlightFormData.profileImage,
    spotlightFormData.actionImage1,
    spotlightFormData.actionImage2,
  ]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSendToServer = new FormData();
    dataToSendToServer.append("firstName", spotlightFormData.firstName);
    dataToSendToServer.append("lastName", spotlightFormData.lastName);
    dataToSendToServer.append("sport", spotlightFormData.sport);
    dataToSendToServer.append(
      "graduationYear",
      spotlightFormData.graduationYear
    );
    dataToSendToServer.append("location", spotlightFormData.location);
    dataToSendToServer.append("generalBio", spotlightFormData.generalBio);
    dataToSendToServer.append("actionBio", spotlightFormData.actionBio);
    dataToSendToServer.append(
      "communityImpact",
      spotlightFormData.communityImpact
    );
    if (photos && photos.length > 0) {
      dataToSendToServer.append("photos", photos);
    }

    for (const key of dataToSendToServer.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    try {
      if (user) {
        const data = await postAddSpotlight(user.id, dataToSendToServer);
        if (data.error) {
          setFormError(data.error);
        } else {
          setFormMessage(data);
        }
      }
    } catch (err) {
      console.error(err);
      console.log(`Unable to submit form data to server `);
      setFormError(err.error);
      console.log(formError);
    }
    console.log(spotlightFormData);
    console.log(dataToSendToServer, " DTSTS");
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
