"use client";

import React from "react";
import { DarkModeItem, useAppContext } from "../ContextApi";
import MenuIcon from "@mui/icons-material/Menu";

function TopBar() {
  const {
    isMobileViewObject: { isMobileView },
    openSideBarObject: { openSideBar, setOpenSideBar },
    hideSideBarObject: { hideSideBar, setHideSideBar },
    darkModeObject: { darkMode, setDarkMode },
  } = useAppContext();

  function openTheSideBar() {
    if (hideSideBar === true) {
      setHideSideBar(false);
    }

    setOpenSideBar(!openSideBar);
  }

  const darkModeString =
    darkMode !== null && darkMode[1].isSelected ? "bg-slate-800" : "bg-white";
  return (
    <div
      className={`${darkModeString} p-[14px] rounded-lg text-[12px] flex items-center justify-between`}
    >
      {/* Menu Bar Icon */}
      {/*SearchBar*/}
      <SearchBar />
      <div className={`flex ${isMobileView ? "gap-3" : "gap-8"}`}>
        {/*Light and dark*/}
        <DarkModeToggle />
        {/*Profile and XP*/}
        <ProfileAndXP />
      </div>
      {isMobileView && (
        <MenuIcon
          className="text-slate-400 cursor-pointer "
          onClick={openTheSideBar}
        />
      )}
    </div>
  );
}

export default TopBar;

function SearchBar() {
  const {
    isMobileViewObject: { isMobileView },
    darkModeObject: { darkMode },
  } = useAppContext();

  const darkModeString =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-500"
      : "bg-slate-50";

  return (
    <div
      className={`flex  gap-3 items-center ${
        isMobileView ? "w-[40%]" : "w-[60%]"
      } `}
    >
      <div
        className={`h-[42px] ${darkModeString} flex items-center text-[14px] rounded-3xl  pl-3 gap-1 w-full   `}
      >
        <svg
          width="24px"
          height="64px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              stroke="#c9c9c9"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>
        </svg>
        <input
          placeholder="Search a Challenge..."
          className={`bg-transparent outline-none w-full  font-light ${
            darkMode !== null && darkMode[1].isSelected
              ? "text-white"
              : "text-black"
          }`}
        />
      </div>
    </div>
  );
}

function ProfileAndXP() {
  const {
    isMobileViewObject: { isMobileView },
    darkModeObject: { darkMode },
  } = useAppContext();

  const darkModeString =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-500 text-gray-100"
      : "bg-slate-50 text-gray-600";

  return (
    <div className="flex    gap-5 items-center relative select-none ">
      <div
        className={`h-[42px] ${darkModeString} flex items-center text-sm  rounded-3xl pl-[4px] pr-[8px] gap-3  `}
      >
        {/* Profile And Name */}
        <div className="flex gap-1 items-center hover:bg-slate-200 rounded-3xl   cursor-pointer ">
          <div className="w-8 h-8 bg-red-600 rounded-full"></div>
          {!isMobileView && <span className="font-semibold ">Hello, Ali</span>}
        </div>
        {/* Experience */}
        <span
          className={` p-[6px] px-[12px] rounded-3xl ${
            darkMode !== null && darkMode[1].isSelected
              ? "bg-slate-700"
              : "bg-white"
          }`}
        >
          1200 <span className="font-bold text-pink-600">XP</span>
        </span>
      </div>
    </div>
  );
}

function DarkModeToggle() {
  const {
    darkModeObject: { darkMode, setDarkMode },
    isMobileViewObject: { isMobileView },
  } = useAppContext();

  function changeDarkModeState(index: number) {
    if (darkMode !== null) {
      const updateDarkMode: DarkModeItem[] = darkMode?.map(
        (darkModeItem, i) => {
          if (index === i) {
            return { ...darkModeItem, isSelected: true };
          }

          return { ...darkModeItem, isSelected: false };
        }
      );

      setDarkMode(updateDarkMode);
    }
  }
  return (
    <div className="flex  gap-5 items-center relative select-none ">
      <div
        className={`h-[42px] ${
          darkMode !== null && darkMode[1].isSelected
            ? "bg-slate-500"
            : "bg-slate-100"
        } flex items-center text-sm  rounded-3xl px-2 gap-1 `}
      >
        {darkMode?.map((darkModeItem, index) => (
          <span
            key={index}
            onClick={() => changeDarkModeState(index)}
            className={`${
              darkModeItem.isSelected
                ? "bg-gradient-to-r from-red-500 to bg-pink-600 text-white "
                : "text-gray-400 "
            }p-1 rounded-3xl ${
              isMobileView ? "px-1" : "px-3"
            }  cursor-pointer `}
          >
            {isMobileView ? darkModeItem.icon : darkModeItem.name}
          </span>
        ))}
      </div>
    </div>
  );
}
