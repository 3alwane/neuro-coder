import React from "react";
import SingleChallengeCard from "../SingleChallengeCard";
import { useAppContext } from "@/app/ContextApi";

function AllChallenges() {
  const mockData = [];
  return (
    <div className="w-full">
      {mockData.length !== 0 ? (
        <div className="mt-6 flex flex-wrap gap-4">
          <SingleChallengeCard />
          <SingleChallengeCard />
          <SingleChallengeCard />
        </div>
      ) : (
        <NoChallengesEmptyScreen />
      )}
    </div>
  );
}

export default AllChallenges;

function NoChallengesEmptyScreen() {
  const {
    darkModeObject: { darkMode },
  } = useAppContext();
  return (
    <div
      className={`${
        darkMode !== null && darkMode[1].isSelected ? "text-white" : ""
      } p-1 gap-5 flex flex-col  justify-center pt-[113px] pb-8      items-center`}
    >
      <svg
        fill="#94a3b8"
        width="94px"
        height="94px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.49,7.52a.19.19,0,0,1,0-.08.17.17,0,0,1,0-.07l0-.09-.06-.15,0,0h0l0,0,0,0a.48.48,0,0,0-.09-.11l-.09-.08h0l-.05,0,0,0L16.26,4.45h0l-3.72-2.3A.85.85,0,0,0,12.25,2h-.08a.82.82,0,0,0-.27,0h-.1a1.13,1.13,0,0,0-.33.13L4,6.78l-.09.07-.09.08L3.72,7l-.05.06,0,0-.06.15,0,.09v.06a.69.69,0,0,0,0,.2v8.73a1,1,0,0,0,.47.85l7.5,4.64h0l0,0,.15.06.08,0a.86.86,0,0,0,.52,0l.08,0,.15-.06,0,0h0L20,17.21a1,1,0,0,0,.47-.85V7.63S20.49,7.56,20.49,7.52ZM12,4.17l1.78,1.1L8.19,8.73,6.4,7.63Zm-1,15L5.5,15.81V9.42l5.5,3.4Zm1-8.11L10.09,9.91l5.59-3.47L17.6,7.63Zm6.5,4.72L13,19.2V12.82l5.5-3.4Z" />
      </svg>

      <div className="">
        <h3 className="font-semibold text-[14px] mb-1 text-center ">{` No Challenges Created Yet...`}</h3>
        <p className="text-gray-400  w-64 text-center text-[12px]">
          {`You haven't created any challenges yet. Begin your first challenge now!`}
        </p>
      </div>
      <button className="bg-gradient-to-r from-red-500 to-pink-600 p-2 rounded-md text-white text-center text-[12px] px-4">
        Start New Challenge
      </button>
    </div>
  );
}