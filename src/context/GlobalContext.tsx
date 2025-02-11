import React, { useState, useEffect } from "react";
import { getUser } from "../services/authService";
import {
  GlobalProviderProps,
  SpotlightFormData,
  TestimonialDisplayData,
  TestimonialFormData,
  UserTokenData,
} from "../lib/types";
import { GlobalContext } from "./useGlobalContext";
import {
  getAllUserTestimonials,
  putChangeSpotlightStatus,
  putChangeTestimonialStatus,
} from "../services/formService";

// Initial form data structure
const initialSpotlightFormData: SpotlightFormData = {
  firstName: "",
  lastName: "",
  sport: "",
  graduationYear: "",
  location: "",
  generalBio: "",
  actionBio: "",
  communityBio: "",
  profileImage: null,
  actionImage1: null,
  actionImage2: null,
};
const initialTestimonialFormState: TestimonialFormData = {
  text: "",
  name: "",
};
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  // State Hooks with explicit types
  const [formStep, setFormStep] = useState<number>(1);
  const [testimonialForm, setTestimonialForm] = useState<TestimonialFormData>(
    initialTestimonialFormState
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [spotlightFormData, setSpotlightFormData] = useState<SpotlightFormData>(
    initialSpotlightFormData
  );
  const [user, setUser] = useState<UserTokenData | null>(getUser());
  const [userTestimonials, setUserTestimonials] = useState<
    TestimonialDisplayData[]
  >([]);

  const fetchUserTestimonialSubmissions = async (userId: string) => {
    try {
      const data = await getAllUserTestimonials(userId);
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setUserTestimonials(data);
      }
    } catch (err) {
      console.error(err);
      setError("Error: Unable to get user testimonials");
    }
  };

  // Handle input changes and update state dynamically
  const handleInputChange = <T extends object>(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<T>>
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(name, value);
  };

  // Handle multiple file input changes
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<
      React.SetStateAction<(SpotlightFormData)[]>
    >
  ) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0]; // Retrieve the first file
      setState((prevState) => ({
        ...prevState,
        [name]: file, // Dynamically set the file in the state
      }));
    }
  };
  // handle single file change
  const handleSingleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0]; // Access the first file in the list
    if (file) {
      setFile(file);
      console.log(
        "Selected file:",
        file instanceof File ? file : "Not a valid File"
      );
    } else {
      console.error("No file selected");
      setFile(null);
    }
  };

  // Reset the form and scroll to the top
  const handleResetForm = () => {
    setSpotlightFormData(initialSpotlightFormData);
    setFormStep(1);
    window.scrollTo(0, 0);
  };

  // Navigate to the next step
  const handleNextFormStep = () => {
    if (formStep < 3) {
      setFormStep((prev) => prev + 1);
    }
  };

  // Navigate to the previous step
  const handlePrevFormStep = () => {
    if (formStep > 1) {
      setFormStep((prev) => prev - 1);
    }
  };

  // Sign out user and remove token
  const signoutUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  // admin actions on spotlights
  const handleRejectSpotlight = async (id: string, adminComment?: string) => {
    setIsLoading(true);
    if (id) {
      try {
        const data = await putChangeSpotlightStatus(
          id,
          "rejected",
          adminComment
        );
        if (data.error) {
          setError(data.error);
        } else {
          setMessage(data.message);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to change testimonial status to rejected");
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleApproveSpotlight = async (id: string, adminComment?: string) => {
    console.log(id, " <-- id");
    console.log(adminComment, " <-- hat");
    setIsLoading(true);
    if (id) {
      try {
        const data = await putChangeSpotlightStatus(
          id,
          "approved",
          adminComment
        );
        if (data.error) {
          setError(data.error);
        } else {
          setMessage(data.message);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to change Spotlight status to approved");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // admin actions on testimonials
  const handleRejectTestimonial = async (id: string, adminComment?: string) => {
    setIsLoading(true);
    if (id) {
      try {
        const data = await putChangeTestimonialStatus(
          id,
          "rejected",
          adminComment
        );
        if (data.error) {
          setError(data.error);
        } else {
          setMessage(data.message);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to change testimonial status to rejected");
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleApproveTestimonial = async (
    id: string,
    adminComment?: string
  ) => {
    console.log(id, " <-- id");
    console.log(adminComment, " <-- hat");
    setIsLoading(true);
    if (id) {
      try {
        const data = await putChangeTestimonialStatus(
          id,
          "approved",
          adminComment
        );
        if (data.error) {
          setError(data.error);
        } else {
          setMessage(data.message);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to change testimonial status to approved");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCloseModalAndNavigate = (fn?: () => void) => {
    if (message) setMessage("");
    if (error) setError("");
    if (fn) fn();
  };

  useEffect(() => {
    getUser();
  }, [user]);

  const scrollToTop = (smooth: boolean) => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        error,
        fetchUserTestimonialSubmissions,
        formStep,
        handleFileChange,
        handleSingleFileChange,
        handleInputChange,
        handleNextFormStep,
        handlePrevFormStep,
        handleResetForm,
        isLoading,
        message,
        scrollToTop,
        setError,
        setFormStep,
        setIsLoading,
        setMessage,
        setSpotlightFormData,
        setUserTestimonials,
        setUser,
        signoutUser,
        spotlightFormData,
        user,
        userTestimonials,
        testimonialForm,
        setTestimonialForm,
        handleRejectTestimonial,
        handleApproveTestimonial,
        handleCloseModalAndNavigate,
        handleApproveSpotlight,
        handleRejectSpotlight,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
