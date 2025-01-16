import React, { useState, ReactNode, useEffect } from "react";
import { getUser } from "../services/authService";
import { SpotlightFormData, UserTokenData } from "../lib/types";
import { GlobalContext } from "./useGlobalContext";
// Define the shape of the context state
export interface GlobalContextType {
  formStep: number;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  spotlightFormData: typeof initialSpotlightFormData;
  setSpotlightFormData: React.Dispatch<
    React.SetStateAction<typeof initialSpotlightFormData>
  >;
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
  setUser: (
    data: UserTokenData
  ) => React.Dispatch<React.SetStateAction<UserTokenData>>;
}

// Initial form data structure
const initialSpotlightFormData = {
  name: "",
  sport: "",
  graduationYear: "",
  location: "",
  generalBio: "",
  actionBio: "",
  communityImpact: "",
  profileImage: null,
  actionImage1: null,
  actionImage2: null,
};

// Define a Provider component
interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [formStep, setFormStep] = useState<number>(1);
  const [spotlightFormData, setSpotlightFormData] = useState<SpotlightFormData>(
    initialSpotlightFormData
  );
  const [user, setUser] = useState(getUser());
  const handleInputChange = <T extends object>(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<T>>
  ) => {
    const { name, value } = e.target;

    // Log the value to the console for debugging purposes
    console.log(`Input name: ${name}, Input value: ${value}`);

    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setSpotlightFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  // Handle form reset
  const handleResetForm = () => {
    setSpotlightFormData(initialSpotlightFormData);
    setFormStep(1);
    scrollTo(0, 0);
  };
  const handleNextFormStep = () => {
    if (formStep < 3) {
      setFormStep((prev) => prev + 1);
    }
  };
  const handlePrevFormStep = () => {
    if (formStep > 1) {
      setFormStep((prev) => prev - 1);
    }
  };

  const signoutUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      setUser(null);
    }

    console.log(token);
    console.log(user);
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
