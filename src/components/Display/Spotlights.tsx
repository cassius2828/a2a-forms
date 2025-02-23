// import { athletes } from '@/data/athletes' // Import the athletes array

import { useEffect, useState } from "react";
import {
  getApprovedSpotlights,
  getSpotlightBySpotlightId,
} from "../../services/formService";
import { ShowSpotlightData, SpotlightFormDataGridItem } from "../../lib/types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/useGlobalContext";
import { AuroraContainer } from "../Aurora";
import MissingItems from "../PlaceholderPages/MissingItems";

export default function AthleteSpotlightPage() {
  const [spotlights, setSpotlights] = useState<SpotlightFormDataGridItem[]>([]);

  useEffect(() => {
    const fetchApprovedSpotlights = async () => {
      try {
        const data = await getApprovedSpotlights();
        setSpotlights(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        console.log(err.response.data.error);
      }
    };
    fetchApprovedSpotlights();
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Page Title and Introduction */}
      <section className="mb-10 text-center text-gray-100">
        <h2 className="text-4xl md:text-5xl mb-12">Athlete Spotlights</h2>
        <p className="text-pretty text-lg font-medium text-gray-400 sm:text-xl/8 mb-12">
          At A2A Training, we believe that success is built on a foundation of
          hard work, dedication, and the pursuit of growth. Our Athlete
          Spotlights showcase individuals who embody these core values and
          demonstrate excellence both on and off the field. Each featured
          athlete has a unique story that highlights their determination,
          mindset, and alignment with A2A’s mission to inspire the next
          generation of athletes.
        </p>
        <p className="mt-4 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
          Discover what makes these athletes stand out, their personal journeys,
          and how they continue to push the limits in their respective sports.
          Learn about their achievements, their commitment to their craft, and
          their vision for the future.
        </p>
      </section>

      <AthleteGallery spotlights={spotlights} />
    </div>
  );
}

export function AthleteGallery({
  spotlights,
}: {
  spotlights: SpotlightFormDataGridItem[];
}) {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Athlete Cards */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {spotlights.map((spotlight) => (
          <div
            key={spotlight.id}
            className="flex flex-col items-center rounded-lg bg-neutral-900 hover:shadow-green-700 transition-shadow duration-150 shadow-md p-6 text-center "
          >
            {/* Profile Image */}
            {spotlight.profile_image ? (
              <img
                src={spotlight.profile_image}
                alt={`${spotlight.first_name} ${spotlight.last_name} profile`}
                className="mb-4 h-64 w-full rounded-lg object-cover shadow-lg"
              />
            ) : (
              <div className="mb-4 flex h-64 w-full items-center justify-center rounded-lg bg-gray-200">
                <p className="text-gray-500">Image Not Available</p>
              </div>
            )}

            {/* spotlight Info */}
            <h2 className="text-xl font-bold text-neutral-100 mb-4">
              {`${spotlight.first_name} ${spotlight.last_name}`}
            </h2>
            <p className="mb-1 text-sm text-neutral-300">
              {spotlight.sport + " | co. " + spotlight.grad_year}
            </p>
            <p className="mb-4 text-sm text-neutral-300">
              {spotlight.location}
            </p>

            {/* General Bio */}
            <p className="mb-6 text-sm text-neutral-200">
              {spotlight.general_bio.length > 200
                ? spotlight.general_bio.slice(0, 200) + "..."
                : spotlight.general_bio}
            </p>

            {/* Link to Spotlight Page */}
            <Link
              to={`/spotlights/${spotlight.id}`}
              className="mt-auto rounded-lg bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-green-700"
            >
              View Spotlight
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export const ShowSpotlight = () => {
  const { setError } = useGlobalContext();
  const navigate = useNavigate();
  const [spotlight, setSpotlight] = useState<ShowSpotlightData>();
  const { spotlightId } = useParams();
  const fetchSpotlight = async () => {
    try {
      if (spotlightId) {
        const data = await getSpotlightBySpotlightId(spotlightId);
        setSpotlight(data);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to fetch spotlight");
    }
  };

  useEffect(() => {
    fetchSpotlight();
  }, [spotlightId]);
  if (!spotlight) return <MissingItems item="Spotlight" />;
  return (
    <AuroraContainer>
      <div className="overflow-hidden py-24 sm:py-32 ">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <div className="max-w-4xl">
            <p className="text-base/7 font-semibold text-green-500">
              {spotlight.first_name}&apos;s Spotlight
            </p>
            <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {`${spotlight.first_name} ${spotlight.last_name} class of ${spotlight.grad_year}`}
            </h1>
            <p className="mt-6 text-balance text-xl/8 text-gray-300">
              {spotlight.general_bio}
            </p>
          </div>

          <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
            <div className="lg:pr-8">
              <h2 className="text-pretty text-2xl font-semibold tracking-tight text-white">
                {spotlight.first_name}&apos;s Accomplishments
              </h2>
              <p className="mb-6 mt-3 text-base/7 text-gray-300">
                {spotlight.action_bio}
              </p>
              <h2 className="text-pretty text-2xl font-semibold tracking-tight text-white">
                Community Impact
              </h2>
              <p className=" mt-3 text-base/7 text-gray-300">
                {spotlight.community_bio}
              </p>
            </div>

            <div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
              <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
                {[
                  // third is null to keep the layout alternating, otherwise the last image will fall underneath the left most image
                  spotlight.profile_image,
                  spotlight.action_image_1,
                  null,
                  spotlight.action_image_2,
                ].map((photo, idx) => {
                  return photo ? (
                    <div
                      key={idx}
                      className={`aspect-square overflow-hidden rounded-xl shadow-xl outline outline-1 -outline-offset-1 outline-black/10 ${
                        idx % 2 !== 0 ? "-mt-8 lg:-mt-40" : ""
                      }`}
                    >
                      <img
                        alt=""
                        src={photo}
                        className="block size-full object-cover"
                      />
                    </div>
                  ) : (
                    <div key={idx}></div>
                  );
                })}
              </div>
            </div>
            {/* stats */}
            {/* <div className="max-lg:mt-16 lg:col-span-1">
              <p className="text-base/7 font-semibold text-gray-400">
                The numbers
              </p>
              <hr className="mt-6 border-t border-gray-700" />
              <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {[
                  { label: "Raised", value: "$150M" },
                  { label: "Companies", value: "30K" },
                  { label: "Deals Closed", value: "1.5M" },
                  { label: "Leads Generated", value: "200M" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col gap-y-2 ${
                      idx < 3
                        ? "border-b border-dotted border-gray-700 pb-4"
                        : ""
                    }`}
                  >
                    <dt className="text-sm/6 text-gray-400">{stat.label}</dt>
                    <dd className="order-first text-6xl font-semibold tracking-tight text-white">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div> */}
            <button
              onClick={() => navigate(-1)}
              className="w-48 text-center bg-gray-600 hover:bg-gray-700 text-white text-lg font-semibold  rounded-md shadow-md transition-all duration-300"
            >
              Back
            </button>
          </section>
        </div>
      </div>
    </AuroraContainer>
  );
};
