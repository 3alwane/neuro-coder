import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useAppContext } from "@/app/ContextApi";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DifficultyDropDown from "../dropDowns/DifficultyDropDown";

interface FilterButton {
  id: number;
  name: string;
  isOpened: boolean;
}
function SearchAndFilterBar({
  filterButtons,
  setFilterButtons,
}: {
  filterButtons: FilterButton[];
  setFilterButtons: React.Dispatch<FilterButton[]>;
}) {
  const {
    darkModeObject: { darkMode },
  } = useAppContext();

  const darkModeString =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-800 text-white"
      : "bg-white";

  return (
    <div
      className={`${darkModeString} p-4 rounded-lg flex flex-wrap items-center justify-between mt-6 gap-3`}
    >
      {/*Search bar*/}
      <SearchBar />
      {/*Filter buttons*/}
      <FilterButtons />
      {/*Selected filters*/}
      <SelectedFilters />
    </div>
  );

  function SearchBar() {
    const {
      darkModeObject: { darkMode },
    } = useAppContext();

    const darkModeString =
      darkMode !== null && darkMode[1].isSelected
        ? "bg-slate-500 text-white"
        : "bg-slate-50 ";

    return (
      <div
        className={`h-[40px] ${darkModeString} flex items-center text-sm  rounded-md 
pl-3 gap-1   w-[60%] max-xl:w-full `}
      >
        <div>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="gray"
              stroke-linecap="round"
              stroke-width="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          placeholder="Search a Challenge..."
          className="bg-transparent outline-none font-light text-[14px]"
        />
      </div>
    );
  }

  function FilterButtons() {
    const {
      darkModeObject: { darkMode },
      difficultyDropDownObject: { setDifficultyDropDownPositions },

      languagesDropDownPositionsObject: { setLanguagesDropDownPositions },
      statusDropDownPositionsObject: { setStatusDropDownPositions },
    } = useAppContext();

    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const darkModeString =
      darkMode !== null && darkMode[1].isSelected
        ? "bg-slate-500 text-white hover:bg-slate-400"
        : "bg-slate-50 text-slate-400 hover:bg-slate-100 ";

    function handleClickedButton(index: number) {
      const updateFilterButtons = filterButtons.map((item, i) => {
        if (index === i) {
          return { ...item, isOpened: !item.isOpened };
        }

        return { ...item, isOpened: false };
      });

      const rect = buttonRefs.current[index]?.getBoundingClientRect();
      const top = rect?.top;
      const left = rect?.left;
      if (top && left) {
        setDifficultyDropDownPositions({ left: left, top: top });
        setLanguagesDropDownPositions({ left: left, top: top });
        setStatusDropDownPositions({ left: left, top: top });
      }
      setFilterButtons(updateFilterButtons);
    }

    console.log(buttonRefs);

    return (
      <div className="flex gap-2 flex-wrap">
        {filterButtons.map((singleButton, index) => (
          <button
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            onClick={() => handleClickedButton(index)}
            key={index}
            className={`${darkModeString} rounded-md p-[8px] px-3 flex gap-[6px] items-center `}
          >
            <span className="text-[14px] ">{singleButton.name}</span>
            {!singleButton.isOpened ? (
              <KeyboardArrowDown sx={{ fontSize: 19 }} />
            ) : (
              <KeyboardArrowUpIcon sx={{ fontSize: 19 }} />
            )}
          </button>
        ))}
      </div>
    );
  }

  function SelectedFilters() {
    const {
      darkModeObject: { darkMode },
    } = useAppContext();

    const darkModeString =
      darkMode !== null && darkMode[1].isSelected
        ? "bg-slate-500 text-white"
        : "bg-slate-100 text-slate-400";

    return (
      <div className="w-full">
        <div className={`flex items-center `}>
          <div
            className={` ${darkModeString} flex items-center gap-2   rounded-lg p-[4px] text-[13px] px-2 `}
          >
            <span>Easy</span>
            {/*close icon*/}
            <div className="bg-slate-200 p-[3px] rounded-full cursor-pointer w-4 h-4 flex items-center justify-center">
              <CloseIcon sx={{ fontSize: 12, color: "gray" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchAndFilterBar;
