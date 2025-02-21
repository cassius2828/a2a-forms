import axios from "axios";
import { TestimonialFormData } from "../lib/types";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const SPOTLIGHT_BASE_URL = BASE_URL + "/forms/spotlights";
const TESTIMONIALS_BASE_URL = BASE_URL + "/forms/testimonials";

///////////////////////////
// Athlete Spotlights
///////////////////////////
export const postAddSpotlight = async (userId: string, formData: FormData) => {
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
  try {
    const response = await axios.post(
      `${SPOTLIGHT_BASE_URL}/${userId}`,
      formData
    );

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const putUpdateSpotlight = async (
  userId: string,
  formData: FormData
) => {
  try {
    const response = await axios.put(
      `${SPOTLIGHT_BASE_URL}/${userId}`,
      formData
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const putChangeSpotlightStatus = async (
  id: string,
  status: string,
  adminComment?: string
) => {
  try {
    const response = await axios.put(
      `${SPOTLIGHT_BASE_URL}/${id}/status`,
      {
        status,
        adminComment,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteSpotlight = async (id: string | null) => {
  try {
    const response = await axios.delete(`${SPOTLIGHT_BASE_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllSpotlights = async () => {
  try {
    const response = await axios.get(`${SPOTLIGHT_BASE_URL}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSpotlightByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${SPOTLIGHT_BASE_URL}/${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSpotlightBySpotlightId = async (spotlightId: string) => {
  try {
    const response = await axios.get(
      `${SPOTLIGHT_BASE_URL}/${spotlightId}/spotlight-id`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSpotlightSubmissionsByStatus = async (status: string) => {
  try {
    const response = await axios.get(
      `${SPOTLIGHT_BASE_URL}/status?status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const getApprovedSpotlights = async () => {
  try {
    const response = await axios.get(`${SPOTLIGHT_BASE_URL}/approved`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
///////////////////////////
// Testimonials
///////////////////////////

export const postAddTestimonial = async (
  formData: TestimonialFormData,
  userId: string | undefined
) => {
  try {
    const response = await axios.post(
      `${TESTIMONIALS_BASE_URL}?userId=${userId || ""}`,
      formData
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const putUpdateTestimonial = async (
  formData: TestimonialFormData,
  id: string
) => {
  try {
    const response = await axios.put(
      `${TESTIMONIALS_BASE_URL}/${id}`,
      formData
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteTestimonial = async (id: string | null) => {
  try {
    const response = await axios.delete(`${TESTIMONIALS_BASE_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllTestimonials = async () => {
  try {
    const response = await axios.get(`${TESTIMONIALS_BASE_URL}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getApprovedTestimonials = async () => {
  try {
    const response = await axios.get(`${TESTIMONIALS_BASE_URL}/approved`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllUserTestimonials = async (userId: string) => {
  try {
    const response = await axios.get(`${TESTIMONIALS_BASE_URL}/${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSingleTestimonial = async (id: string) => {
  try {
    const response = await axios.get(`${TESTIMONIALS_BASE_URL}/single/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const putChangeTestimonialStatus = async (
  id: string,
  status: string,
  adminComment?: string
) => {
  try {
    const response = await axios.put(
      `${TESTIMONIALS_BASE_URL}/${id}/status`,
      {
        status,
        adminComment,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getTestimonialSubmissionsByStatus = async (status: string) => {
  try {
    const response = await axios.get(
      `${TESTIMONIALS_BASE_URL}/status?status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
