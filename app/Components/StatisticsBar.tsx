import React, { useState } from "react";
import { useAppContext } from "../ContextApi";

function StatisticsBar() {
  const [statistics, setStatistics] = useState([
    {
      id: 1,
      name: "Challenges Created",
      counter: 20,
      icon: (
        <svg
          width="28px"
          height="28px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="   fill-red-500"
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
              d="M5.75 1C6.16421 1 6.5 1.33579 6.5 1.75V3.6L8.22067 3.25587C9.8712 2.92576 11.5821 3.08284 13.1449 3.70797L13.3486 3.78943C14.9097 4.41389 16.628 4.53051 18.2592 4.1227C19.0165 3.93339 19.75 4.50613 19.75 5.28669V12.6537C19.75 13.298 19.3115 13.8596 18.6864 14.0159L18.472 14.0695C16.7024 14.5119 14.8385 14.3854 13.1449 13.708C11.5821 13.0828 9.8712 12.9258 8.22067 13.2559L6.5 13.6V21.75C6.5 22.1642 6.16421 22.5 5.75 22.5C5.33579 22.5 5 22.1642 5 21.75V1.75C5 1.33579 5.33579 1 5.75 1Z"
              fill="#f20707"
            ></path>
          </g>
        </svg>
      ),
    },
    {
      id: 2,
      name: "Challenges resolved",
      counter: 10,
      icon: (
        <svg
          fill="red"
          width="28px"
          height="28px"
          viewBox="0 0 256 256"
          id="Flat"
          xmlns="http://www.w3.org/2000/svg"
          className="   fill-red-500"
        >
          <path d="M176.00244,232a8.00039,8.00039,0,0,1-8,8h-80a8,8,0,1,1,0-16h80A8.00039,8.00039,0,0,1,176.00244,232Zm40-128a87.54306,87.54306,0,0,1-33.6416,69.208,16.23078,16.23078,0,0,0-6.3584,12.76758V192a16.01833,16.01833,0,0,1-16,16h-64a16.01833,16.01833,0,0,1-16-16v-6.03125A16.01813,16.01813,0,0,0,73.773,173.30957a87.57621,87.57621,0,0,1-33.76953-68.81445c-.2627-47.66211,38.26367-87.34961,85.88183-88.47071A88.00123,88.00123,0,0,1,216.00244,104Zm-32.78808-9.39648a55.85,55.85,0,0,0-45.76465-45.708,7.99953,7.99953,0,1,0-2.6543,15.77734A39.83978,39.83978,0,0,1,167.439,97.27734a8.00261,8.00261,0,0,0,7.87793,6.66407,8.103,8.103,0,0,0,1.34668-.11329A8,8,0,0,0,183.21436,94.60352Z" />
        </svg>
      ),
    },
    {
      id: 3,
      name: "On Going Challenges",
      counter: 10,
      icon: (
        <svg
          fill="red"
          width="34px"
          height="34px"
          viewBox="-8 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className="   fill-red-500"
        >
          <title>walking</title>
          <path d="M9.5 7.063c0-1.25-1.031-2.281-2.313-2.281-1.25 0-2.25 1.031-2.25 2.281 0 1.281 1 2.281 2.25 2.281 1.281 0 2.313-1 2.313-2.281zM7.031 27.188h-2.031s-0.094-5.781 0.063-6.469c0.125-0.688 1.469-2.125 1.531-2.688 0.063-0.594-0.531-3.031-0.531-3.031s-1.344 1.219-1.781 1.438-3.875 0.781-3.875 0.781l-0.406-1.75s3.281-0.719 3.75-1.094c0.469-0.344 1.719-3.375 2.656-3.75 0.625-0.281 2.313-0.156 3.156-0.156 0.875 0 3.75 1.656 4.031 2.031 0.313 0.344 2.031 3.719 2.031 3.719l-1.563 0.875-1.25-2.688s-0.969-0.813-1.344-0.938c-0.406-0.125-0.938-0.281-1.031 0.063-0.125 0.313 0.719 2.875 0.938 3.594 0.188 0.75 1.219 4.156 1.594 4.875s2.594 3.906 2.594 3.906l-1.906 1.25s-2.719-3.688-3.063-4.219c-0.375-0.531-1.438-3.375-1.438-3.375s-1.813 2.219-1.969 2.906c-0.125 0.625-0.156 4.719-0.156 4.719z"></path>
        </svg>
      ),
    },
    {
      id: 4,
      name: "Badges Won",
      counter: 2,
      icon: (
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 15 15"
          xmlns="http://www.w3.org/2000/svg"
          className="   fill-red-500"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.5 0C3.67157 0 3 0.671573 3 1.5V2H2.5C1.11929 2 0 3.11929 0 4.5C0 5.88071 1.11929 7 2.5 7H3.25606C3.82053 8.59703 5.26092 9.78029 7 9.97254V14H4V15H11V14H8V9.97254C9.73908 9.78029 11.1795 8.59703 11.7439 7H12.5C13.8807 7 15 5.88071 15 4.5C15 3.11929 13.8807 2 12.5 2H12V1.5C12 0.671573 11.3284 0 10.5 0H4.5ZM12 3V5.5C12 5.669 11.9907 5.83583 11.9725 6H12.5C13.3284 6 14 5.32843 14 4.5C14 3.67157 13.3284 3 12.5 3H12ZM2.5 3H3V5.5C3 5.669 3.00932 5.83583 3.02746 6H2.5C1.67157 6 1 5.32843 1 4.5C1 3.67157 1.67157 3 2.5 3Z"
          />
        </svg>
      ),
    },
  ]);

  const {
    darkModeObject: { darkMode },
  } = useAppContext();
  return (
    <div className=" w-full mt-7 flex flex-col gap-4  ">
      <span
        className={`font-bold text-xl   ${
          darkMode !== null && darkMode[1].isSelected
            ? "text-white"
            : "text-gray-900"
        }`}
      >
        Overview
      </span>
      {/* All Stats Components */}
      <div className="w-full grid grid-cols-4 gap-3">
        {statistics.map((singleItem, index) => (
          <div
            key={index}
            className={`${
              darkMode !== null && darkMode[1].isSelected
                ? "bg-slate-800"
                : "bg-white"
            } p-4 rounded-lg flex gap-4 items-center `}
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              {singleItem.icon}
            </div>
            {/* The Numbers */}
            <div className="flex flex-col gap-0">
              <span
                className={`font-bold text-2xl ${
                  darkMode !== null && darkMode[1].isSelected
                    ? "text-white"
                    : "text-black"
                } `}
              >
                {singleItem.counter}
              </span>
              <span className="text-slate-400 text-[12px]">
                {singleItem.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatisticsBar;
