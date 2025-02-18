import { useState } from "react";
import { useGlobalContext } from "../../context/useGlobalContext";

import { LoginFormState } from "../../lib/types";
import { Link, useNavigate } from "react-router-dom";
import { getUser, login } from "../../services/authService";
const initialLoginFormState = {
  email: "",
  password: "",
};
const Login = () => {
  const { handleInputChange, user, setUser } = useGlobalContext();
  const [loginForm, setLoginForm] = useState<LoginFormState>(
    initialLoginFormState
  );
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add validation logic
    try {
      if (user) {
        setError("A user is already signed in");
        return;
      }
      const data = await login(loginForm);
console.log(data)
      setUser(data);
      getUser();
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(err.response.data.error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleLoginSubmit}
        className="w-full md:w-1/2 lg:w-1/3 mx-auto p-4 bg-neutral-900 rounded-lg shadow-md mt-20 relative"
      >
        {error && (
          <span className="text-red-500 text-xl flex justify-center">
            {error}
          </span>
        )}

        <h2 className="text-xl font-semibold text-white mb-4">Login</h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginForm.email}
            onChange={(e) => handleInputChange(e, setLoginForm)}
            className="mt-2 block w-full rounded-md bg-white/5 text-white px-3 py-2 border border-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginForm.password}
            onChange={(e) => handleInputChange(e, setLoginForm)}
            className="mt-2 block w-full rounded-md bg-white/5 text-white px-3 py-2 border border-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition duration-300 focus:outline-none"
        >
          Login
        </button>
        <Link
          to={"/register"}
          className="text-white absolute -bottom-10 left-1/2 -translate-x-1/2"
        >
          register
        </Link>
      </form>
    </>
  );
};
export default Login;
