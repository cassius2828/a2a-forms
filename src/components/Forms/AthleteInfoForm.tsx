import { useEffect } from "react";
import AIF1 from "./AIF1";
import AIF2 from "./AIF2";
import AIF3 from "./AIF3";
import { useGlobalContext } from "../../context/useGlobalContext";
import FormModal from "../Modals/FormModal";
export default function AthleteInfoForm() {
  // Single state for the entire form
  const { setSpotlightFormData, formStep, formError, formMessage, user } =
    useGlobalContext();
  useEffect(() => {
    if (user) {
      setSpotlightFormData((prevForm) => {
        return {
          ...prevForm,
          firstName: user.first_name,
          lastName: user.last_name,
        };
      });
    }
  }, []);
  return (
    <form className="w-full md:w-1/3 rounded-md mt-4 px-5 bg-neutral-900 ">
      {(formError || formMessage) && (
        <FormModal
          error={Boolean(formError)}
          title={formError ? " Error: Could not submit form" : "Success!"}
          text={formError ? formError : formMessage}
        />
      )}

      <div className="pb-12 w-full ">
        <div className="mt-10 flex flex-col w-full  mx-auto gap-8">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Athlete Spotlight Profile
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              This information will be displayed publicly on{" "}
              <a className="hover:text-green-600" href="a2aathletics.com">
                a2aathletics.com
              </a>
            </p>
          </div>

          {/* 1: basic info */}
          {/* 2: sport bios */}
          {/* 3: images */}
          {formStep === 1 ? <AIF1 /> : formStep === 2 ? <AIF2 /> : <AIF3 />}
        </div>
      </div>
    </form>
  );
}
