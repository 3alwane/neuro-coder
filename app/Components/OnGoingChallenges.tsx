import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import {
  SiGo,
  SiJavascript,
  SiPython,
  SiReact,
} from "@icons-pack/react-simple-icons";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { FreeMode } from "swiper/modules";
import { useAppContext } from "../ContextApi";

function OnGoingChallenges() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [maxWidth, setMaxWidth] = useState("100%");
  const {
    darkModeObject: { darkMode },
    hideSideBarObject: { hideSideBar },
  } = useAppContext();

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

  return (
    <div ref={containerRef} className="w-full mt-9 flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <span
          className={`font-bold text-[19px] text-gray-900 ${
            darkMode !== null && darkMode[1].isSelected
              ? "text-white"
              : "text-gray-900"
          }`}
        >
          On Going Challenges
        </span>
      </div>
      <div style={{ maxWidth }}>
        <Swiper
          slidesPerView="auto"
          spaceBetween={4}
          freeMode={true}
          className="mySwiper"
          modules={[FreeMode]}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((index) => (
            <SwiperSlide key={index} className="w-[3000px]">
              <SingleChallengeCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );

  function SingleChallengeCard() {
    return (
      <div
        className={` ${
          darkMode !== null && darkMode[1].isSelected
            ? "text-white bg-slate-800"
            : "bg-white"
        }  rounded-lg p-6 flex flex-col `}
      >
        {/*Header*/}
        <div className="flex justify-between">
          {/*--Icon--*/}
          <div className="bg-gradient-to-r from-red-500 to-pink-600 p-[11px] rounded-lg  ">
            <SiPython size={21} className="text-[12px] text-white" />
          </div>
          {/*--Dots Button--*/}
          <div className=" cursor-pointer hover:bg-slate-100 h-7 w-7 flex items-center justify-center  rounded-full">
            <svg
              fill="gray"
              width="15px"
              height="15px"
              viewBox="0 0 1920 1920"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M960 1468.235c93.448 0 169.412 75.965 169.412 169.412 0 93.448-75.964 169.412-169.412 169.412-93.448 0-169.412-75.964-169.412-169.412 0-93.447 75.964-169.412 169.412-169.412Zm0-677.647c93.448 0 169.412 75.964 169.412 169.412 0 93.448-75.964 169.412-169.412 169.412-93.448 0-169.412-75.964-169.412-169.412 0-93.448 75.964-169.412 169.412-169.412Zm0-677.647c93.448 0 169.412 75.964 169.412 169.412 0 93.447-75.964 169.412-169.412 169.412-93.448 0-169.412-75.965-169.412-169.412 0-93.448 75.964-169.412 169.412-169.412Z"
                fill-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        {/*--Title--*/}
        <div className="mt-[23px]">
          <div className="flex gap-2 items-center">
            <h2 className="font-bold text-lg cursor-pointer hover:text-red-500">
              Even Numbers
            </h2>
            {/*--done Icon--*/}
            <div className="bg-slate-100 flex items-center justify-center w-5 h-5 rounded-full">
              <svg
                width="14px"
                height="14px"
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
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.7071 6.29289C20.0976 6.68342 20.0976 7.31658 19.7071 7.70711L10.4142 17C9.63316 17.7811 8.36683 17.781 7.58579 17L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929C3.68342 10.9024 4.31658 10.9024 4.70711 11.2929L9 15.5858L18.2929 6.29289C18.6834 5.90237 19.3166 5.90237 19.7071 6.29289Z"
                    fill="#b8b8b8"
                  ></path>{" "}
                </g>
              </svg>
            </div>
          </div>

          <div className="flex gap-2 mt-1">
            <span className="bg-green-100 text-green-500 rounded-lg p-[3px] text-[11px] px-3 ">
              Easy
            </span>
            <span className="bg-red-100 text-red-500 rounded-lg p-[3px] text-[11px] px-3 ">
              Arrays
            </span>
          </div>
        </div>
        {/*--Description--*/}
        <div className="mt-2">
          <p className="text-slate-500 text-[12px] mt-[14px]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia
            nam ad non, ...
          </p>
        </div>
        {/*--Tags--*/}
        <div className="flex gap-2 items-center mt-6">
          <div className="flex text-[12px] gap-2 items-center flex-wrap">
            <p className="text-[12px] text-slate-500">Tags:</p>
            <p className="bg-red-100 px-[7px] p-[3px] rounded-md text-red-500 select-none">
              Tag1
            </p>
            <p className="bg-red-100 px-[7px] p-[3px] rounded-md text-red-500 select-none">
              Tag2
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default OnGoingChallenges;
