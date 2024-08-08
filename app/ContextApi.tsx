"use client";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

//Define the shape of the sidebar menu
interface SideBarMenuItem {
  id: number;
  name: string;
  isSelected: boolean;
  icon: React.ReactNode;
}

//Define the shape of the dark mode menu
export interface DarkModeItem {
  id: number;
  name: string;
  isSelected: boolean;
  icon: React.ReactNode;
}

// Define the shape of the context state
interface AppState {
  hideSideBarObject: {
    hideSideBar: boolean | null;
    setHideSideBar: React.Dispatch<React.SetStateAction<boolean | null>>;
  };
  sideBarMenuItemsObject: {
    sideBarMenuItems: SideBarMenuItem[];
    setSideBarMenuItems: React.Dispatch<
      React.SetStateAction<SideBarMenuItem[]>
    >;
  };
  darkModeObject: {
    darkMode: DarkModeItem[] | null;
    setDarkMode: React.Dispatch<React.SetStateAction<DarkModeItem[] | null>>;
  };
  isMobileViewObject: {
    isMobileView: boolean;
    setIsMobileView: React.Dispatch<React.SetStateAction<boolean>>;
  };

  openSideBarObject: {
    openSideBar: boolean;
    setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

// Create a default state
const defaultState: AppState = {
  hideSideBarObject: {
    hideSideBar: null,
    setHideSideBar: () => {},
  },

  sideBarMenuItemsObject: {
    sideBarMenuItems: [],
    setSideBarMenuItems: () => {},
  },
  darkModeObject: {
    darkMode: null,
    setDarkMode: () => {},
  },

  isMobileViewObject: {
    isMobileView: false,
    setIsMobileView: () => {},
  },

  openSideBarObject: {
    openSideBar: false,
    setOpenSideBar: () => {},
  },
};

// Create the context with default values
const AppContext = createContext<AppState>(defaultState);

// Create a provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  //ALL VARIABLES
  //-------------

  //HideSideBar variable
  const [hideSideBar, setHideSideBar] = useState<boolean | null>(null);
  //Sidebar menu items variable
  const [sideBarMenuItems, setSideBarMenuItems] = useState<SideBarMenuItem[]>([
    {
      id: 1,
      name: "Home",
      icon: <HomeRoundedIcon sx={{ fontSize: 20 }} />,
      isSelected: true,
    },
    {
      id: 2,
      name: "Challenges",
      icon: <FlagRoundedIcon sx={{ fontSize: 20 }} />,
      isSelected: false,
    },
    {
      id: 3,
      name: "Rewards",
      icon: <EmojiEventsRoundedIcon sx={{ fontSize: 20 }} />,
      isSelected: false,
    },
  ]);
  //Dark mode variable
  const [darkMode, setDarkMode] = useState<DarkModeItem[] | null>(null);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  //Update the window size
  useEffect(() => {
    function handleResize() {
      setIsMobileView(window.innerWidth <= 640);
      setOpenSideBar(false);
    }

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //This useEffect
  useEffect(() => {
    //1- Get the value of is isSideBarHided
    const getIsSideBarHidedValue =
      window.localStorage.getItem("isSideBarHided");

    if (getIsSideBarHidedValue !== null && isMobileView === false) {
      if (getIsSideBarHidedValue === "true") {
        setHideSideBar(true);
      }

      if (getIsSideBarHidedValue === "false") {
        setHideSideBar(false);
      }
    }
  }, [isMobileView]);

  //Intialize the hidesidebar state from the local storage from the
  //the isSideBarHided key if it is not null, otherwise it is going to be false
  useEffect(() => {
    const savedValue = window.localStorage.getItem("isSideBarHided");
    setHideSideBar(savedValue !== null ? JSON.parse(savedValue) : false);
  }, []);

  //Every time that the hidesidebar state changes, update the key in
  // the local storage. To avoid storing null value, we are going to
  //do this only if the hideSidebar is boolean

  useEffect(() => {
    if (typeof hideSideBar === "boolean") {
      //Only update the local storage when the isMobileView is false
      if (isMobileView === false) {
        window.localStorage.setItem(
          "isSideBarHided",
          JSON.stringify(hideSideBar)
        );
      }
    }
  }, [hideSideBar]);

  //Intialize the dakMode state from the local storage from the
  //the isSideBarHided key if it is not null, otherwise it is going to be false
  useEffect(() => {
    const darkModeMenu: DarkModeItem[] = [
      {
        id: 1,
        name: "Light",
        isSelected: true,
        icon: <LightModeIcon fontSize="small" sx={{ fontSize: "12" }} />,
      },
      {
        id: 2,
        name: "Dark",
        isSelected: false,
        icon: <DarkModeIcon fontSize="small" sx={{ fontSize: "12" }} />,
      },
    ];

    const savedValue = window.localStorage.getItem("isDarkMode");

    if (savedValue !== null) {
      const darkModeMenuUpdate: DarkModeItem[] = darkModeMenu.map(
        (DarkModeItem) => {
          if (DarkModeItem.name === "Light") {
            return { ...DarkModeItem, isSelected: savedValue !== "true" };
          } else if (DarkModeItem.name === "Dark") {
            return { ...DarkModeItem, isSelected: savedValue === "true" };
          }
          return { ...DarkModeItem };
        }
      );
      console.log("darkModeMenuUpdate");

      setDarkMode(darkModeMenuUpdate);
    } else {
      setDarkMode(darkModeMenu);
    }
  }, []);

  //Save the isDarkMode value in the local storage
  useEffect(() => {
    if (Array.isArray(darkMode) && darkMode !== null) {
      console.log(darkMode);
      const selectedDarkMode = darkMode?.find(
        (darkModeItem) =>
          darkModeItem.isSelected && darkModeItem.name === "Dark"
      );

      if (selectedDarkMode) {
        window.localStorage.setItem("isDarkMode", "true");
      } else {
        window.localStorage.setItem("isDarkMode", "false");
      }
    }
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
        hideSideBarObject: { hideSideBar, setHideSideBar },
        sideBarMenuItemsObject: { sideBarMenuItems, setSideBarMenuItems },
        darkModeObject: { darkMode, setDarkMode },
        isMobileViewObject: { isMobileView, setIsMobileView },
        openSideBarObject: { openSideBar, setOpenSideBar },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);
