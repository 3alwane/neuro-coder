import React from "react";
import { useAppContext } from "@/app/ContextApi";
import AddIcon from "@mui/icons-material/Add";
import Add from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";

function TopBar() {
  const {
    darkModeObject: { darkMode },
    isMobileViewObject: { isMobileView },
    openSideBarObject: { setOpenSideBar, openSideBar },
    hideSideBarObject: { hideSideBar, setHideSideBar },
  } = useAppContext();

  function openTheSideBar() {
    if (hideSideBar === true) {
      setHideSideBar(false);
    }

    setOpenSideBar(!openSideBar);
  }
  return (
    <div>
      <div
        className={`${
          darkMode !== null && darkMode[1].isSelected
            ? "bg-slate-800 text-white"
            : "bg-white"
        } p-4 rounded-lg flex items-center justify-between `}
      >
        <div className="flex gap-5">
          <h2 className="flex flex-col ">
            <p className="text-xl font-bold">Challenges</p>
            <p className="text-[11px] text-slate-400">12 Challenges</p>
          </h2>
          {isMobileView && <AddChallengeButton />}
        </div>

        {isMobileView ? (
          <MenuIcon className="cursor-pointer" onClick={openTheSideBar} />
        ) : (
          <AddChallengeButton />
        )}
      </div>
    </div>
  );

  function AddChallengeButton() {
    return (
      <div className="flex gap-2 items-center">
        <button className="bg-gradient-to-r from-red-500 to-pink-600 rounded-md p-[7px] flex gap-1 items-center text-white">
          <Add sx={{ fontSize: 19 }} />
          {!isMobileView && <p className="text-sm pr-1">New Challenge</p>}
        </button>
      </div>
    );
  }
}

export default TopBar;
