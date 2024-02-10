import React, {createContext, useContext} from "react";
import {UserType} from "../models/User";

// Define the shape of the context data
interface UserContextType {
  user: UserType;
  users: UserType[];
  getUser: () => void;
  getAllUsers: () => void;
}

// Create the context
export const UserContext = createContext<UserContextType>({
  user: {} as UserType,
  users: [] as UserType[],
  getUser: () => {},
  getAllUsers: () => {},
});

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
