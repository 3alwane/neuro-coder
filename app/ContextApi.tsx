'use client';
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';

//Define the shape of the sidebar menu
interface SideBarMenuItem {
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
    darkMode: boolean | null;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean | null>>;
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
      name: 'Home',
      icon: <HomeRoundedIcon sx={{ fontSize: 20 }} />,
      isSelected: true,
    },
    {
      id: 2,
      name: 'Challenges',
      icon: <FlagRoundedIcon sx={{ fontSize: 20 }} />,
      isSelected: false,
    },
    {
      id: 3,
      name: 'Rewards',
      icon: <EmojiEventsRoundedIcon sx={{ fontSize: 20 }} />,
      isSelected: false,
    },
  ]);
  //Dark mode variable
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  //Intialize the hidesidebar state from the local storage from the
  //the isSideBarHided key if it is not null, otherwise it is going to be false
  useEffect(() => {
    const savedValue = window.localStorage.getItem('isSideBarHided');
    setHideSideBar(savedValue !== null ? JSON.parse(savedValue) : false);
  }, []);

  //Intialize the dakMode state from the local storage from the
  //the isSideBarHided key if it is not null, otherwise it is going to be false
  useEffect(() => {
    setDarkMode(true);
  }, []);

  //Every time that the hidesidebar state changes, update the key in
  // the local storage. To avoid storing null value, we are going to
  //do this only if the hideSidebar is boolean

  useEffect(() => {
    if (typeof hideSideBar === 'boolean') {
      window.localStorage.setItem(
        'isSideBarHided',
        JSON.stringify(hideSideBar),
      );
    }
  }, [hideSideBar]);

  return (
    <AppContext.Provider
      value={{
        hideSideBarObject: { hideSideBar, setHideSideBar },
        sideBarMenuItemsObject: { sideBarMenuItems, setSideBarMenuItems },
        darkModeObject: { darkMode, setDarkMode },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);
