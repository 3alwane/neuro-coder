"use client";
import React from "react";
import SideBar from "../Components/SideBar";
import ContentArea from "../Components/ContentArea";
import { useAppContext } from "../ContextApi";
import ChallengesArea from "../ChallengesArea";
import AchievementsArea from "../AchievementsArea";

function Page() {
  const {
    sideBarMenuItemsObject: { sideBarMenuItems },
  } = useAppContext();

  const selectedComponent =
    sideBarMenuItems.find((item) => item.isSelected)?.component || null;

  return (
    <div className="poppins flex bg-slate-50 ">
      <SideBar />
      {selectedComponent}
    </div>
  );
}

export default Page;
