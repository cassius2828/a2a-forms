import axios from "axios";
import { LoginFormState, RegisterFormState } from "../lib/types";
const BASE_URL = import.meta.env.VITE_BASE_URL;

/////////////////////
// ? POST | User Signup Function
/////////////////////
export async function signup(formData: RegisterFormState) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, formData);

    const data = response.data;
    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      // store the token! in localstorage
      localStorage.setItem("token", data.token);
      const user = JSON.parse(atob(data.token.split(".")[1]));
 
      return user.user;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

/////////////////////
// User login Function
/////////////////////
export async function login(userCredentials: LoginFormState) {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      userCredentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    // if (data.error) {
    //   throw new Error(data.error);
    // }
    if (data.token) {
      // store the token! in localstorage
      localStorage.setItem("token", data.token);
      const user = JSON.parse(atob(data.token.split(".")[1]));

      return user.user;
    }
  } catch (err) {
    console.log(err.response.data);

    return err.response.data;
  }
}

/////////////////////
// Get User Function
/////////////////////
export function getUser() {
  const token = localStorage.getItem("token");
  if (!token) return;

  const user = JSON.parse(atob(token?.split(".")[1]));
  return user.user;
}

/////////////////////
// Refresh Token
/////////////////////
export const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/refresh-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const { token } = response.data;
    localStorage.setItem("token", token);
    return token;
  } catch (err) {
    console.error("Error refreshing token:", err);
  }
};
