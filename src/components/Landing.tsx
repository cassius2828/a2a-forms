import { Link } from "react-router-dom";
import {
  BoltIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";
import { Feature } from "../lib/types";

const features = [
  {
    name: "Elite Training.",
    description:
      "Maximize your potential with expert-led training programs designed to push your limits and enhance performance.",
    icon: BoltIcon, // Represents power, speed, and intensity
  },
  {
    name: "Share Your Experience.",
    description:
      "Connect with fellow athletes by sharing testimonials, success stories, and feedback on your training journey.",
    icon: ChatBubbleLeftRightIcon, // Represents communication and sharing experiences
  },
  {
    name: "New Features on the Way.",
    description:
      "Stay ahead with upcoming features like session tracking, subscriptions, and enhanced athlete profiles.",
    icon: SparklesIcon, // Represents innovation and exciting new features
  },
];

const url = `https://clients-cr.s3.us-west-1.amazonaws.com/a2a/images/bjack_athletes_visit.jpg`;
export default function Landing() {
  return (
    <div className=" mt-16 md:mt-0">
      <div className="relative isolate w-screen">
        <img
          alt=""
          // src={
          //   url
          //     ? url
          //     : "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          // }
          src=""
          className="absolute inset-0 -z-10 w-screen min-h-screen object-cover brightness-[10%] opacity-40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#15803d] to-[#14532d] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mx-auto max-w-5xl pb-32 sm:pb-48 sm:pt-32 lg:pb-56">
            <div className="text-center">
              <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                Athlete 2 Athlete
              </h1>
              <p className="my-8 md:mb-16 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
                A2A is built for athletes, by athletes. Whether you’re training
                for peak performance, tracking your progress, or looking for
                expert guidance, our platform is designed to support your
                journey.
              </p>
              <Features features={features} />

              <p className="my-6 md:mb-12 text-lg font-medium text-gray-400 sm:text-xl">
                Let’s push limits, break barriers, and achieve
                greatness—together. Book now and unlock your full potential
                today!
              </p>
              <div className="flex gap-4 justify-center">
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
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#15803d] to-[#14532d] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}

const Features = ({ features }: { features: Feature[] }) => {
  return (
    <>
      <hr />
      <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16 my-12">
        {features.map((feature) => (
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
