import { ReactNode } from "react";

// Types for the Register Form State, Login Form State, User Token Data, and Spotlight Form Data
export type RegisterFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  password: string;
  confirmPassword: string;
};

export type LoginFormState = {
  email: string;
  password: string;
};

export type UserTokenData = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type SpotlightFormData = {
  firstName: string;
  lastName: string;
  sport: string;
  graduationYear: string;
  location: string;
  generalBio: string;
  actionBio: string;
  communityBio: string;
  profileImage?: File | null;
  actionImage1?: File | null;
  actionImage2?: File | null;
};

export interface ImageUploadsProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PhotoUpdateProps {
  handleAccept: (e: React.FormEvent | React.MouseEvent) => void;
  handleDecline: (e: React.FormEvent | React.MouseEvent) => void;
}

export interface TestimonialContextType {
  userTestimonials: TestimonialFormData[]; // Array of testimonials
  setUserTestimonials: React.Dispatch<
    React.SetStateAction<TestimonialFormData[]>
  >; // Function to update testimonials
  fetchUserTestimonialSubmissions: (userId: string) => Promise<void>; // Function to fetch testimonials
  error: string;
}

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
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  message: string;
  error: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  scrollToTop: (smooth: boolean) => void; // Added scrollToTop function
  userTestimonials: TestimonialDisplayData[]; // Array of testimonials
  setUserTestimonials: React.Dispatch<
    React.SetStateAction<TestimonialDisplayData[]>
  >; // Function to update testimonials
  fetchUserTestimonialSubmissions: (userId: string) => Promise<void>; // Function to fetch testimonials
}

// Define a Provider component
export interface GlobalProviderProps {
  children: ReactNode;
}

export type TestimonialFormData = {
  name: string;
  text: string;
};

export type TestimonialDisplayData = {
  name: string;
  text: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  id: string | number;
};
export type BackendDeleteResponseType = {
  message?: string;
  error?: string;
};
