import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
  useRef,
  memo,
} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
  DifficultyChoice,
  LanguageItem,
  StatusItem,
  useAppContext,
} from "@/app/ContextApi";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DifficultyDropDown from "../dropDowns/DifficultyDropDown";
import { useChallengesAreaContext } from "@/app/ChallengesArea";

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

  function FilterButtons() {
    const {
      darkModeObject: { darkMode },
      difficultyDropDownObject: { setDifficultyDropDownPositions },

      languagesDropDownPositionsObject: { setLanguagesDropDownPositions },
      statusDropDownPositionsObject: { setStatusDropDownPositions },
      tagsDropDownPositionsObject: { setTagsDropDownPositions },
      filterByTagsObject: { filterByTags },
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
        setTagsDropDownPositions({ left: left, top: top });
      }
      setFilterButtons(updateFilterButtons);
    }

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
            <span className="text-[14px] ">
              {singleButton.name}

              {singleButton.name === "Tags" && (
                <span className="ml-1">
                  {filterByTags.length > 0 && `(${filterByTags.length})`}
                </span>
              )}
            </span>
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
      languagesArrayObject: { languagesArray, setLanguagesArray },
      difficultyChoicesObject: { difficultyChoices, setDifficultyChoices },
      filterByDifficultyObject: { filterByDifficulty, setFilterByDifficulty },
      filterByLanguageObject: { filterByLanguage, setFilterByLanguage },
      filterByStatusObject: { filterByStatus, setFilterByStatus },
      statusArrayObject: { statusArray, setStatusArray },
      filterByTagsObject: { filterByTags, setFilterByTags },
    } = useAppContext();

    const darkModeString =
      darkMode !== null && darkMode[1].isSelected
        ? "bg-slate-500 text-white"
        : "bg-slate-100 text-slate-400";

    //Reset the isSelected to false for all the languages in the languagesArray
    function resetTheFilterLanguage() {
      setFilterByLanguage("");

      setLanguagesArray(
        languagesArray.map((item: LanguageItem) => {
          return { ...item, isSelected: false };
        })
      );
    }

    //Reset the isSelected to false for all the difficulties in the difficulty Array
    function resetTheFilterDifficulty() {
      setFilterByDifficulty("");

      setDifficultyChoices(
        difficultyChoices.map((item: DifficultyChoice) => {
          return { ...item, isSelected: false };
        })
      );
    }

    //Reset the isSelected to false for all the status items in the status Array
    function resetTheFilterStatus() {
      setFilterByStatus("");

      setStatusArray(
        statusArray.map((item: StatusItem) => {
          return { ...item, isSelected: false };
        })
      );
    }

    function unselectTheTag(clickedTag: string) {
      //Delete the tag the we clicked on
      setFilterByTags((prevTags) => {
        if (prevTags.includes(clickedTag)) {
          return prevTags.filter((tag) => tag !== clickedTag);
        }

        return prevTags;
      });
    }

    const [difficultyColor, setDifficultyColor] = useState<string>("");
    const [closeColor, setCloseColor] = useState<string>("");

    useLayoutEffect(() => {
      if (filterByDifficulty === "Easy") {
        setDifficultyColor("bg-green-100 text-green-500");
        setCloseColor("bg-green-300");
      } else if (filterByDifficulty === "Medium") {
        setDifficultyColor("bg-yellow-100 text-yellow-500");
        setCloseColor("bg-yellow-300");
      } else if (filterByDifficulty === "Hard") {
        setDifficultyColor("bg-red-100 text-red-500");
        setCloseColor("bg-red-300");
      }
    }, [filterByDifficulty]);

    return (
      <div className="w-full">
        <div className={`flex items-center gap-2 `}>
          {/* Show the selected language in the filter bar */}
          {filterByLanguage.length > 0 && (
            <div
              className={` ${darkModeString} flex items-center gap-2   rounded-lg p-[5px] text-[13px] px-2 `}
            >
              <span>{filterByLanguage}</span>
              {/*close icon*/}
              <div className="bg-slate-200 p-[3px] rounded-full cursor-pointer w-4 h-4 flex items-center justify-center">
                <CloseIcon
                  onClick={resetTheFilterLanguage}
                  sx={{ fontSize: 12, color: "gray" }}
                />
              </div>
            </div>
          )}

          {/* Show the selected difficulty in the filter bar */}
          {filterByDifficulty.length > 0 && (
            <div
              className={` ${difficultyColor} flex items-center gap-2   rounded-lg p-[5px] text-[13px] px-2 `}
            >
              <span>{filterByDifficulty}</span>
              {/*close icon*/}
              <div
                className={`${closeColor}  p-[3px] rounded-full cursor-pointer w-4 h-4 flex items-center justify-center`}
              >
                <CloseIcon
                  onClick={resetTheFilterDifficulty}
                  sx={{
                    fontSize: 12,
                    color:
                      filterByDifficulty === "Easy"
                        ? "green"
                        : filterByDifficulty === "Medium"
                        ? "yellow"
                        : "red",
                  }}
                />
              </div>
            </div>
          )}

          {/* Show the selected language in the filter bar */}
          {filterByStatus.length > 0 && (
            <div
              className={` ${darkModeString} flex items-center gap-2   rounded-lg p-[5px] text-[13px] px-2 `}
            >
              <span>{filterByStatus}</span>
              {/*close icon*/}
              <div className="bg-slate-200 p-[3px] rounded-full cursor-pointer w-4 h-4 flex items-center justify-center">
                <CloseIcon
                  onClick={resetTheFilterStatus}
                  sx={{ fontSize: 12, color: "gray" }}
                />
              </div>
            </div>
          )}
          {/* Show the selected tags */}
          {filterByTags.length > 0 && (
            <>
              {filterByTags.map((tag, i) => (
                <div
                  key={i}
                  className={` ${darkModeString}  flex items-center gap-2   rounded-lg p-[5px] text-[13px] px-2 `}
                >
                  <span>{tag}</span>
                  {/*close icon*/}
                  <div className="bg-slate-200 p-[3px] rounded-full cursor-pointer w-4 h-4 flex items-center justify-center">
                    <CloseIcon
                      onClick={() => unselectTheTag(tag)}
                      sx={{ fontSize: 12, color: "gray" }}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default SearchAndFilterBar;

const SearchBar = memo(function SearchBar() {
  const {
    darkModeObject: { darkMode },
    sideBarMenuItemsObject: { sideBarMenuItems },
  } = useAppContext();

  const { challengeSearchInput, setChallengeSearchInput } =
    useChallengesAreaContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const darkModeString =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-500 text-white"
      : "bg-slate-50";

  const updateTheSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setChallengeSearchInput(e.target.value);
    },
    [setChallengeSearchInput]
  );

  //Set the focus to the input when I click on the challenges section
  useEffect(() => {
    inputRef.current?.focus();
  }, [sideBarMenuItems[1].isSelected]);

  return (
    <div
      className={`h-[40px] ${darkModeString} flex items-center text-sm rounded-md 
    pl-3 gap-2 w-[60%] max-xl:w-full`}
    >
      <div className="flex gap-2 justify-between items-center w-full">
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
            strokeLinecap="round"
            strokeWidth="2"
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>
        <input
          ref={inputRef}
          value={challengeSearchInput}
          onChange={updateTheSearchInput}
          placeholder="Search a Challenge..."
          className="bg-transparent outline-none font-light text-[14px] w-full"
        />
      </div>

      {/* Only the close icon when the user start typing in the input search */}
      {challengeSearchInput.length > 0 && (
        <CloseIcon
          sx={{ fontSize: 17 }}
          onClick={() => {
            setChallengeSearchInput("");
            inputRef.current?.focus();
          }}
          className="text-slate-500 mr-2 cursor-pointer"
        />
      )}
    </div>
  );
});
