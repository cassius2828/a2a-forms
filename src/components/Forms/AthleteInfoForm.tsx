import { useEffect, useState } from "react";
import AIF1 from "./AIF1";
import AIF2 from "./AIF2";
import AIF3 from "./AIF3";
import { useGlobalContext } from "../../context/useGlobalContext";
import FormModal from "../Modals/FormModal";
import { getSpotlightByUserId } from "../../services/formService";
import { useNavigate } from "react-router-dom";
export default function AthleteInfoForm() {
  // Single state for the entire form
  const {
    setSpotlightFormData,
    formStep,
    setFormStep,
    error,
    message,
    setError,
    setMessage,
    user,
    spotlightFormData,
  } = useGlobalContext();
  const navigate = useNavigate();
  const [ownedByCurrentUser, setOwnedByCurrentUser] = useState<boolean>(false);
  useEffect(() => {
    const fetchUserSpotlightDetails = async () => {
      if (user) {
        try {
          const data = await getSpotlightByUserId(user.id);
          if (data.error) {
            setSpotlightFormData((prevForm) => {
              return {
                ...prevForm,
                firstName: user.first_name,
                lastName: user.last_name,
              };
            });
          } else {
            setSpotlightFormData({
              firstName: data.first_name || "",
              lastName: data.last_name || "",
              sport: data.sport || "",
              graduationYear: data.grad_year || "",
              location: data.location || "",
              generalBio: data.general_bio || "",
              actionBio: data.action_bio || "",
              communityBio: data.community_bio || "",
              profileImage: null,
              actionImage1: null,
              actionImage2: null,
            });

            setOwnedByCurrentUser(user?.id == data.created_by);
            console.log(user?.id, " <-- user.id");
          }
          console.log(spotlightFormData);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchUserSpotlightDetails();
    setFormStep(1);
  }, [user]);
  return (
    <form className="w-full md:w-4/5 xl:w-1/3  rounded-md mt-20 px-5 bg-neutral-900 ">
      {(error || message) && (
        <FormModal
          isError={Boolean(error)}
          title={error ? " Error: Could not submit form" : "Success!"}
          text={error ? error : message}
          setError={setError}
          setMessage={setMessage}
          error={error}
          message={message}
          willNavigate
          navigateFn={() => navigate(`/submissions/${user?.id}`)}
        />
      )}

      <div className="pb-12 w-full ">
        <div className="mt-10 flex flex-col w-full  mx-auto gap-8">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Athlete Spotlight Profile
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              This information may be displayed publicly on{" "}
              <a className="hover:text-green-600" href="a2aathletics.com">
                a2aathletics.com
              </a>
            </p>
          </div>

          {/* 1: basic info */}
          {/* 2: sport bios */}
          {/* 3: images */}
          {formStep === 1 ? (
            <AIF1 />
          ) : formStep === 2 ? (
            <AIF2 />
          ) : (
            <AIF3 ownedByCurrentUserProp={ownedByCurrentUser} />
          )}
        </div>
      </div>
    </form>
  );
}
