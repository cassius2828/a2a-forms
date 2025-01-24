import axios from "axios";
import {
  LoginFormState,
  RegisterFormState,
  UpdatePasswordFormData,
  UserInfoFormState,
} from "../lib/types";
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
  if (!token) return null;

  const user = JSON.parse(atob(token?.split(".")[1]));
  return user.user;
}

export const putUpdateUserInfo = async (
  userId: string,
  formData: UserInfoFormState
) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the JWT token from localStorage or any other storage
    const response = await axios.put(`${BASE_URL}/auth/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    console.log(response.data, ",,- respn dadta");
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
///////////////////////////
// * PUT  | Update Password
///////////////////////////
export const putUpdatePassword = async (
  formData: UpdatePasswordFormData,
  userId: string
) => {
  const url = `${BASE_URL}/auth/${userId}/update-password`;
  try {
    const response = await axios.put(url, formData);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with server to update password`);
    return err;
  }
};
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

///////////////////////////
// * PUT | Confirm Email Change
///////////////////////////
export const confirmEmailChange = async (
  userId: string,
  email: string,
  paramToken: string,
  password: string
) => {
  const params = {
    userId,
    email,
    password,
  };

  try {
    const response = await axios.put(
      `${BASE_URL}/auth/${userId}/confirm-email?token=${paramToken}`,
      params,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data; // Axios automatically parses JSON responses
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (err) {
    console.error(err);
    console.log(`Unable to communicate with backend to confirm email change`);
    return err;
  }
};

///////////////////////////
// ! DELETE | Delete User by Id
///////////////////////////

export const deleteUserById = async (userId: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(`${BASE_URL}/auth/${userId}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    console.log(response.data, " <-- response data ");
    localStorage.removeItem("token");
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const validateUserPassword = async (
  userId: string,
  password: string
) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${BASE_URL}/auth/${userId}/validate-user-password`,
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
