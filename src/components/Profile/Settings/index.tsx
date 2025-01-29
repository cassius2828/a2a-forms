import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useGlobalContext } from "../../../context/useGlobalContext";
import {
  SideBarNavMenu,
  UpdatePasswordFormData,
  UserInfoFormState,
} from "../../../lib/types";
import {
  getUser,
  putUpdatePassword,
  putUpdateUserInfo,
} from "../../../services/authService";
import FormModal from "../../Modals/FormModal";
import { useNavigate, useParams } from "react-router-dom";
import PromptLoginOrRegister from "../../Auth/PromptLoginOrRegister";
import NoAccessPage from "../../PlaceholderPages/NoAccessPage";
import ConfirmationModalWithPasswordInput from "../../Modals/ConfirmationModalWithPasswordInput";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfileSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userId } = useParams();

  const { user, error, setError, message, setMessage } = useGlobalContext();
  const navigation = [
    {
      name: "Appointments",
      href: `/profile/${user?.id}/appointments`,
      icon: FolderIcon,
      current: false,
    },
    {
      name: "Membership",
      href: `/profile/${user?.id}/membership`,
      icon: ServerIcon,
      current: false,
    },
    {
      name: "Preferences",
      href: `/profile/${user?.id}/preferences`,
      icon: SignalIcon,
      current: false,
    },
    {
      name: "Billing",
      href: `/profile/${user?.id}/billing`,
      icon: GlobeAltIcon,
      current: false,
    },
    {
      name: "Settings",
      href: `/profile/${user?.id}/settings`,
      icon: Cog6ToothIcon,
      current: true,
    },
  ];

  if (!user) return <PromptLoginOrRegister />;
  if (userId !== user.id) return <NoAccessPage />;
  return (
    <>
      <div className="w-full">
        {(error || message) && (
          <FormModal
            isError={Boolean(error)}
            title={error ? " Error: Could not update user info" : "Success!"}
            text={error ? error : message}
            setError={setError}
            setMessage={setMessage}
            error={error}
            message={message}
          />
        )}
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 xl:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0  transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />
          {/* What is this?? */}

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>

              {/* What is this?? */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=green&shade=500"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-gray-800 text-white"
                                  : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className="size-6 shrink-0"
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>

                    <li className="-mx-6 mt-auto">
                      <a
                        href="#"
                        className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-gray-800"
                      >
                        <img
                          alt=""
                          src=""
                          className="size-8 rounded-full object-cover bg-gray-800"
                        />
                        <span className="sr-only">Your profile</span>
                        <span aria-hidden="true">Tom sCook</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* side nav */}
        <SideNav navigation={navigation} />

        {/* main settings form */}
        <div className="xl:pl-72">
          <main>
            <h1 className="sr-only">Account Settings</h1>

            {/* Settings forms */}
            <SettingsForm userId={userId} />
          </main>
        </div>
      </div>
    </>
  );
}

export const SideNav = ({ navigation }: { navigation: SideBarNavMenu[] }) => {
  const { user } = useGlobalContext();
  return (
    <>
      <div className="hidden xl:fixed  xl:inset-y-0 xl:z-40 xl:flex xl:w-72 xl:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
          <nav className="flex flex-1 flex-col mt-20 ">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className="size-6 shrink-0"
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <a
                  href="#"
                  className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-gray-800"
                >
                  <img
                    alt={user?.first_name + " avatar"}
                    src={
                      user?.avatar ||
                      "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    }
                    className="size-8 rounded-full object-cover bg-gray-800"
                  />
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">{`${user?.first_name} ${user?.last_name}`}</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
const initialUpdatePasswordFormState = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};

export const SettingsForm = ({ userId }: { userId: string }) => {
  return (
    <div className="divide-y divide-white/5">
      <div className="grid  grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8  ">
        {/* personal info */}
        <div>
          <h2 className="text-base/7 font-semibold text-white">
            Personal Information
          </h2>
          <p className="mt-1 text-sm/6 text-gray-400">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <UserInfoForm />
      </div>
      <UpdatePasswordFormSection />
      <DeleteAccountSection userId={userId} />
    </div>
  );
};

export const UpdatePasswordFormSection = () => {
  const [form, setForm] = useState<UpdatePasswordFormData>(
    initialUpdatePasswordFormState
  );
  const { handleInputChange, setError, setMessage } = useGlobalContext();
  const { userId } = useParams();

  // Handles form submission for updating the password
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (userId) {
        const data = await putUpdatePassword(form, userId);

        // Handle API response
        if (data.error) {
          setError(data.error);
        } else {
          setMessage(data.message);
          setForm(initialUpdatePasswordFormState);
        }
      }
    } catch (err) {
      console.error(err);
      if (typeof err === "string") setError(err.response || err);
    }
  };

  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      {/* Section Title */}
      <div>
        <h2 className="text-base/7 font-semibold text-white">
          Change password
        </h2>
        <p className="mt-1 text-sm/6 text-gray-400">
          Update your password associated with your account.
        </p>
      </div>

      {/* Password Update Form */}
      <form onSubmit={handleSubmit} className="md:col-span-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          {/* Current Password Field */}
          <div className="col-span-full">
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-white"
            >
              Current password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                value={form.password}
                onChange={(e) => handleInputChange(e, setForm)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
              />
            </div>
          </div>

          {/* New Password Field */}
          <div className="col-span-full">
            <label
              htmlFor="newPassword"
              className="block text-sm/6 font-medium text-white"
            >
              New password
            </label>
            <div className="mt-2">
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={form.newPassword}
                onChange={(e) => handleInputChange(e, setForm)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
              />
            </div>
          </div>

          {/* Confirm New Password Field */}
          <div className="col-span-full">
            <label
              htmlFor="confirmPassword"
              className="block text-sm/6 font-medium text-white"
            >
              Confirm password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={(e) => handleInputChange(e, setForm)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-6">
          {/* Reset Form Button */}
          <button
            onClick={() => setForm(initialUpdatePasswordFormState)}
            type="button"
            className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Reset Form
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export const UserInfoForm = () => {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [userInfoForm, setUserInfoForm] =
    useState<UserInfoFormState>(initialFormState);
  const {
    handleInputChange,
    handleSingleFileChange,
    user,
    setError,
    setMessage,
  } = useGlobalContext();

  const navigate = useNavigate();

  // Handles form submission to update user info
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(profilePhoto, " pfp");
    e.preventDefault();
    try {
      const dataToSendToServer = new FormData();
      dataToSendToServer.append("firstName", userInfoForm.firstName);
      dataToSendToServer.append("lastName", userInfoForm.lastName);
      dataToSendToServer.append("email", userInfoForm.email);
      dataToSendToServer.append("phone", userInfoForm.phone?.toString() || "");

      // Append profile photo if available
      if (profilePhoto) {
        dataToSendToServer.append("avatar", profilePhoto);
        // Log FormData contents for debugging
        for (const [key, value] of dataToSendToServer.entries()) {
          console.log(
            `${key}:`,
            value instanceof File
              ? { name: value.name, size: value.size, type: value.type }
              : value + " FALSE"
          );
        }
      }

      if (user) {
        const data = await putUpdateUserInfo(user.id, dataToSendToServer);
        console.log(data, "<-- fdsafdsa");

        if (data?.error) {
          setError(data.error);
        } else {
          setMessage(data.message);
          if (data.token && data.token !== undefined) {
            localStorage.setItem("token", data.token);
            getUser();
            setTimeout(() => {
              navigate(`/profile/${user.id}`);
            }, 2000);
          }
        }
      } else {
        setError("No user is signed in");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to update user info");
    }
  };

  // Prefill form fields with existing user data
  const fillUserInfoFormFromUserState = () => {
    if (user) {
      setUserInfoForm({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
      });
    }
  };

  // Populate form when component mounts
  useEffect(() => {
    fillUserInfoFormFromUserState();
  }, []);

  if (!user) return;

  return (
    <form onSubmit={handleSubmit} className="md:col-span-2">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        {/* Profile Picture Upload Section */}
        <div className="col-span-full flex items-center gap-x-8">
          <img
            alt={user.first_name + " 's avatar"}
            src={
              user.avatar ||
              `https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg`
            }
            className="size-24 flex-none rounded-lg bg-gray-800 object-cover"
          />
          <div className="flex flex-col justify-start items-start">
            <label className="rounded-md text-sm font-semibold text-white shadow-sm mb-2 ">
              Change avatar
            </label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              onChange={(e) => handleSingleFileChange(e, setProfilePhoto)}
              className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-neutral-500 focus:outline focus:outline-2 focus:outline-gray-300 outline outline-gray-300/30 sm:text-sm"
            />
            <p className="mt-2 text-xs/5 text-gray-400">
              JPG, GIF or PNG. 1MB max.
            </p>
          </div>
        </div>

        {/* First Name Field */}
        <div className="sm:col-span-3">
          <label
            htmlFor="firstName"
            className="block text-sm/6 font-medium text-white"
          >
            First name
          </label>
          <div className="mt-2">
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
              onChange={(e) => handleInputChange(e, setUserInfoForm)}
              value={userInfoForm.firstName}
            />
          </div>
        </div>

        {/* Last Name Field */}
        <div className="sm:col-span-3">
          <label
            htmlFor="lastName"
            className="block text-sm/6 font-medium text-white"
          >
            Last name
          </label>
          <div className="mt-2">
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              onChange={(e) => handleInputChange(e, setUserInfoForm)}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
              value={userInfoForm.lastName}
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="col-span-full">
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-white"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
              onChange={(e) => handleInputChange(e, setUserInfoForm)}
              value={userInfoForm.email}
            />
          </div>
        </div>

        {/* Phone Number Field */}
        <div className="col-span-full">
          <label
            htmlFor="phone"
            className="block text-sm/6 font-medium text-white"
          >
            Phone Number
          </label>
          <div className="mt-2">
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
              placeholder="Ex: 555 555-5555"
              maxLength={10}
              onChange={(e) => handleInputChange(e, setUserInfoForm)}
              value={userInfoForm.phone}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex">
        <button
          type="submit"
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export const DeleteAccountSection = ({ userId }: { userId: string }) => {
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base/7 font-semibold text-white">Delete account</h2>
        <p className="mt-1 text-sm/6 text-gray-400">
          No longer want to use our service? You can delete your account here.
          This action is not reversible. All information related to this account
          will be deleted permanently.
        </p>
      </div>

      <form className="flex items-start md:col-span-2">
        <button
          type="button"
          onClick={() => setShowConfirmationModal(true)}
          className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
        >
          Yes, delete my account
        </button>
      </form>
      {showConfirmationModal && (
        <ConfirmationModalWithPasswordInput
          title="Delete User"
          info="Are you sure you want to delete this user? This action cannot be undone and will remove any data tied to this user such as spotlights, testimonials, and more."
          id={userId}
          greenAction={() => {
            setShowConfirmationModal(false);
          }}
          greenActionText="No, keep this user"
          redActionText="Yes, permanently delete user"
        />
      )}
    </div>
  );
};
