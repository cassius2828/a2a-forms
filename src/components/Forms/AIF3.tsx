import { FC, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/useGlobalContext";
import {
  postAddSpotlight,
  putUpdateSpotlight,
} from "../../services/formService";
import {
  ImageUploadsProps,
  PhotoUpdateProps,
  PrevAndSubmitBtnProps,
  SpotlightFormData,
} from "../../lib/types";
import { DefaultLoader } from "../Loaders";

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
    setIsLoading,
  } = useGlobalContext();
  // TODO: Figure out better way than to have spotlight form in a union with the file | null union
  const [photos, setPhotos] = useState<File[]>([]);
  const [acceptUpdate, setAcceptUpdate] = useState<boolean>(false);
  const [photoDecisionMade, setPhotoDecisionMade] = useState<boolean>(false);

  const handleUpdatePhotos = (imageToAdd: File, idx: number) => {
    setPhotos((prev) => {
      const updatedPhotos = [...prev];
      updatedPhotos[idx] = imageToAdd;
      return updatedPhotos;
    });
  };
  useEffect(() => {
    // If profileImage exists, replace the 0th index
    if (spotlightFormData.profileImage)
      handleUpdatePhotos(spotlightFormData.profileImage, 0);

    // If actionImage1 exists, replace the 1st index
    if (spotlightFormData.actionImage1)
      handleUpdatePhotos(spotlightFormData.actionImage1, 1);

    // If actionImage2 exists, replace the 2nd index
    if (spotlightFormData.actionImage2)
      handleUpdatePhotos(spotlightFormData.actionImage2, 2);
  }, [
    spotlightFormData.profileImage,
    spotlightFormData.actionImage1,
    spotlightFormData.actionImage2,
  ]);

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const dataToSendToServer = createFormData(spotlightFormData, photos);
    try {
      if (user && ownedByCurrentUserProp) {
        const data = await putUpdateSpotlight(
          String(user.id),
          dataToSendToServer
        );

        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to submit form");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const dataToSendToServer = createFormData(spotlightFormData, photos);

    try {
      if (user) {
        const data = await postAddSpotlight(
          String(user.id),
          dataToSendToServer
        );

        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to submit form");
    } finally {
      setIsLoading(false);
    }
  };
  const handleAcceptUpdatePhotos = () => {
    setPhotoDecisionMade(true);
    setAcceptUpdate(true);
  };
  const handleDeclineUpdatePhotos = () => {
    setPhotoDecisionMade(true);
    setAcceptUpdate(false);
  };
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
                  handleUpdate={handleUpdate}
                  handleSubmit={handleSubmit}
                  photoDecisionMade={photoDecisionMade}
                  handleResetForm={handleResetForm}
                />
              </>
            ) : (
              <PrevAndSubmitBtn
                handlePrevFormStep={handlePrevFormStep}
                ownedByCurrentUser={ownedByCurrentUserProp}
                handleUpdate={handleUpdate}
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
            handleUpdate={handleUpdate}
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
            handleUpdate={handleUpdate}
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

export const PrevAndSubmitBtn: FC<PrevAndSubmitBtnProps> = ({
  handlePrevFormStep,
  ownedByCurrentUser,
  handleSubmit,
  handleUpdate,
  photoDecisionMade,
  handleResetForm,
}) => {
  const { isLoading } = useGlobalContext();
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
            onClick={handleUpdate}
            className={`w-full ${
              photoDecisionMade
                ? "bg-green-500 hover:bg-green-600"
                : "disabled bg-gray-500 hover:bg-gray-600 opacity-30 pointer-events-none"
            }  text-white font-medium py-2 px-4 rounded-md flex justify-center gap-4 items-center`}
          >
            Update
            {isLoading && <DefaultLoader className={"loader-sm"} />}
          </button>
        ) : (
          <div>
            <button
              onClick={handleSubmit}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md flex justify-center gap-4 items-center"
            >
              Submit
              {isLoading && <DefaultLoader className={"loader-sm"} />}
            </button>
          </div>
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

const createFormData = (
  spotlightFormData: SpotlightFormData,
  photos: File[]
) => {
  const dataToSendToServer = new FormData();
  dataToSendToServer.append("firstName", spotlightFormData.firstName);
  dataToSendToServer.append("lastName", spotlightFormData.lastName);
  dataToSendToServer.append("sport", spotlightFormData.sport);
  // to prevent type error of undefined possibility
  if (spotlightFormData.graduationYear) {
    dataToSendToServer.append(
      "graduationYear",
      spotlightFormData.graduationYear
    );
  }
  dataToSendToServer.append("location", spotlightFormData.location);
  dataToSendToServer.append("generalBio", spotlightFormData.generalBio);
  dataToSendToServer.append("actionBio", spotlightFormData.actionBio);
  dataToSendToServer.append("communityBio", spotlightFormData.communityBio);
  if (photos && photos.length > 0) {
    photos.forEach((photo) => {
      if (photo) {
        dataToSendToServer.append("photos", photo);
      }
    });
  }
  return dataToSendToServer;
};
