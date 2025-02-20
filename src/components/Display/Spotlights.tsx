// import { athletes } from '@/data/athletes' // Import the athletes array

import { useEffect, useState } from "react";
import { getSpotlightSubmissionsByStatus } from "../../services/formService";

export default function AthleteSpotlightPage() {
  const [spotlights, setSpotlights] = useState([]);

  useEffect(() => {
    getSpotlightSubmissionsByStatus("accepted");
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Page Title and Introduction */}
      <section className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold text-neutral-900">
          Athlete Spotlights
        </h1>
        <p className="text-lg text-neutral-700">
          At A2A Training, we believe that success is built on a foundation of
          hard work, dedication, and the pursuit of growth. Our Athlete
          Spotlights showcase individuals who embody these core values and
          demonstrate excellence both on and off the field. Each featured
          athlete has a unique story that highlights their determination,
          mindset, and alignment with A2A’s mission to inspire the next
          generation of athletes.
        </p>
        <p className="mt-4 text-lg text-neutral-700">
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

export function AthleteGallery({ spotlights }) {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Athlete Cards */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {spotlights.map((spotlight) => (
          <div
            key={athlete.id}
            className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md"
          >
            {/* Profile Image */}
            {athlete.profileImg ? (
              <img
                src={athlete.profileImg}
                alt={`${athlete.name} profile`}
                className="mb-4 h-64 w-full rounded-lg object-cover shadow-lg"
              />
            ) : (
              <div className="mb-4 flex h-64 w-full items-center justify-center rounded-lg bg-gray-200">
                <p className="text-gray-500">Image Not Available</p>
              </div>
            )}

            {/* Athlete Info */}
            <h2 className="text-xl font-bold text-neutral-900">
              {athlete.name}
            </h2>
            <p className="mb-2 text-sm text-neutral-600">
              {athlete.sport + " | co. " + athlete.graduationYear}
            </p>
            <p className="mb-4 text-sm text-neutral-600">{athlete.location}</p>

            {/* General Bio */}
            <p className="mb-6 text-sm text-neutral-700">
              {athlete.generalBio}
            </p>

            {/* Link to Spotlight Page */}
            <Link
              href={`/spotlights/${athlete.id}`}
              className="mt-auto rounded-lg bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700"
            >
              View Spotlight
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
