import React, { useRef, MouseEvent } from "react";
import { useAppContext } from "../ContextApi";
import {
  SiGo,
  SiJavascript,
  SiPython,
  SiReact,
} from "@icons-pack/react-simple-icons";
import { Challenge } from "@/data/AllChallenges";
import { fromTextToIconLanguage } from "../functions/fromTextToIcon";

function SingleChallengeCard({
  singleChallenge,
}: {
  singleChallenge: Challenge;
}) {
  const {
    darkModeObject: { darkMode },
    isMobileViewObject: { isMobileView },
    sideBarMenuItemsObject: { sideBarMenuItems },
    challengesDropDownPositionsObject: { setChallengesDropDownPositions },
    openChallengeDropDownObject: { setOpenChallengeDropDown },
  } = useAppContext();

  const threeDotsRef = useRef<HTMLDivElement>(null);

  let difficultyColor = "";

  if (singleChallenge !== null && singleChallenge !== undefined) {
    if (singleChallenge.difficulty === "easy") {
      difficultyColor = "bg-green-100 text-green-500";
    } else if (singleChallenge.difficulty === "medium") {
      difficultyColor = "bg-yellow-100 text-yellow-500";
    } else {
      difficultyColor = "bg-red-100 text-red-500";
    }
  }
  const handleTheClickedThreeDots = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();

    if (threeDotsRef.current) {
      const rect = threeDotsRef.current.getBoundingClientRect();
      const { top, left } = rect;
      setChallengesDropDownPositions({ top: top, left: left });
    }

    setOpenChallengeDropDown(true);
  };

  return (
    <div
      className={` ${
        darkMode !== null && darkMode[1].isSelected
          ? "text-white bg-slate-800"
          : "bg-white"
      }  rounded-lg p-6 flex flex-col w-[300px] ${
        sideBarMenuItems[1].isSelected ? "max-sm:w-full" : ""
      } `}
    >
      {/*Header*/}
      <div className="flex justify-between">
        {/*--Icon--*/}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 p-[11px] rounded-lg  ">
          {fromTextToIconLanguage(singleChallenge.language)}
        </div>
        {/*--Dots Button--*/}
        <div
          ref={threeDotsRef}
          onClick={handleTheClickedThreeDots}
          className=" cursor-pointer hover:bg-slate-100 h-7 w-7 flex items-center justify-center  rounded-full"
        >
          <svg
            fill="gray"
            width="15px"
            height="15px"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M960 1468.235c93.448 0 169.412 75.965 169.412 169.412 0 93.448-75.964 169.412-169.412 169.412-93.448 0-169.412-75.964-169.412-169.412 0-93.447 75.964-169.412 169.412-169.412Zm0-677.647c93.448 0 169.412 75.964 169.412 169.412 0 93.448-75.964 169.412-169.412 169.412-93.448 0-169.412-75.964-169.412-169.412 0-93.448 75.964-169.412 169.412-169.412Zm0-677.647c93.448 0 169.412 75.964 169.412 169.412 0 93.447-75.964 169.412-169.412 169.412-93.448 0-169.412-75.965-169.412-169.412 0-93.448 75.964-169.412 169.412-169.412Z"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {/*--Title--*/}
      <div className="mt-[23px]">
        <div className="flex gap-2 items-center">
          <h2 className="font-bold text-lg cursor-pointer hover:text-red-500">
            {singleChallenge?.title}
          </h2>
          {/*--done Icon--*/}
          {singleChallenge.isSolved && (
            <div className="bg-slate-100 flex items-center justify-center w-5 h-5 rounded-full">
              <svg
                width="14px"
                height="14px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier"></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.7071 6.29289C20.0976 6.68342 20.0976 7.31658 19.7071 7.70711L10.4142 17C9.63316 17.7811 8.36683 17.781 7.58579 17L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929C3.68342 10.9024 4.31658 10.9024 4.70711 11.2929L9 15.5858L18.2929 6.29289C18.6834 5.90237 19.3166 5.90237 19.7071 6.29289Z"
                    fill="#b8b8b8"
                  ></path>{" "}
                </g>
              </svg>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-1">
          <span
            className={`${difficultyColor} rounded-lg p-[3px] text-[11px] px-3 `}
          >
            {singleChallenge?.difficulty}
          </span>
          <span className="bg-red-100 text-red-500 rounded-lg p-[3px] text-[11px] px-3 ">
            {singleChallenge?.type}
          </span>
        </div>
      </div>
      {/*--Description--*/}
      <div className="mt-2">
        <p className="text-slate-500 text-[12px] mt-[14px]">
          {singleChallenge?.description}
        </p>
      </div>
      {/*--Tags--*/}
      <div className="flex gap-2 items-center mt-6">
        <div className="flex text-[12px] gap-2 items-center flex-wrap">
          <p className="text-[12px] text-slate-500">Tags:</p>
          {singleChallenge?.tags.map((singleTag, index) => (
            <p
              key={index}
              className="bg-red-100 px-[7px] p-[3px] rounded-md text-red-500 select-none"
            >
              {singleTag}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SingleChallengeCard;
