import React from "react";
import SingleChallengeCard from "../SingleChallengeCard";
import { useAppContext } from "@/app/ContextApi";
import CircularProgress from "@mui/material/CircularProgress";
import { useChallengesAreaContext } from "@/app/ChallengesArea";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import StyleIcon from "@mui/icons-material/Style";

function AllChallenges() {
  const {
    allChallengesObject: { allChallenges, setAllChallenges },
    isLoadingObject: { isLoading },
    filterByDifficultyObject: { filterByDifficulty },
    filterByStatusObject: { filterByStatus },
    filterByLanguageObject: { filterByLanguage },
    filterByTagsObject: { filterByTags },
  } = useAppContext();

  const { challengeSearchInput } = useChallengesAreaContext();

  const filterChallengesBySearch = allChallenges.filter((singleChallenge) =>
    singleChallenge.title
      .toLowerCase()
      .includes(challengeSearchInput.toLocaleLowerCase())
  );

  //Assign the filterChallengesBySearch to the applyTheFilters variable
  let applyTheFilters = filterChallengesBySearch;

  //Apply the filter by difficulty
  if (filterByDifficulty !== "") {
    applyTheFilters = applyTheFilters.filter(
      (challenge) =>
        challenge.difficulty.toLowerCase() === filterByDifficulty.toLowerCase()
    );
  }

  //Apply the filter by status
  if (filterByStatus !== "") {
    applyTheFilters = applyTheFilters.filter((challenge) => {
      if (filterByStatus.toLowerCase() === "Solved".toLowerCase()) {
        return challenge.isSolved;
      } else if (filterByStatus.toLowerCase() === "UnSolved".toLowerCase()) {
        return challenge.isSolved === false;
      }
    });
  }

  //Apply the filter by language

  if (filterByLanguage !== "") {
    applyTheFilters = applyTheFilters.filter((challenge) => {
      if (filterByLanguage.toLowerCase() === "javascript") {
        return challenge.language === "javascript";
      }

      if (filterByLanguage.toLowerCase() === "python") {
        return challenge.language === "python";
      }

      if (filterByLanguage.toLowerCase() === "go") {
        return challenge.language === "go";
      }
    });
  }

  if (filterByTags.length > 0) {
    applyTheFilters = applyTheFilters.filter((challenge) => {
      // Check if the challenge has all the tags in filterByTags (using `every`)
      const hasAllTags = filterByTags.every((tag) =>
        challenge.tags.includes(tag)
      );

      // Check if the challenge has at least one tag in filterByTags (using `some`)
      const hasSomeTags = filterByTags.some((tag) =>
        challenge.tags.includes(tag)
      );

      // Return true if the challenge meets both conditions
      return hasAllTags && hasSomeTags;
    });
  }

  if (isLoading) {
    return (
      <div className="w-full  gap-4 items-center justify-center h-[570px] flex flex-col">
        <CircularProgress sx={{ color: "red" }} />
        <p className="text-[14px] text-slate-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {allChallenges.length !== 0 ? (
        <div className="mt-6 flex flex-wrap gap-4">
          {filterChallengesBySearch.length !== 0 ? (
            <>
              <>
                {applyTheFilters.length !== 0 ? (
                  <>
                    {applyTheFilters.map((SingleChallenge, index) => (
                      <SingleChallengeCard
                        singleChallenge={SingleChallenge}
                        key={index}
                      />
                    ))}
                  </>
                ) : (
                  <NoChallengesFoundWithFilters />
                )}
              </>
            </>
          ) : (
            <NoChallengesFound />
          )}
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

function NoChallengesFound() {
  const {
    darkModeObject: { darkMode },
  } = useAppContext();
  return (
    <div
      className={`${
        darkMode !== null && darkMode[1].isSelected ? "text-white" : ""
      } p-1 gap-5 flex flex-col justify-center pt-[113px] pb-8 w-full items-center`}
    >
      <SearchOffIcon sx={{ fontSize: 94 }} className="text-slate-400" />

      <div className="">
        <h3 className="font-semibold text-[14px] mb-1 text-slate-500 text-center">{`No Challenges Found`}</h3>
        <p className="text-gray-400 w-64 text-center text-[12px]">
          {`It seems like there are no challenges available at the moment.`}
        </p>
      </div>
    </div>
  );
}

function NoChallengesFoundWithFilters() {
  const {
    darkModeObject: { darkMode },
  } = useAppContext();
  return (
    <div
      className={`${
        darkMode !== null && darkMode[1].isSelected ? "text-white" : ""
      } p-1 gap-5 flex flex-col justify-center pt-[113px] pb-8 w-full items-center`}
    >
      <StyleIcon sx={{ fontSize: 94 }} className="text-slate-400" />

      <div className="">
        <h3 className="font-semibold text-[14px] mb-1 text-slate-500 text-center">{`No Challenges Found`}</h3>
        <p className="text-gray-400 w-64 text-center text-[12px]">
          {`No challenges match the selected tags. Please try selecting different tags.`}
        </p>
      </div>
    </div>
  );
}
