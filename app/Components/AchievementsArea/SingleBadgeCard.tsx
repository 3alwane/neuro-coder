import React, { useRef, useState, useEffect } from "react";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAppContext } from "@/app/ContextApi";
import { Badge } from "@/data/AllBadges";

function SingleBadgeCard({ badge }: { badge: Badge }) {
  const {
    darkModeObject: { darkMode },
  } = useAppContext();

  const HexagonalBadge = ({ icon }: { icon?: React.ReactNode }) => {
    return (
      <div className="relative w-20 h-20 drop-shadow-lg">
        <div className="absolute inset-0">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#db2777" />
              </linearGradient>
            </defs>
            <polygon
              points="50 3 94 26.5 94 73.5 50 97 6 73.5 6 26.5"
              fill="url(#grad1)"
              className="stroke-white stroke-[8]"
            />
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          {icon}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${
        darkMode !== null && darkMode[1].isSelected
          ? "bg-slate-800 text-white"
          : "bg-white"
      } relative rounded-md p-5  w-[250px]   py-7 flex flex-col gap-2 items-center max-sm:w-full `}
    >
      {/* experience badge */}
      <div className="absolute text-[11px] z-50 bg-red-100 rounded-xl p-[3px] px-2 top-4 right-4 text-red-500">
        + {badge.experiencePoints} XP
      </div>
      <div className="mt-[23px]">
        <HexagonalBadge icon={badge.icon} />
      </div>
      <h2 className="font-bold text-[17px] mt-3">{badge.name}</h2>
      <span className="text-slate-400 text-xs text-center mb-2">
        {badge.description}
      </span>
    </div>
  );
}

export default SingleBadgeCard;
