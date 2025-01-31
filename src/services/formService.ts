import axios from "axios";
import { SpotlightFormData, TestimonialFormData } from "../lib/types";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const SPOTLIGHT_BASE_URL = BASE_URL + "/forms/spotlights";
const TESTIMONIALS_BASE_URL = BASE_URL + "/forms/testimonials";

///////////////////////////
// Athlete Spotlights
///////////////////////////
export const postAddSpotlight = async (
  userId: string,
  formData: SpotlightFormData
) => {
  try {
    const response = await axios.post(
      `${SPOTLIGHT_BASE_URL}/${userId}`,
      formData
    );
    return response.data;
  } catch (err) {
    console.error(err);
    console.log("Failed to create a new athlete spotlight.");
    throw err;
  }
};

export const putUpdateSpotlight = async (
  userId: string,
  formData: SpotlightFormData
) => {
  console.log("running update spotlight");
  try {
    const response = await axios.put(
      `${SPOTLIGHT_BASE_URL}/${userId}`,
      formData
    );
    console.log(response.data, " <-- response data");
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Failed to update athlete spotlight for user ID: ${userId}`);
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
    console.log(`Failed to change spotlight status to ${status}`);
    throw err;
  }
};

export const deleteSpotlight = async (id: string | null) => {
  try {
    const response = await axios.delete(`${SPOTLIGHT_BASE_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Failed to remove athlete spotlight for user ID: ${id}`);
    throw err;
  }
};

export const getAllSpotlights = async () => {
  try {
    const response = await axios.get(`${SPOTLIGHT_BASE_URL}`);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log("Failed to fetch all athlete spotlights.");
    throw err;
  }
};

export const getSpotlightByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${SPOTLIGHT_BASE_URL}/${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log("Failed to get spotlight with an id of: ", userId);
    throw err;
  }
};

export const getSpotlightBySpotlightId = async (spotlightId: string) => {
  try {
    const response = await axios.get(`${SPOTLIGHT_BASE_URL}/${spotlightId}/spotlight-id`);
    console.log(response.data)
    return response.data;
  } catch (err) {
    console.error(err);
    console.log("Failed to get spotlight with an id of: ", spotlightId);
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
    console.log(`Failed to fetch ${status} athlete spotlights.`);
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
    console.log("Failed to create a new client Testimonial.");
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
    console.log(`Failed to update testimonial with an id of ${id}`);
    throw err;
  }
};

export const deleteTestimonial = async (id: string | null) => {
  try {
    const response = await axios.delete(`${TESTIMONIALS_BASE_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Failed to remove athlete Testimonial with an id of: ${id}`);
    throw err;
  }
};

export const getAllTestimonials = async () => {
  try {
    const response = await axios.get(`${TESTIMONIALS_BASE_URL}`);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log("Failed to fetch all athlete Testimonials.");
    throw err;
  }
};

export const getApprovedTestimonials = async () => {
  try {
    const response = await axios.get(`${TESTIMONIALS_BASE_URL}/approved`);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log("Failed to fetch approved athlete spotlights.");
    throw err;
  }
};

export const getAllUserTestimonials = async (userId: string) => {
  try {
    const response = await axios.get(`${TESTIMONIALS_BASE_URL}/${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log("Failed to fetch all user testimonials.");
    throw err;
  }
};

export const getSingleTestimonial = async (id: string) => {
  try {
    const response = await axios.get(`${TESTIMONIALS_BASE_URL}/single/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log("Failed to fetch targeted user testimonials.");
    throw err;
  }
};

export const putChangeTestimonialStatus = async (
  id: string,
  status: string,
  adminComment?: string
) => {
  try {
    console.log(adminComment)
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
    console.log(`Failed to change testimonial status to ${status}`);
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
    console.log(
      `Failed to fetch ${status} athlete Testimonials.\n ERROR: ${err}`
    );
    return err;
  }
};
