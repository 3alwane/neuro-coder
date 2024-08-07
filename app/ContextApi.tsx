"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";

// Define the shape of the context state
interface AppState {
  hideSideBarObject: {
    hideSideBar: boolean;
    setHideSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

// Create a default state
const defaultState: AppState = {
  hideSideBarObject: {
    hideSideBar: false,
    setHideSideBar: () => {},
  },
};

// Create the context with default values
const AppContext = createContext<AppState>(defaultState);

// Create a provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [hideSideBar, setHideSideBar] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        hideSideBarObject: { hideSideBar, setHideSideBar },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);
