"use client";

import React from "react";
import TopBar from "./TopBar";
import { useAppContext } from "../ContextApi";
import StatisticsBar from "./StatisticsBar";

function ContentArea() {
  const {
    openSideBarObject: { openSideBar },
    darkModeObject: { darkMode },
  } = useAppContext();

  const darkModeString =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-700"
      : "bg-slate-50";

  return (
    <div className={`w-full min-h-screen p-5 pt-6  ${darkModeString}`}>
      {/* Soft Layer */}
      {openSideBar && (
        <div className="w-full h-full bg-black opacity-15 fixed top-0 left-0 z-30"></div>
      )}

      <TopBar />
      <StatisticsBar />
    </div>
  );
}

export default ContentArea;
