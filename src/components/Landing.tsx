import { Link } from "react-router-dom";
import {
  BoltIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";
import { Feature } from "../lib/types";
import { AuroraContainer } from "./Aurora";

export default function Landing() {
  return (
    <div className=" mt-16 md:mt-0">
      <AuroraContainer>
        <LandingContent />
      </AuroraContainer>
    </div>
  );
}

const Features = () => {
  const features = [
    {
      name: "Elite Training.",
      description:
        "Maximize your potential with expert-led training programs designed to push your limits and enhance performance.",
      icon: BoltIcon,
    },
    {
      name: "Share Your Experience.",
      description:
        "Connect with fellow athletes by sharing testimonials, success stories, and feedback on your training journey.",
      icon: ChatBubbleLeftRightIcon,
    },
    {
      name: "New Features on the Way.",
      description:
        "Stay ahead with upcoming features like session tracking, subscriptions, and enhanced athlete profiles.",
      icon: SparklesIcon,
    },
  ];
  return (
    <>
      <hr />
      <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16 my-12">
        {features.map((feature: Feature) => (
          <div key={feature.name} className="relative pl-9">
            <dt className="inline font-semibold text-white">
              <feature.icon
                aria-hidden="true"
                className="absolute left-1 top-1 size-5 text-green-500"
              />
              {feature.name}
            </dt>{" "}
            <dd className="inline">{feature.description}</dd>
          </div>
        ))}
      </dl>
      <hr />
    </>
  );
};

const LandingContent = () => {
  return (
    <>
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-5xl pb-32 sm:pb-48 sm:pt-32 lg:pb-56">
          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
              Athlete 2 Athlete
            </h1>
            <p className="my-8 md:mb-16 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
              A2A is built for athletes, by athletes. Whether you’re training
              for peak performance, tracking your progress, or looking for
              expert guidance, our platform is designed to support your journey.
            </p>
            <Features />

            <p className="my-6 md:mb-12 text-lg font-medium text-gray-400 sm:text-xl">
              Let’s push limits, break barriers, and achieve greatness—together.
              Book now and unlock your full potential today!
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                to={`/book`}
                className=" bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 px-6 rounded-md shadow-md transition-all duration-300"
              >
                Book a Session
              </Link>
              <Link
                to={`/share-your-experience`}
                className=" bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 px-6 rounded-md shadow-md transition-all duration-300"
              >
                Share Your Experience
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
