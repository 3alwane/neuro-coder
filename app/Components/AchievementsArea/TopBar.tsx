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
            <p className="text-xl font-bold">Achievements</p>
            <p className="text-[11px] text-slate-400">12 Badges Won</p>
          </h2>
        </div>

        {isMobileView && (
          <MenuIcon className="cursor-pointer" onClick={openTheSideBar} />
        )}
      </div>
    </div>
  );
}

export default TopBar;
