import { ReactElement, ReactNode } from "react";

// ✅ Backend Response Types
// Represents the response type for a backend delete request
export type BackendDeleteResponseType = {
  message?: string;
  error?: string;
};

// ✅ Authentication & User Data Types
// Represents the login form's state structure
export type LoginFormState = {
  email: string;
  password: string;
};

// Represents the user information form's state structure
export type UserInfoFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | number | readonly string[] | undefined;
  avatar?: File | null | string;
  removeAvatar?: boolean;
};

// Represents the data structure for a register form's state
export type RegisterFormState = {
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string | null;
};

// Represents the data structure for a user's token data
export type UserTokenData = {
  avatar: string;
  createdAt: string;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  phone: string | null;
  role: string;
  updatedAt: string;
};

// Represents the update password form data
export type UpdatePasswordFormData = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

// ✅ Spotlight Form & Submission Data
// Represents the data structure for a spotlight form submission
export type SpotlightFormData = {
  firstName: string;
  lastName: string;
  sport: string;
  location: string;
  graduationYear: number | null;
  actionBio: string;
  generalBio: string;
  communityBio: string;
  profileImage?: File | null;
  actionImage1?: File | null;
  actionImage2?: File | null;
};

// Represents the data structure for a spotlight form submission from the server
export type SpotlightFormDataFromServer = {
  first_name: string;
  last_name: string;
  sport: string;
  location: string;
  grad_year: number | null;
  action_bio: string;
  general_bio: string;
  community_bio: string;
  profile_image?: string | null;
  action_image_1?: string | null;
  action_image_2?: string | null;
  admin_comment?: string;
  status: StatusType;
};

// Represents the athlete spotlight submission
export type AthleteSpotlightSubmission = {
  id: string;
  href: string;
  sport: string;
  status: StatusType;
  first_name: string;
  last_name: string;
  grad_year: string | number;
  createdAt: string;
};

// Represents the athlete spotlight submission display data
export type AthleteSpotlightSubmissionDisplay = {
  id: string;
  title: string;
  status: StatusType;
  date: string;
  type: string;
  admin_comment: string;
};

// ✅ Testimonial Form & Submission Data
// Represents the data structure for testimonial form input
export type TestimonialFormData = {
  name: string;
  text: string;
};

// Represents the data structure for a testimonial display entry
export type TestimonialDisplayData = {
  createdAt: string;
  id: string | number;
  name: string;
  status: StatusType;
  text: string;
  admin_comment: string;
};

// Represents a testimonial submission
export type TestimonialSubmission = {
  id: string;
  href: string;
  status: StatusType;
  name: string;
  createdAt: string;
};

// Represents the data structure for testimonial management view
export type TestimonialDataManageView = {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  text: string;
  admin_comment?: string;
};

// ✅ Context & Provider Types
// Represents the props for the GlobalProvider component
export interface GlobalProviderProps {
  children: ReactNode;
}

// Defines the shape of the Global Context state and its associated functions
export interface GlobalContextType {
  error: string;
  fetchUserTestimonialSubmissions: (userId: string) => Promise<void>;
  formStep: number;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<
      React.SetStateAction<File | null | SpotlightFormData>
    >
  ) => void;
  handleSingleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<File | null>>
  ) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<any>>
  ) => void;
  handleNextFormStep: () => void;
  handlePrevFormStep: () => void;
  handleResetForm: () => void;
  isLoading: boolean;
  message: string;
  scrollToTop: (smooth: boolean) => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSpotlightFormData: React.Dispatch<
    React.SetStateAction<SpotlightFormData | File | null>
  >;
  setTestimonialForm: React.Dispatch<React.SetStateAction<TestimonialFormData>>;
  setUser: React.Dispatch<React.SetStateAction<UserTokenData | null>>;
  setUserTestimonials: React.Dispatch<
    React.SetStateAction<TestimonialDisplayData[]>
  >;
  signoutUser: () => void;
  spotlightFormData: SpotlightFormData;
  testimonialForm: TestimonialFormData;
  user: UserTokenData | null;
  userTestimonials: TestimonialDisplayData[];
}

// ✅ Component Props
// Defines props for image uploads
export interface ImageUploadsProps {
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<
      React.SetStateAction<File | null | SpotlightFormData>
    >
  ) => void;
}

// Defines props for photo update actions
export interface PhotoUpdateProps {
  handleAccept: (e: React.FormEvent | React.MouseEvent) => void;
  handleDecline: (e: React.FormEvent | React.MouseEvent) => void;
}

// Represents props for the coming soon component
export interface ComingSoonProps {
  title?: string;
  text?: string;
}

// ✅ Navigation & Sidebar Types
// Represents the keys for the navigation menu
export type NavigationMenu = {
  name: string;
  href: string;
  current?: boolean;
  condition?: boolean;
  action?: () => void;
};

// Represents keys for user navigation menu
export type UserNavigationMenu = {
  name: string;
  href: string;
};

// Represents the keys for the sidebar navigation menu
export type SideBarNavMenu = {
  name: string;
  href: string;
  current?: boolean;
  icon: (props: React.SVGProps<SVGSVGElement>) => ReactElement;
};

// ✅ Other Utility Types
// Represents the status type used across submissions
export type StatusType = "pending" | "approved" | "rejected";
