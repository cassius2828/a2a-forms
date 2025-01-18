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

export type TestimonialFormData = {
  name: string;
  text: string;
};
