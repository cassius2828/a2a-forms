import React, { useState, ReactNode, useEffect } from "react";
import { getUser } from "../services/authService";
import { SpotlightFormData, UserTokenData } from "../lib/types";
import { GlobalContext } from "./useGlobalContext";

// Define the shape of the context state
export interface GlobalContextType {
  formStep: number;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  spotlightFormData: SpotlightFormData;
  setSpotlightFormData: React.Dispatch<React.SetStateAction<SpotlightFormData>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<any>>
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetForm: () => void;
  handlePrevFormStep: () => void;
  handleNextFormStep: () => void;
  signoutUser: () => void;
  user: UserTokenData | null;
  setUser: React.Dispatch<React.SetStateAction<UserTokenData | null>>;
  formMessage: string;
  formError: string;
  setFormMessage: React.Dispatch<React.SetStateAction<string>>;
  setFormError: React.Dispatch<React.SetStateAction<string>>;
}

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

// Define a Provider component
interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  // State Hooks with explicit types
  const [formStep, setFormStep] = useState<number>(1);
  const [formMessage, setFormMessage] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [spotlightFormData, setSpotlightFormData] = useState<SpotlightFormData>(
    initialSpotlightFormData
  );
  const [user, setUser] = useState<UserTokenData | null>(getUser());

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
    console.log(name, spotlightFormData[name])
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

  return (
    <GlobalContext.Provider
      value={{
        formStep,
        setFormStep,
        spotlightFormData,
        setSpotlightFormData,
        handleInputChange,
        handleFileChange,
        handleResetForm,
        handleNextFormStep,
        handlePrevFormStep,
        signoutUser,
        user,
        setUser,
        formMessage,
        formError,
        setFormMessage,
        setFormError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
