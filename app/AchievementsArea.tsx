import React from "react";
import { useAppContext } from "./ContextApi";
import TopBar from "./Components/AchievementsArea/TopBar";
import AllAchievements from "./Components/AchievementsArea/AllAchievements";

function AchievementsArea() {
  const {
    darkModeObject: { darkMode },
  } = useAppContext();

  const darkModeString =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-700 text-white"
      : "bg-slate-50";
  return (
    <div className={`w-full min-h-screen p-5 pt-6 ${darkModeString}`}>
      <TopBar />
      <AllAchievements />
    </div>
  );
}

export default AchievementsArea;
