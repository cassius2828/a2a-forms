// Type for the Register Form State
export type RegisterFormState = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    password: string;
    confirmPassword: string;
  };
  
  // Type for the Login Form State
  export type LoginFormState = {
    email: string;
    password: string;
  };