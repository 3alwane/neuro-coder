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
import ContentArea from "./Components/ContentArea";
import ChallengesArea from "./ChallengesArea";
import AchievementsArea from "./AchievementsArea";

//Define the shape of the sidebar menu
interface SideBarMenuItem {
  id: number;
  name: string;
  isSelected: boolean;
  icon: React.ReactNode;
  component: React.ReactNode;
}

//Define the shape of the dark mode menu
export interface DarkModeItem {
  id: number;
  name: string;
  isSelected: boolean;
  icon: React.ReactNode;
}

interface DifficultyDropDownPosition {
  left: number;
  top: number;
}

export interface DifficultyChoice {
  id: number;
  title: string;
  isSelected: boolean;
  textColor: string;
}

export interface LanguageItem {
  id: number;
  name: string;
  isSelected: boolean;
}

export interface StatusItem {
  id: number;
  name: string;
  isSelected: boolean;
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
  difficultyDropDownObject: {
    difficultyDropDownPositions: DifficultyDropDownPosition;
    setDifficultyDropDownPositions: React.Dispatch<
      React.SetStateAction<DifficultyDropDownPosition>
    >;
  };

  languagesDropDownPositionsObject: {
    languagesDropDownPositions: DifficultyDropDownPosition;
    setLanguagesDropDownPositions: React.Dispatch<
      React.SetStateAction<DifficultyDropDownPosition>
    >;
  };

  difficultyChoicesObject: {
    difficultyChoices: DifficultyChoice[];
    setDifficultyChoices: React.Dispatch<
      React.SetStateAction<DifficultyChoice[]>
    >;
  };

  languagesArrayObject: {
    languagesArray: LanguageItem[];
    setLanguagesArray: React.Dispatch<React.SetStateAction<LanguageItem[]>>;
  };
  statusArrayObject: {
    statusArray: StatusItem[];
    setStatusArray: React.Dispatch<React.SetStateAction<StatusItem[]>>;
  };

  statusDropDownPositionsObject: {
    statusDropDownPositions: DifficultyDropDownPosition;
    setStatusDropDownPositions: React.Dispatch<
      React.SetStateAction<DifficultyDropDownPosition>
    >;
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
  difficultyDropDownObject: {
    difficultyDropDownPositions: { left: 0, top: 0 },
    setDifficultyDropDownPositions: () => {},
  },

  languagesDropDownPositionsObject: {
    languagesDropDownPositions: { left: 0, top: 0 },
    setLanguagesDropDownPositions: () => {},
  },

  difficultyChoicesObject: {
    difficultyChoices: [],
    setDifficultyChoices: () => {},
  },
  languagesArrayObject: {
    languagesArray: [],
    setLanguagesArray: () => {},
  },
  statusArrayObject: {
    statusArray: [],
    setStatusArray: () => {},
  },
  statusDropDownPositionsObject: {
    statusDropDownPositions: { left: 0, top: 0 },
    setStatusDropDownPositions: () => {},
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
      isSelected: false,
      component: <ContentArea />,
    },
    {
      id: 2,
      name: "Challenges",
      icon: <FlagRoundedIcon sx={{ fontSize: 20 }} />,
      isSelected: true,
      component: <ChallengesArea />,
    },
    {
      id: 3,
      name: "Rewards",
      icon: <EmojiEventsRoundedIcon sx={{ fontSize: 20 }} />,
      isSelected: false,
      component: <AchievementsArea />,
    },
  ]);
  //Dark mode variable
  const [darkMode, setDarkMode] = useState<DarkModeItem[] | null>(null);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const [openLanguageDropDown, setOpenLanguageDropDown] =
    useState<boolean>(false);
  const [difficultyDropDownPositions, setDifficultyDropDownPositions] =
    useState({
      left: 0,
      top: 0,
    });

  const [difficultyChoices, setDifficultyChoices] = useState([
    { id: 1, title: "Easy", isSelected: true, textColor: "text-green-600" },
    { id: 2, title: "Medium", isSelected: false, textColor: "text-yellow-500" },
    { id: 3, title: "Hard", isSelected: false, textColor: "text-red-500" },
  ]);

  //Array of languages
  const [languagesArray, setLanguagesArray] = useState([
    { id: 1, name: "Javascript", isSelected: true },
    { id: 2, name: "Python", isSelected: false },
    { id: 3, name: "Go", isSelected: false },
  ]);

  const [statusArray, setStatusArray] = useState([
    { id: 1, name: "Solved", isSelected: true },
    { id: 2, name: "Unsolved", isSelected: false },
  ]);

  const [languagesDropDownPositions, setLanguagesDropDownPositions] = useState({
    left: 0,
    top: 0,
  });
  const [statusDropDownPositions, setStatusDropDownPositions] = useState({
    left: 0,
    top: 0,
  });

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

  useEffect(() => {
    setOpenSideBar(false);
  }, [sideBarMenuItems]);

  return (
    <AppContext.Provider
      value={{
        hideSideBarObject: { hideSideBar, setHideSideBar },
        sideBarMenuItemsObject: { sideBarMenuItems, setSideBarMenuItems },
        darkModeObject: { darkMode, setDarkMode },
        isMobileViewObject: { isMobileView, setIsMobileView },
        openSideBarObject: { openSideBar, setOpenSideBar },
        difficultyDropDownObject: {
          difficultyDropDownPositions,
          setDifficultyDropDownPositions,
        },
        difficultyChoicesObject: { difficultyChoices, setDifficultyChoices },
        languagesArrayObject: { languagesArray, setLanguagesArray },
        languagesDropDownPositionsObject: {
          languagesDropDownPositions,
          setLanguagesDropDownPositions,
        },
        statusArrayObject: { statusArray, setStatusArray },
        statusDropDownPositionsObject: {
          statusDropDownPositions,
          setStatusDropDownPositions,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);
