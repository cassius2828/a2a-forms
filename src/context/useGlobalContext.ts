import { createContext, useContext } from "react";
import { GlobalContextType } from "./GlobalContext";

export const GlobalContext = createContext<GlobalContextType | null>(null);

// Custom hook to use the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within an GlobalProvider");
  }
  return context;
};
