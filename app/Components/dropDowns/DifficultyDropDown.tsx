"use client";

import { useAppContext } from "@/app/ContextApi";
import React, { useState, useRef, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { FilterButton, useChallengesAreaContext } from "@/app/ChallengesArea";
import { DifficultyChoice } from "@/app/ContextApi";
function DifficultyDropDown({
  filterButtons,
  setFilterButtons,
}: {
  filterButtons: FilterButton[];
  setFilterButtons: React.Dispatch<React.SetStateAction<FilterButton[]>>;
}) {
  const {
    darkModeObject: { darkMode },
    difficultyDropDownObject: {
      difficultyDropDownPositions,
      setDifficultyDropDownPositions,
    },
    difficultyChoicesObject: { difficultyChoices, setDifficultyChoices },
    filterByDifficultyObject: { setFilterByDifficulty },
  } = useAppContext();

  const darkModeString =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-600 text-white"
      : "bg-white";

  function clickedItem(index: number) {
    const updatedDifficultyChoice: DifficultyChoice[] = difficultyChoices.map(
      (singleDifficulty, i) => {
        if (index === i) {
          setFilterByDifficulty(singleDifficulty.title);
          return { ...singleDifficulty, isSelected: true };
        }
        return { ...singleDifficulty, isSelected: false };
      }
    );

    //Update the difficulty choice state
    setDifficultyChoices(updatedDifficultyChoice);

    //Set the isOpened property to false for the filterButtonsArray
    //I did this to update the filter buttons state to that it will be closed
    //since in the parent component it is relied upon the open this drop down
    // ::
    const copyFilterButtons = filterButtons?.map((singleBtn) => {
      return { ...singleBtn, isOpened: false };
    });

    setFilterButtons(copyFilterButtons);
  }

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function resetTheFilterButtonsArray() {
      const copyFilterButtons = filterButtons.map((singleFilterButton) => {
        return { ...singleFilterButton, isOpened: false };
      });
      setFilterButtons(copyFilterButtons);
    }

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        resetTheFilterButtonsArray();
      }
    }

    function closeTheDropDown() {
      resetTheFilterButtonsArray();
    }

    if (filterButtons[2].isOpened) {
      document.addEventListener("mousedown", handleClickOutside);
      // Handle window resize
      window.addEventListener("resize", closeTheDropDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", closeTheDropDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", closeTheDropDown);
    };
  }, [filterButtons, setFilterButtons]);

  return (
    <div
      ref={menuRef}
      style={{
        top: difficultyDropDownPositions.top + 49,
        left: difficultyDropDownPositions.left,
      }}
      className={` ${darkModeString} fixed z-50 p-2 w-[180px] select-none  shadow-md rounded-lg flex flex-col`}
    >
      {difficultyChoices.map(
        (singleDifficulty: DifficultyChoice, index: number) => (
          <div
            key={index}
            onClick={() => clickedItem(index)}
            className={`flex  justify-between ${
              darkMode !== null && darkMode[1].isSelected
                ? "hover:bg-slate-700"
                : "hover:bg-slate-100"
            }  p-2 px-3 rounded-md gap-1 items-center text-slate-600 cursor-pointer`}
          >
            <span className={`text-[14px] ${singleDifficulty.textColor}`}>
              {singleDifficulty.title}
            </span>
            {singleDifficulty.isSelected && (
              <CheckIcon
                sx={{
                  fontSize: "15px",
                  color:
                    darkMode !== null && darkMode[1].isSelected
                      ? "white"
                      : "gray",
                }}
              />
            )}
          </div>
        )
      )}
    </div>
  );
}

export default DifficultyDropDown;
