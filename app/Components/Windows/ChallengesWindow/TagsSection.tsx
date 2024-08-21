import React, { useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppContext } from "@/app/ContextApi";
import { useChallengeWindowContext } from "../ChallengeWindow";
import TagsSelectionDropDown from "./TagsSelectionDropDown";
function TagsSection() {
  //Variables
  const {
    darkModeObject: { darkMode },
    openChallengeWindowObject: { openChallengeWindow },
  } = useAppContext();

  const {
    openSelectedTagDropDownObject: {
      openSelectedTagDropDown,
      setOpenSelectedTagDropDown,
    },

    tagsSelectionDropDownPositionsObject: {
      tagsDropDownPositions,
      setTagsDropDownPositions,
    },

    selectedTagsObject: { selectedTags, setSelectedTags },
  } = useChallengeWindowContext();

  const buttonRef = useRef<HTMLDivElement>(null);

  const darkModeInput =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-700 text-white border border-slate-500 "
      : "bg-white border";

  function openTagsDropDown() {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const { bottom, width } = rect;

      //Get the top and the left positions
      setTagsDropDownPositions({
        top: bottom + 4,
        width: width,
      });

      //Open the drop down
      setOpenSelectedTagDropDown(true);
    }
  }

  return (
    <div className="flex flex-col gap-2 w-1/2 relative ">
      <span className="font-semibold text-[14px] text-gray-600">Tags</span>
      {/* All Tags */}
      <div
        ref={buttonRef}
        className={`flex ${darkModeInput}   justify-between items-center border rounded-md pr-1`}
      >
        <div className="p-[6px]  w-full flex flex-wrap gap-2 rounded-md text-[12px] text-gray-400 pr-[12px] ">
          {selectedTags.length !== 0 ? (
            <>
              {selectedTags.map((tag, index) => (
                <div
                  key={index}
                  className="border rounded-md p-[3px] px-2  flex gap-2 items-center select-none"
                >
                  <p>{tag}</p>
                  <CloseIcon
                    onClick={() => {
                      setSelectedTags((prevState) => {
                        if (prevState.includes(tag)) {
                          return prevState.filter((t) => t !== tag);
                        }

                        return prevState;
                      });
                    }}
                    sx={{ fontSize: 12 }}
                    className="cursor-pointer"
                  />
                </div>
              ))}
            </>
          ) : (
            <p className="p-1">Please select a tag</p>
          )}
        </div>

        <ExpandMoreIcon
          onClick={openTagsDropDown}
          sx={{ fontSize: 17 }}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

export default TagsSection;
