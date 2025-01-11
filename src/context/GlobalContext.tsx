import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getUser } from "../services/authService";
// Define the shape of the context state
interface GlobalContextType {
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

// Default context value
const defaultContextValue: GlobalContextType = {
  formStep: 1,
  setFormStep: () => {}, // Temporary placeholder, will be overwritten
  spotlightFormData: initialSpotlightFormData,
  setSpotlightFormData: () => {}, // Temporary placeholder, will be overwritten
  handleInputChange: () => {}, // Temporary placeholder
  handleFileChange: () => {}, // Temporary placeholder
  handleResetForm: () => {}, // Temporary placeholder
  handlePrevFormStep: () => {},
  handleNextFormStep: () => {},
};

// Create the context
const GlobalContext = createContext<GlobalContextType>(defaultContextValue);

// Define a Provider componentƒ
interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [formStep, setFormStep] = useState<number>(1);
  const [spotlightFormData, setSpotlightFormData] = useState(
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
  useEffect(() => {
    console.log(user, " <-- user");
  }, []);
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within an GlobalProvider");
  }
  return context;
};
