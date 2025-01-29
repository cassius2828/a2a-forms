import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
  Bars3Icon,
  EllipsisHorizontalIcon,
  PlusSmallIcon,
} from "@heroicons/react/20/solid";
import { BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { set } from "mongoose";
import { useGlobalContext } from "../../../context/useGlobalContext";
import {
  getPendingSpotlights,
  getSpotlightSubmissionsByStatus,
  getTestimonialSubmissionsByStatus,
} from "../../../services/formService";
import {
  AthleteSpotlightSubmission,
  StatusType,
  TestimonialSubmission,
} from "../../../lib/types";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Invoices", href: "#" },
  { name: "Clients", href: "#" },
  { name: "Expenses", href: "#" },
];

const stats = [
  {
    name: "Revenue",
    value: "$405,091.00",
    change: "+4.75%",
    changeType: "positive",
  },
  {
    name: "Overdue invoices",
    value: "$12,787.00",
    change: "+54.02%",
    changeType: "negative",
  },
  {
    name: "Outstanding invoices",
    value: "$245,988.00",
    change: "-1.39%",
    changeType: "positive",
  },
  {
    name: "Expenses",
    value: "$30,156.00",
    change: "+10.18%",
    changeType: "negative",
  },
];
const statuses = {
  Paid: "text-green-700 bg-green-50 ring-green-600/20",
  Withdraw: "text-gray-600 bg-gray-50 ring-gray-500/10",
  Overdue: "text-red-700 bg-red-50 ring-red-600/10",
};
const transactions = [
  {
    id: 1,
    href: "#",
    sport: "Football",
    status: "pending",
    name: "Jane Doe",
    grad_year: "2023",
    createdAt: "2022-12-13",
  },

  {
    id: 2,
    href: "#",
    sport: "Football",
    status: "pending",
    name: "Reform",
    grad_year: "Website redesign",
    createdAt: "2022-12-13",
  },
  {
    id: 2,
    href: "#",
    sport: "Football",
    status: "pending",
    name: "Reform",
    grad_year: "Website redesign",
    createdAt: "2022-12-13",
  },
];
const spotlightSubmissionMock = [
  {
    id: 1,
    href: "#",
    sport: "Football",
    status: "pending",
    first_name: "Reform",
    last_name: "Jane Doe",
    grad_year: "2023",
    createdAt: "2022-12-13",
  },

  {
    id: 2,
    href: "#",
    sport: "Football",
    status: "pending",
    first_name: "Reform",
    last_name: "Reform",
    grad_year: "Website redesign",
    createdAt: "2022-12-13",
  },
  {
    id: 3,
    href: "#",
    sport: "Football",
    status: "pending",
    first_name: "Reform",
    last_name: "Reform",
    grad_year: "Website redesign",
    createdAt: "2022-12-13",
  },
];
const testimonialSubmissionsMock = [
  {
    id: 1,
    href: "#",
    status: "pending",
    name: "Jane Doe",
    createdAt: "2022-12-13",
  },

  {
    id: 2,
    href: "#",
    status: "pending",
    name: "Tim Samson",
    createdAt: "2022-12-13",
  },
  {
    id: 3,
    href: "#",
    status: "pending",
    name: "Lauren Danefield",
    createdAt: "2022-12-13",
  },
];

const clients = [
  {
    id: 1,
    name: "Tuple",
    imageUrl: "https://tailwindui.com/plus/img/logos/48x48/tuple.svg",
    lastInvoice: {
      date: "December 13, 2022",
      dateTime: "2022-12-13",
      amount: "$2,000.00",
      status: "Overdue",
    },
  },
  {
    id: 1,
    name: "Tuple",
    imageUrl: "https://tailwindui.com/plus/img/logos/48x48/tuple.svg",
    lastInvoice: {
      date: "December 13, 2022",
      dateTime: "2022-12-13",
      amount: "$2,000.00",
      status: "Overdue",
    },
  },
  {
    id: 1,
    name: "Tuple",
    imageUrl: "https://tailwindui.com/plus/img/logos/48x48/tuple.svg",
    lastInvoice: {
      date: "December 13, 2022",
      dateTime: "2022-12-13",
      amount: "$2,000.00",
      status: "Overdue",
    },
  },
  {
    id: 1,
    name: "Tuple",
    imageUrl: "https://tailwindui.com/plus/img/logos/48x48/tuple.svg",
    lastInvoice: {
      date: "December 13, 2022",
      dateTime: "2022-12-13",
      amount: "$2,000.00",
      status: "Overdue",
    },
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [submissionsTypeIsSpotlight, setSubmissionTypeIsSpotlight] =
    useState<boolean>(true);
  const { user, error, setError } = useGlobalContext();
  const [status, setStatus] = useState<StatusType>("pending");
  const [athleteSpotlightSubmissions, setAthleteSpotlightSubmissions] =
    useState<AthleteSpotlightSubmission[]>([]);
  const [testimonialSubmissions, setTestimonialSubmissions] = useState<
    TestimonialSubmission[]
  >([]);
  const submissionStatusList = [
    { status: "pending", color: "#eab308", current: status === "pending" },
    { status: "approved", color: "#22c55e", current: status === "approved" },
    { status: "rejected", color: "#ef4444", current: status === "rejected" },
  ];
  const fetchAthleteSpotlightSubmissions = async () => {
    try {
      const data = await getSpotlightSubmissionsByStatus(status);
      if (data.error) {
        setError(data.error);
      } else {
        setAthleteSpotlightSubmissions(data);
      }
    } catch (err) {
      console.error(err);
      setError(
        typeof err === "string" ? err : "Unable to set spotlight submissions"
      );
    }
  };

  const fetchTestimonialSubmissions = async () => {
    try {
      const data = await getTestimonialSubmissionsByStatus(status);
      if (data.error) {
        setError(data.error);
      } else {
        setTestimonialSubmissions(data);
      }
    } catch (err) {
      console.error(err);
      setError(
        typeof err === "string" ? err : "Unable to set testimonial submissions"
      );
    }
  };

  // ensures type safety
  const handleStatusTypeChange = (statusType: string) => {
    if (statusType === "pending") {
      setStatus("pending");
    } else if (statusType === "approved") {
      setStatus("approved");
    } else if (statusType === "rejected") {
      setStatus("rejected");
    } else return;
  };
  useEffect(() => {
    fetchAthleteSpotlightSubmissions();
    fetchTestimonialSubmissions();
  }, [status]);

  if (user?.role !== "admin") return <h1>not authorized</h1>;
  return (
    <>
      <main>
        <div className="relative isolate overflow-hidden pt-16">
          {/* Secondary navigation */}
          <header className="pb-4 pt-6 sm:pb-6">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8 relative">
              <h1 className="text-base/7 font-semibold text-gray-200">
                {submissionsTypeIsSpotlight ? "Spotlights" : "Testimonials"}
              </h1>
              <div className="order-last flex w-full gap-x-8 text-sm/6 font-semibold sm:order-none sm:w-auto sm:border-l sm:border-gray-800 sm:pl-6 sm:text-sm/7">
                {submissionStatusList.map((item) => (
                  <button
                    style={{ color: item.current ? item.color : "gray" }}
                    key={item.status}
                    onClick={() => handleStatusTypeChange(item.status)}
                    className={`capitalize`}
                  >
                    {item.status}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSubmissionTypeIsSpotlight((prev) => !prev)}
                className="ml-auto flex items-center gap-x-1 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                {submissionsTypeIsSpotlight
                  ? "View Testimonials"
                  : "View Spotlights"}
              </button>
            </div>
          </header>
        </div>

        <div className="space-y-16 py-16 xl:space-y-20  w-full md:w-[50rem] ">
          {/* Recent activity table */}
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mx-auto max-w-2xl text-base font-semibold text-gray-200 lg:mx-0 lg:max-w-none">
                Submissions
              </h2>
            </div>
            <div className="mt-6 overflow-hidden border-t border-gray-100">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                  <table className="w-full text-left">
                    <thead className="sr-only">
                      <tr>
                        <th>Amount</th>
                        <th className="hidden sm:table-cell">Client</th>
                        <th>More details</th>
                      </tr>
                    </thead>
                    {submissionsTypeIsSpotlight ? (
                      <AthleteSpotlightSubmissionsTableBody
                        userId={user.id}
                        status={status}
                        submissions={athleteSpotlightSubmissions}
                      />
                    ) : (
                      <TestimonialSubmmisionsTableBody
                        userId={user.id}
                        status={status}
                        submissions={testimonialSubmissions}
                      />
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const AthleteSpotlightSubmissionsTableBody = ({
  submissions,
  status,
  userId,
}: {
  submissions: AthleteSpotlightSubmission[];
  status: StatusType;
  userId: string;
}) => {
  if (submissions.length === 0)
    return (
      <span className="text-gray-100 text-2xl p-3 text-center w-full flex justify-center">
        No {status} submissions
      </span>
    );
  return (
    <tbody>
      {submissions.map((spotlight) => (
        <Fragment key={spotlight.id}>
          <tr key={spotlight.id}>
            <td className="relative py- pr-6">
              <div className="flex gap-x-6">
                <div className="flex-auto ">
                  <div className="flex flex-col items-start justify-between gap-3">
                    <div className="text-sm/6 font-medium text-gray-200">
                      {spotlight.sport}
                    </div>
                    <div
                      className={classNames(
                        spotlight.status,
                        "text-xs font-medium text-yellow-500"
                      )}
                    >
                      {spotlight.status}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
              <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
            </td>
            <td className="hidden py-5 pr-6 sm:table-cell">
              <div className="text-sm/6 text-gray-200">{`${spotlight.first_name} ${spotlight.last_name}`}</div>
              <div className="mt-1 text-xs/5 text-gray-500">
                {spotlight.createdAt}
              </div>
            </td>
            <td className="py-5 text-right flex gap-4 justify-end items-center">
              <ViewSubmissionBtn
                path={`/submissions/${userId}/manage/spotlights/${spotlight.id}`}
              />
              <button className="px-4 py-1 border border-gray-400 bg-red-700 text-white text-sm rounded-lg hover:bg-red-800 transition">
                Reject
              </button>{" "}
              <button className="px-4 py-1 border border-gray-400 bg-green-700 text-white text-sm rounded-lg hover:bg-green-800 transition">
                Accept
              </button>
            </td>
          </tr>
        </Fragment>
      ))}
    </tbody>
  );
};

export const TestimonialSubmmisionsTableBody = ({
  status,
  submissions,
  userId,
}: {
  submissions: TestimonialSubmission[];
  status: StatusType;
  userId: string;
}) => {
  if (submissions.length === 0)
    return (
      <span className="text-gray-100 text-2xl p-3 text-center w-full flex justify-center">
        No {status} submissions
      </span>
    );

  return (
    <tbody>
      {submissions.map((testimonial) => (
        <Fragment key={testimonial.id}>
          <tr key={testimonial.id}>
            <td className="relative py- pr-6">
              <div className="flex gap-x-6">
                <div className="flex-auto ">
                  <div className="flex flex-col items-start justify-between gap-3">
                    <div
                      className={classNames(
                        testimonial.status,
                        "text-xs font-medium text-yellow-500"
                      )}
                    >
                      {testimonial.status}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
              <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
            </td>
            <td className="hidden py-5 pr-6 sm:table-cell">
              <div className="text-sm/6 text-gray-200">{testimonial.name}</div>
              <div className="mt-1 text-xs/5 text-gray-500">
                {testimonial.createdAt}
              </div>
            </td>
            <td className="py-5 text-right flex gap-4 justify-end items-center">
              <ViewSubmissionBtn
                path={`/submissions/${userId}/manage/testimonials/${testimonial.id}`}
              />
              <button className="px-4 py-1 border border-gray-400 bg-red-700 text-white text-sm rounded-lg hover:bg-red-800 transition">
                Reject
              </button>{" "}
              <button className="px-4 py-1 border border-gray-400 bg-green-700 text-white text-sm rounded-lg hover:bg-green-800 transition">
                Accept
              </button>
            </td>
          </tr>
        </Fragment>
      ))}
    </tbody>
  );
};

export const StatsTemp = () => {
  return (
    <div className="border-b border-b-gray-200/10 lg:border-t lg:border-t-gray-200/5">
      <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
        {stats.map((stat, statIdx) => (
          <div
            key={stat.name}
            className={classNames(
              statIdx % 2 === 1
                ? "sm:border-l"
                : statIdx === 2
                ? "lg:border-l"
                : "",
              "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-200/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8"
            )}
          >
            <dt className="text-sm/6 font-medium text-gray-500">{stat.name}</dt>
            <dd
              className={classNames(
                stat.changeType === "negative"
                  ? "text-rose-600"
                  : "text-gray-700",
                "text-xs font-medium"
              )}
            >
              {stat.change}
            </dd>
            <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-200">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export const ViewSubmissionBtn = ({ path }: { path: string }) => {
  return (
    <Link
      to={path}
      className="px-4 py-1 border border-gray-400 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-800 transition"
    >
      View
    </Link>
  );
};
