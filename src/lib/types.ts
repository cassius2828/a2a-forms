import { ReactNode } from "react";

// Defines the response type for a backend delete request, which may return a success message or error
export type BackendDeleteResponseType = {
  message?: string;
  error?: string;
};

// Represents the props for the GlobalProvider component
export interface GlobalProviderProps {
  children: ReactNode; // Children components to be rendered within the provider
}

// Defines the shape of the Global Context state and its associated functions
export interface GlobalContextType {
  error: string; // Error message for the global state
  fetchUserTestimonialSubmissions: (userId: string) => Promise<void>; // Function to fetch user testimonial submissions
  formStep: number; // Current step in a multi-step form
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<
      React.SetStateAction<File | null | SpotlightFormData>
    >
  ) => void; // Handles file input changes for a state object with dynamic keys

  handleSingleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<File | null>>
  ) => void; // Handles a single file input change
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<any>>
  ) => void; // Handles text input changes
  handleNextFormStep: () => void; // Moves to the next form step
  handlePrevFormStep: () => void; // Moves to the previous form step
  handleResetForm: () => void; // Resets the form
  isLoading: boolean; // Loading state for the global context
  message: string; // Message for the global state
  scrollToTop: (smooth: boolean) => void; // Scrolls to the top of the page, optionally with smooth scrolling
  setError: React.Dispatch<React.SetStateAction<string>>; // Function to update the error state
  setFormStep: React.Dispatch<React.SetStateAction<number>>; // Function to update the form step
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>; // Function to update the loading state
  setMessage: React.Dispatch<React.SetStateAction<string>>; // Function to update the message state
  setSpotlightFormData: React.Dispatch<
    React.SetStateAction<SpotlightFormData | File | null>
  >; // Function to update spotlight form data or a single file
  setTestimonialForm: React.Dispatch<React.SetStateAction<TestimonialFormData>>; // Function to update testimonial form data
  setUser: React.Dispatch<React.SetStateAction<UserTokenData | null>>; // Function to update user data
  setUserTestimonials: React.Dispatch<
    React.SetStateAction<TestimonialDisplayData[]>
  >; // Function to update the user testimonials
  signoutUser: () => void; // Signs out the current user
  spotlightFormData: SpotlightFormData; // Data for the spotlight submission form
  testimonialForm: TestimonialFormData; // Data for the testimonial form
  user: UserTokenData | null; // Information about the currently signed-in user
  userTestimonials: TestimonialDisplayData[]; // Array of user testimonial data
}

export interface ImageUploadsProps {
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    // TODO: Find a better way to type bc this doesnt make that much sense to me, file vs the entire spotlight typing
    setState: React.Dispatch<
      React.SetStateAction<File | null | SpotlightFormData>
    >
  ) => void; // Handles multi-file input changes
}

// Defines props for photo update actions
export interface PhotoUpdateProps {
  handleAccept: (e: React.FormEvent | React.MouseEvent) => void; // Accepts the photo update
  handleDecline: (e: React.FormEvent | React.MouseEvent) => void; // Declines the photo update
}

// Represents the login form's state structure
export type LoginFormState = {
  email: string; // Email entered by the user
  password: string; // Password entered by the user
};

// Represents the user information form's state structure
export type UserInfoFormState = {
  firstName: string; // First name of the user
  lastName: string; // Last name of the user
  email: string; // Email address of the user
  avatar?: File | null | string; // profile pic of the user
  phone: string | number | readonly string[] | undefined; // Phone number of the user
};

// Represents the data structure for a register form's state
export type RegisterFormState = {
  confirmPassword: string; // Confirmation of the user's password
  email: string; // Email entered by the user
  firstName: string; // First name entered by the user
  lastName: string; // Last name entered by the user
  password: string; // Password entered by the user
  phone: string | null; // Phone number entered by the user
};

// Represents the data structure for a spotlight form submission
export type SpotlightFormData = {
  actionBio: string; // Bio describing the user's actions
  actionImage1?: File | null; // First action image
  actionImage2?: File | null; // Second action image
  communityBio: string; // Bio about the user's community involvement
  firstName: string; // First name of the user
  generalBio: string; // General bio about the user
  graduationYear: string; // User's graduation year
  lastName: string; // Last name of the user
  location: string; // User's location
  profileImage?: File | null; // Profile image of the user
  sport: string; // Sport played by the user
};

// Represents the data structure for testimonial form input
export type TestimonialFormData = {
  name: string; // Name of the person submitting the testimonial
  text: string; // Testimonial text
};

// Represents the data structure for a testimonial display entry
export type TestimonialDisplayData = {
  createdAt: string; // Timestamp when the testimonial was created
  id: string | number; // Unique identifier for the testimonial
  name: string; // Name of the person who submitted the testimonial
  status: "pending" | "approved" | "rejected"; // Status of the testimonial
  text: string; // Testimonial text
};

// Represents the data structure for a user's token data
export type UserTokenData = {
  avatar: string; // URL or path to the user's avatar
  createdAt: string; // Timestamp when the user was created
  email: string; // User's email address
  first_name: string; // User's first name
  id: string; // Unique identifier for the user
  last_name: string; // User's last name
  phone: string | null; // User's phone number
  role: string; // User's role in the application
  updatedAt: string; // Timestamp when the user was last updated
};
// Represents keys for nav menu
export type NavigationMenu = {
  name: string;
  href: string;
  current?: boolean;
  condition?: boolean; // Optional condition for rendering
  action?: () => void; // Optional action for custom behavior
};

// Represents keys for user nav menu
export type UserNavigationMenu = {
  name: string;
  href: string;
};
