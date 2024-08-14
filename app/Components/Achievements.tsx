import React, { useRef, useState, useEffect } from "react";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAppContext } from "../ContextApi";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { FreeMode } from "swiper/modules";

function Achievements() {
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [maxWidth, setMaxWidth] = useState("100%");
  const mockData = [1];

  const calculateMaxWidth = () => {
    const windowWidth = document.documentElement.clientWidth;
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const calculatedWidth = Math.min(windowWidth * 0.9, containerWidth - 20);
      console.log(calculatedWidth);

      setMaxWidth(`${Math.floor(calculatedWidth)}px`);
    }
  };

  useEffect(() => {
    calculateMaxWidth(); // Initial calculation

    // Handle window resize
    window.addEventListener("resize", calculateMaxWidth);

    // Handle zoom
    window.addEventListener("wheel", calculateMaxWidth, { passive: true });

    // Additional events for different browsers and zoom methods
    window.addEventListener("touchend", calculateMaxWidth);
    window.addEventListener("gestureend", calculateMaxWidth);

    return () => {
      window.removeEventListener("resize", calculateMaxWidth);
      window.removeEventListener("wheel", calculateMaxWidth);
      window.removeEventListener("touchend", calculateMaxWidth);
      window.removeEventListener("gestureend", calculateMaxWidth);
    };
  }, []);

  function SingleBadge() {
    return (
      <div
        className={`${
          darkMode !== null && darkMode[1].isSelected
            ? "bg-slate-800 text-white"
            : "bg-white"
        } relative rounded-md p-5  w-[296px] py-7 flex flex-col gap-2 items-center`}
      >
        {/* experience badge */}
        <div className="absolute text-[11px] z-50 bg-red-100 rounded-xl p-[3px] px-2 top-4 right-4 text-red-500">
          + 20 XP
        </div>
        <div className="mt-[23px]">
          <HexagonalBadge
            icon={
              <FlagRoundedIcon sx={{ fontSize: 31 }} className="text-white" />
            }
          />
        </div>
        <h2 className="font-bold text-[17px] mt-3">First Step</h2>
        <span className="text-slate-400 text-xs text-center mb-2">
          Youve completed your first challenge
        </span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full mt-9 flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <span
          className={`font-bold text-[20px] text-gray-900 ${
            darkMode !== null && darkMode[1].isSelected ? " text-white" : ""
          }`}
        >
          Achievements
        </span>
        {/* View All Button */}
        <button
          className="text-[12px] bg-gradient-to-r from-red-500 to-pink-600 p-1 px-2 rounded-md text-white 
          select-none cursor-pointer flex gap-1 items-center"
        >
          <VisibilityIcon sx={{ fontSize: 14 }} />
          <span>View All</span>
        </button>
      </div>

      <div style={{ maxWidth }} className=" mt-2">
        {mockData.length === 0 ? (
          <AchievementsEmptyScreen />
        ) : (
          <Swiper
            slidesPerView="auto"
            spaceBetween={4}
            freeMode={true}
            className="mySwiper"
            modules={[FreeMode]}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((index) => (
              <SwiperSlide key={index} className="w-[3000px]">
                <SingleBadge />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default Achievements;

function AchievementsEmptyScreen() {
  const {
    darkModeObject: { darkMode },
  } = useAppContext();
  return (
    <div
      className={`${
        darkMode !== null && darkMode[1].isSelected ? "text-white" : ""
      } p-1 gap-5 flex flex-col  justify-center py-16  items-center`}
    >
      {/* <svg
        fill="#94a3b8"
        width="94px"
        height="94px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.49,7.52a.19.19,0,0,1,0-.08.17.17,0,0,1,0-.07l0-.09-.06-.15,0,0h0l0,0,0,0a.48.48,0,0,0-.09-.11l-.09-.08h0l-.05,0,0,0L16.26,4.45h0l-3.72-2.3A.85.85,0,0,0,12.25,2h-.08a.82.82,0,0,0-.27,0h-.1a1.13,1.13,0,0,0-.33.13L4,6.78l-.09.07-.09.08L3.72,7l-.05.06,0,0-.06.15,0,.09v.06a.69.69,0,0,0,0,.2v8.73a1,1,0,0,0,.47.85l7.5,4.64h0l0,0,.15.06.08,0a.86.86,0,0,0,.52,0l.08,0,.15-.06,0,0h0L20,17.21a1,1,0,0,0,.47-.85V7.63S20.49,7.56,20.49,7.52ZM12,4.17l1.78,1.1L8.19,8.73,6.4,7.63Zm-1,15L5.5,15.81V9.42l5.5,3.4Zm1-8.11L10.09,9.91l5.59-3.47L17.6,7.63Zm6.5,4.72L13,19.2V12.82l5.5-3.4Z" />
      </svg> */}

      <div className="">
        {/* <h3 className="font-semibold text-[14px] mb-1 text-center ">{` No Achievements Earned Yet`}</h3> */}
        <p className="text-gray-400  w-96 text-center text-[12px]">
          {`Start completing challenges to earn badges!`}
        </p>
      </div>
      {/* <button className="bg-gradient-to-r from-red-500 to-pink-600 p-2 rounded-md text-white text-center text-[12px] px-4">
        Start New Challenge
      </button> */}
    </div>
  );
}
