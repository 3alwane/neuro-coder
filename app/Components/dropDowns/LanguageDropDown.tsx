import React, { useState, useRef, useEffect } from "react";
import {
  SiGo,
  SiJavascript,
  SiPython,
  SiReact,
} from "@icons-pack/react-simple-icons";
import { useAppContext } from "@/app/ContextApi";
import { FilterButton, useChallengesAreaContext } from "@/app/ChallengesArea";
import { LanguageItem } from "@/app/ContextApi";
function LanguageDropDown({
  filterButtons,
  setFilterButtons,
}: {
  filterButtons: FilterButton[];
  setFilterButtons: React.Dispatch<FilterButton[]>;
}) {
  const {
    darkModeObject: { darkMode },
    languagesArrayObject: { languagesArray, setLanguagesArray },
    languagesDropDownPositionsObject: { languagesDropDownPositions },
    filterByLanguageObject: { filterByLanguage, setFilterByLanguage },
  } = useAppContext();

  const darkModeString =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-600 text-white "
      : "bg-white  border border-slate-50";

  function handleClickedLanguage(index: number) {
    const copyLanguagesArray = languagesArray.map((singleLanguage, i) => {
      if (index === i) {
        setFilterByLanguage(singleLanguage.name);
        return { ...singleLanguage, isSelected: true };
      }
      return { ...singleLanguage, isSelected: false };
    });

    //Update the selection in the UI of the drop down
    setLanguagesArray(copyLanguagesArray);
    //Update the filter buttons state to close the drop down when we click on the language
    const copyFilterButtons = filterButtons.map((singleFilterButton) => {
      return { ...singleFilterButton, isOpened: false };
    });

    setFilterButtons(copyFilterButtons);
  }

  const menuRef = useRef<HTMLDivElement>(null);

  console.log(filterByLanguage);

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

    if (filterButtons[1].isOpened) {
      document.addEventListener("mousedown", handleClickOutside);
      // Handle window resize
      window.addEventListener("resize", closeTheDropDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", closeTheDropDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterButtons, setFilterButtons]);

  return (
    <div
      ref={menuRef}
      style={{
        top: languagesDropDownPositions.top + 49,
        left: languagesDropDownPositions.left,
      }}
      className={`${darkModeString} fixed p-1 py-4 px-2  w-[200px]  z-50      select-none    shadow-md rounded-lg flex flex-col gap-2`}
    >
      {languagesArray.map((singleLanguage, index) => (
        <div
          onClick={() => handleClickedLanguage(index)}
          key={index}
          className={`p-2 px-3 flex  rounded-md gap-2 items-center ${
            darkMode !== null && darkMode[1].isSelected
              ? "hover:bg-slate-700"
              : "hover:bg-slate-100"
          } cursor-pointer`}
        >
          <div>
            {singleLanguage.id === 1 && (
              <SiJavascript size={15} className="text-red-500" />
            )}
            {singleLanguage.id === 2 && (
              <SiPython size={15} className="text-red-500" />
            )}
            {singleLanguage.id === 3 && (
              <SiGo size={15} className="text-red-500" />
            )}
          </div>
          <span
            className={`text-[14px]  ${
              singleLanguage.isSelected ? "text-red-500" : "text-slate-400"
            }`}
          >
            {singleLanguage.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default LanguageDropDown;
