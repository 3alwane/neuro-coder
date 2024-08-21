'use client';
import React from 'react';
import SideBar from '../Components/SideBar';
import ContentArea from '../Components/ContentArea';
import { useAppContext } from '../ContextApi';
import ChallengesArea from '../ChallengesArea';
import AchievementsArea from '../AchievementsArea';
import ChallengeDropDown from '../Components/dropDowns/ChallengeDropDown';
import TagWindow from '../Components/Windows/TagWindow';
import ChallengeWindow from '../Components/Windows/ChallengeWindow';
import { Toaster, resolveValue } from 'react-hot-toast';
import ConfirmationWindow from '../Components/Windows/ConfirmationWindow';

function Page() {
  const {
    sideBarMenuItemsObject: { sideBarMenuItems },
    openTagsWindowObject: { openTagsWindow },
    openChallengeWindowObject: { openChallengeWindow },
    darkModeObject: { darkMode, setDarkMode },
  } = useAppContext();

  const selectedComponent =
    sideBarMenuItems.find((item) => item.isSelected)?.component || null;

  return (
    <div className="poppins flex bg-slate-50 ">
      <Toaster
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background:
              darkMode !== null && darkMode[1].isSelected
                ? '#1e293b'
                : '#ffffff',
            color:
              darkMode !== null && darkMode[1].isSelected
                ? '#ffffff'
                : '#000000',
          },
        }}
      />
      <ConfirmationWindow />
      <ChallengeWindow />
      <ChallengeDropDown />
      {openTagsWindow ||
        (openChallengeWindow && (
          <div className="w-full h-full   bg-black opacity-15 fixed top-0 left-0 z-[80]"></div>
        ))}

      <SideBar />
      {selectedComponent}
    </div>
  );
}

export default Page;
