import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/useGlobalContext";
import { postAddSpotlight } from "../../services/formService";
import {
  ImageUploadsProps,
  PhotoUpdateProps,
  SpotlightFormData,
} from "../../lib/types";

const AIF3 = ({
  ownedByCurrentUserProp,
}: {
  ownedByCurrentUserProp: boolean;
}) => {
  const {
    handleFileChange,
    handleResetForm,
    spotlightFormData,
    handlePrevFormStep,
    user,
    setError,
    setMessage,
    error,
  } = useGlobalContext();
  // TODO: Figure out better way than to have spotlight form in a union with the file | null union
  const [photos, setPhotos] = useState<(File | null | SpotlightFormData)[]>([
    null,
    null,
    null,
  ]);
  const [acceptUpdate, setAcceptUpdate] = useState<boolean>(false);
  const [photoDecisionMade, setPhotoDecisionMade] = useState<boolean>(false);

  const handleAcceptUpdate = () => {
    setAcceptUpdate(true); // User accepts to update photos
    // You can handle further logic here for the form submission if needed
  };
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
    dataToSendToServer.append("communityBio", spotlightFormData.communityBio);
    if (photos && photos.length > 0) {
      photos.forEach((photo) => {
        dataToSendToServer.append("photos", photo);
      });
    }

    for (const key of dataToSendToServer.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    try {
      if (user) {
        const data = await postAddSpotlight(user.id, dataToSendToServer);
        console.log(dataToSendToServer, " <-- DTSTS");
        // const data = "testing";
        if (data.error) {
          setError(data.error);
        } else {
          setMessage(data);
        }
      }
    } catch (err) {
      console.error(err);
      console.log(`Unable to submit form data to server `);
      setError(err.error);
    }
  };
  const handleAcceptUpdatePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setPhotoDecisionMade(true);
    setAcceptUpdate(true);
  };
  const handleDeclineUpdatePhotos = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setPhotoDecisionMade(true);
    setAcceptUpdate(false);
  };
  console.log(ownedByCurrentUserProp, " <-- ownded by current user");
  return (
    <>
      {ownedByCurrentUserProp ? (
        <>
          {/* is owned by user */}
          {photoDecisionMade ? (
            // photo decision IS made
            acceptUpdate ? (
              <>
                <ImageUploads handleFileChange={handleFileChange} />
                <PrevAndSubmitBtn
                  handlePrevFormStep={handlePrevFormStep}
                  ownedByCurrentUser={ownedByCurrentUserProp}
                  handleSubmit={handleSubmit}
                  photoDecisionMade={photoDecisionMade}
                  handleResetForm={handleResetForm}
                />
              </>
            ) : (
              <PrevAndSubmitBtn
                handlePrevFormStep={handlePrevFormStep}
                ownedByCurrentUser={ownedByCurrentUserProp}
                handleSubmit={handleSubmit}
                photoDecisionMade={photoDecisionMade}
                handleResetForm={handleResetForm}
              />
            )
          ) : (
            <>
              {/* photo decision NOT made */}
              {/* is not ownded by user */}
              <PhotoUpdateChoiceBox
                handleAccept={handleAcceptUpdatePhotos}
                handleDecline={handleDeclineUpdatePhotos}
              />
            </>
          )}
        </>
      ) : photoDecisionMade ? (
        <>
          {/* is not owned by User */}
          <ImageUploads handleFileChange={handleFileChange} />
          <PrevAndSubmitBtn
            handlePrevFormStep={handlePrevFormStep}
            ownedByCurrentUser={ownedByCurrentUserProp}
            handleSubmit={handleSubmit}
            photoDecisionMade={photoDecisionMade}
            handleResetForm={handleResetForm}
          />
        </>
      ) : (
        <>
          <ImageUploads handleFileChange={handleFileChange} />
          <PrevAndSubmitBtn
            handlePrevFormStep={handlePrevFormStep}
            ownedByCurrentUser={ownedByCurrentUserProp}
            handleSubmit={handleSubmit}
            photoDecisionMade={photoDecisionMade}
            handleResetForm={handleResetForm}
          />
        </>
      )}
    </>
  );
};
export default AIF3;

export const ImageUploads: React.FC<ImageUploadsProps> = ({
  handleFileChange,
}) => {
  const { setSpotlightFormData } = useGlobalContext();

  return (
    <>
      {" "}
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
          onChange={(e) => handleFileChange(e, setSpotlightFormData)}
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
          onChange={(e) => handleFileChange(e, setSpotlightFormData)}
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
          onChange={(e) => handleFileChange(e, setSpotlightFormData)}
          className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-neutral-500 focus:outline focus:outline-2 focus:outline-gray-300 outline outline-gray-300/30 sm:text-sm"
        />
      </div>
    </>
  );
};

export const PhotoUpdateChoiceBox: React.FC<PhotoUpdateProps> = ({
  handleAccept,
  handleDecline,
}) => {
  return (
    <div className="p-4 bg-neutral-700 text-white rounded-lg shadow-md">
      <p className="text-sm">
        Do you want to update your photos? Please note that to keep the other
        photos intact, you must re-upload all three images at the same time. For
        example: If you wish to update only the action image 1, please submit
        the same profile and action image 2 as before.
      </p>

      <div className="mt-4 flex justify-center gap-8">
        <button
          onClick={handleDecline}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 text-sm rounded-md"
        >
          No, keep my previous photos
        </button>
        <button
          onClick={handleAccept}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 text-sm rounded-md"
        >
          Yes, I want to update my photos
        </button>
      </div>
    </div>
  );
};

export const PrevAndSubmitBtn = ({
  handlePrevFormStep,
  ownedByCurrentUser,
  handleSubmit,
  photoDecisionMade,
  handleResetForm,
}) => {
  return (
    <>
      {/* Prev + Submit Button */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={handlePrevFormStep}
          className="w-full bg-neutral-500 hover:bg-neutral-600 text-white font-medium py-2 px-4 rounded-md"
        >
          Back
        </button>
        {ownedByCurrentUser ? (
          <button
            onClick={handleSubmit}
            className={`w-full ${
              photoDecisionMade
                ? "bg-green-500 hover:bg-green-600"
                : "disabled bg-gray-500 hover:bg-gray-600 opacity-30 pointer-events-none"
            }  text-white font-medium py-2 px-4 rounded-md`}
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Submit
          </button>
        )}
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
