import axios from "axios";
import { SpotlightFormData } from "../lib/types";
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
  try {
    const response = await axios.put(
      `${SPOTLIGHT_BASE_URL}/${userId}`,
      formData
    );
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Failed to update athlete spotlight for user ID: ${userId}`);
    throw err;
  }
};

export const deleteRemoveSpotlight = async (userId) => {
  try {
    const response = await axios.delete(`${SPOTLIGHT_BASE_URL}/${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Failed to remove athlete spotlight for user ID: ${userId}`);
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

export const getApprovedSpotlights = async () => {
  try {
    const response = await axios.get(`${SPOTLIGHT_BASE_URL}/approved`);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log("Failed to fetch approved athlete spotlights.");
    throw err;
  }
};

///////////////////////////
// Testimonials
///////////////////////////

export const postAddTestimonial = async (formData) => {
  try {
    const response = await axios.post(`${TESTIMONIALS_BASE_URL}`, formData);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log("Failed to create a new athlete Testimonial.");
    throw err;
  }
};

export const putUpdateTestimonial = async (formData, userId) => {
  try {
    const response = await axios.put(
      `${TESTIMONIALS_BASE_URL}/${userId}`,
      formData
    );
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Failed to update athlete Testimonial for user ID: ${userId}`);
    throw err;
  }
};

export const deleteRemoveTestimonial = async (userId) => {
  try {
    const response = await axios.delete(`${TESTIMONIALS_BASE_URL}/${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    console.log(`Failed to remove athlete Testimonial for user ID: ${userId}`);
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
