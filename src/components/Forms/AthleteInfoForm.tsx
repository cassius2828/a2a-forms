import { useEffect, useState } from "react";
import AIF1 from "./AIF1";
import AIF2 from "./AIF2";
import AIF3 from "./AIF3";
import { useGlobalContext } from "../../context/useGlobalContext";
import FormModal from "../Modals/FormModal";
import { getSpotlightByUserId } from "../../services/formService";
import { useNavigate } from "react-router-dom";
import PromptLoginOrRegister from "../Auth/PromptLoginOrRegister";
import { AuroraContainer } from "../Aurora";
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
  } = useGlobalContext();
  const navigate = useNavigate();
  const [ownedByCurrentUser, setOwnedByCurrentUser] = useState<boolean>(false);
  useEffect(() => {
    const fetchUserSpotlightDetails = async () => {
      if (user) {
        try {
          const data = await getSpotlightByUserId(String(user.id));

          setSpotlightFormData({
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            sport: data.sport || "",
            graduationYear: data.grad_year || "",
            location: data.location || "",
            generalBio: data.general_bio || "",
            actionBio: data.action_bio || "",
            communityBio: data.community_bio || "",
          });

          setOwnedByCurrentUser(user?.id == data.created_by);
        } catch (err) {
          console.error(err);
          setSpotlightFormData((prevForm) => {
            return {
              ...prevForm,
              firstName: user.first_name,
              lastName: user.last_name,
            };
          });
        }
      }
    };
    fetchUserSpotlightDetails();
    setFormStep(1);
  }, [user]);

  if (!user) {
    return <PromptLoginOrRegister />;
  }
  return (
    <AuroraContainer>
      <form className="w-full md:w-4/5 xl:w-1/3  rounded-md mt-20 mx-auto px-5 py-1 bg-neutral-900 ">
        {(error || message) && (
          <FormModal
            isError={Boolean(error)}
            title={error ? " Error" : "Success!"}
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
            {ownedByCurrentUser && (
              <span className="text-sm text-neutral-400 italic">
                Updating the spotlight will cause the status to go back to
                "pending" and it will be removed from the website until approved
                by an admin.
              </span>
            )}
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
    </AuroraContainer>
  );
}
