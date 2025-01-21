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
import { getAllUserTestimonials } from "../services/formService";

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
  // const { setError } = useGlobalContext();
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
      setError(err.error);
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

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setSpotlightFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
    console.log(spotlightFormData[name], " <-- file uploaded");
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
