import { useState } from "react";
import { RegisterFormState } from "../../lib/types";
import { useGlobalContext } from "../../context/useGlobalContext";
const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};
import { signup } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [registerForm, setRegisterForm] =
    useState<RegisterFormState>(initialFormState);
  const { handleInputChange } = useGlobalContext();
  const navigate = useNavigate();
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add validation logic
    try {
      const data = await signup(registerForm);
      if (!data.error) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      console.log(`Unable to communciate with server to register user`);
    }
    console.log("Register Form Submitted:", registerForm);
  };
  return (
    <form
      onSubmit={handleRegisterSubmit}
      className="w-full md:w-1/2 lg:w-1/3 mx-auto p-4 bg-neutral-900 rounded-lg shadow-md mt-20 relative"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Sign Up</h2>

      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-white"
        >
          First Name
        </label>
        <input
        required
          type="text"
          id="firstName"
          name="firstName"
          value={registerForm.firstName}
          onChange={(e) => handleInputChange(e, setRegisterForm)}
          className="mt-2 block w-full rounded-md bg-white/5 text-white px-3 py-2 border border-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your first name"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-white"
        >
          Last Name
        </label>
        <input
        required
          type="text"
          id="lastName"
          name="lastName"
          value={registerForm.lastName}
          onChange={(e) => handleInputChange(e, setRegisterForm)}
          className="mt-2 block w-full rounded-md bg-white/5 text-white px-3 py-2 border border-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your last name"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email Address
        </label>
        <input
        required
          type="email"
          id="email"
          name="email"
          value={registerForm.email}
          onChange={(e) => handleInputChange(e, setRegisterForm)}
          className="mt-2 block w-full rounded-md bg-white/5 text-white px-3 py-2 border border-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="example@gmail.com"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-white">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={registerForm.phone}
          onChange={(e) => handleInputChange(e, setRegisterForm)}
          className="mt-2 block w-full rounded-md bg-white/5 text-white px-3 py-2 border border-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="555 555 5555"
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
        required
          type="password"
          id="password"
          name="password"
          value={registerForm.password}
          onChange={(e) => handleInputChange(e, setRegisterForm)}
          className="mt-2 block w-full rounded-md bg-white/5 text-white px-3 py-2 border border-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your password"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-white"
        >
          Confirm Password
        </label>
        <input
        required
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={registerForm.confirmPassword}
          onChange={(e) => handleInputChange(e, setRegisterForm)}
          className="mt-2 block w-full rounded-md bg-white/5 text-white px-3 py-2 border border-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Confirm your password"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition duration-300 focus:outline-none"
      >
        Sign Up
      </button>
      <Link
        to={"/login"}
        className="text-white absolute -bottom-10 left-1/2 -translate-x-1/2"
      >
        login
      </Link>
    </form>
  );
};
export default Register;
