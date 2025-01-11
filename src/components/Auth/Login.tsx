import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { LoginFormState } from "../../lib/types";
const initialLoginFormState = {
  email: "",
  password: "",
};
const Login = () => {
  const { handleInputChange } = useGlobalContext();
  const [loginForm, setLoginForm] = useState<LoginFormState>(
    initialLoginFormState
  );
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add validation logic
    console.log("Register Form Submitted:", loginForm);
  };
  return (
    <form
      onSubmit={handleLoginSubmit}
      className="w-full md:w-1/3 mx-auto p-4 bg-neutral-900 rounded-lg shadow-md mt-20"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Login</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={loginForm.email}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
    </form>
  );
};
export default Login;
