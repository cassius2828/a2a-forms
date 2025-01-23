import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/useGlobalContext";
import { useEffect } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
const Header = () => {
  const { user, signoutUser } = useGlobalContext();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signoutUser();
    navigate("/");
  };
  useEffect(() => {}, [user]);
  return (
    <header className="bg-neutral-950 text-white shadow-md pb-4">
      {/* {user && (
        <span className="absolute top-3 right-8 text-white">
          Welcome, {user?.first_name}
        </span>
      )} */}

      {/* <nav className=" mx-5 px-4 flex items-end justify-between gap-4">
        <Link to={"/"}>
          <h1 className="text-4xl mr-8">Athlete 2 Athlete</h1>
        </Link>
        <ul className="flex space-x-8">
          <li className="hover:text-green-400 transition-colors">
            <Link to="/spotlight-form">Athlete Info Form</Link>
          </li>
          <li className="hover:text-green-500 transition-colors">
            <Link to="/testimonial-form">Testimonial Form</Link>
          </li>
          <li className="hover:text-green-500 transition-colors">
            <Link to="/submissions">My Submissions</Link>
          </li>{" "}
          {user ? (
            <li
              onClick={handleSignOut}
              className="hover:text-green-500 transition-colors"
            >
              Sign Out
            </li>
          ) : (
            <>
              <li className="hover:text-green-500 transition-colors">
                <Link to="/login">Login</Link>
              </li>
              <li className="hover:text-green-500 transition-colors">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          <li className="hover:text-green-500 transition-colors">
            <Link to="https://a2a-training.netlify.app/">Website</Link>
          </li>
        </ul>
      </nav> */}
      <HeaderV2 />
    </header>
  );
};
export default Header;

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export const HeaderV2 = () => {
  const { user, signoutUser } = useGlobalContext();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signoutUser();
    navigate("/");
  };
  const location = useLocation();
  console.log(location.pathname);
  useEffect(() => {
    console.log(user);
  }, [user]);
  const navigation = [
    {
      name: "Athlete Info Form",
      href: "/spotlight-form",
      current: location.pathname === "/spotlight-form",
    },
    {
      name: "Testimonial Form",
      href: "/testimonial-form",
      current: location.pathname === "/testimonial-form",
    },
    {
      name: "My Submissions",
      href: `/submissions/${user?.id}`,
      current: location.pathname === "/submissions",
      condition: user,
    },
    {
      name: "Login",
      href: "/login",
      current: location.pathname === "/login",
      condition: !user,
    },
    {
      name: "Register",
      href: "/register",
      current: location.pathname === "/register",
      condition: !user,
    },
    {
      name: "Sign Out",
      href: "/",
      // current: location.pathname === "/",
      condition: user, // Shows if user is logged in
      action: handleSignOut, // Add the sign-out handler
    },
    // {
    //   name: "Website",
    //   href: "https://a2a-training.netlify.app/",
    //   current: location.pathname === "https://a2a-training.netlify.app/",
    // },
  ];
  const userNavigation = [
    { name: "Your Profile", href: `/profile/${user?.id}` },
    { name: "Settings", href: `/profile/${user?.id}/settings` },
    { name: "Sign out", href: "#" },
  ];
  return (
    <>
      {/*
      This example requires updating your template:

      ```
      <html class="h-full bg-gray-100">
      <body class="h-full">
      ```
    */}
      <div className=" w-full">
        <Disclosure
          as="nav"
          className="bg-neutral-950 shadow-sm shadow-green-900 fixed z-50 top-0 w-full"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <Link to={"/"}>
                    <h1 className="text-3xl">A2A</h1>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        style={{
                          display:
                            item.condition !== undefined
                              ? item.condition
                                ? "block"
                                : "none"
                              : "block",
                        }}
                        key={item.name}
                        to={item.href}
                        onClick={item.action && item.action}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current
                            ? "bg-gray-800 text-white"
                            : "text-gray-300 hover:bg-green-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                {user && (
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon aria-hidden="true" className="size-6" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            alt={user.first_name + " 's avatar"}
                            src={
                              user.avatar ||
                              "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                            }
                            className="size-8 rounded-full"
                          />
                        </MenuButton>
                      </div>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        {userNavigation.map((item) => (
                          <MenuItem key={item.name}>
                            <a
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                            >
                              {item.name}
                            </a>
                          </MenuItem>
                        ))}
                      </MenuItems>
                    </Menu>
                  </div>
                )}
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img
                    alt={user?.first_name + " avatar" || "user avatar"}
                    src={
                      user?.avatar ||
                      "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    }
                    className="size-10 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base/5 font-medium text-white">
                    {user?.first_name}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {user?.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => {
                  console.log(item, ' ITEM')
                  if (item.href === "#") {
                    return (
                      <DisclosureButton
                        key={item.name}
                        onClick={
                          item.name === "Sign out" ? handleSignOut : undefined
                        }
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}sss
                      </DisclosureButton>
                    );
                  } else {
                    return (
                      <DisclosureButton
                        key={item.name}
                        onClick={
                          item.name === "Sign out" ? handleSignOut : undefined
                        }
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </DisclosureButton>
                    );
                  }
                })}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </>
  );
};
