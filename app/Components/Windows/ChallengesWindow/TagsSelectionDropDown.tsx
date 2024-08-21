import { useAppContext } from "@/app/ContextApi";
import React, { useRef, useEffect, useState } from "react";
import { useChallengeWindowContext } from "../ChallengeWindow";
import { Tag } from "@/data/AllTags";

function TagsSelectionDropDown() {
  const {
    darkModeObject: { darkMode },
    allTagsObject: { allTags, setAllTags },
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

  const [searchInput, setSearchInput] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const filterTagsBySearch = allTags.filter((tag) =>
    tag.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  //Dark Mode switch for the whole component
  const darkModeString =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-700 text-white border border-slate-500 "
      : "bg-white border border-slate-50";

  //Dark mode switch for the search bar
  const darkModeSearchBarBox =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-800 text-slate-700 "
      : "bg-slate-50";

  //Dark mode switch of the tags
  const darkModeTags =
    darkMode !== null && darkMode[1].isSelected
      ? "text-slate-300 hover:text-slate-400 bg-slate-800 "
      : "bg-slate-100 text-slate-500 hover:text-slate-700";

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeDropDown() {
      setOpenSelectedTagDropDown(false);
    }

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeDropDown();
      }
    }

    if (openSelectedTagDropDown) {
      searchRef.current?.focus();
      document.addEventListener("mousedown", handleClickOutside);
      // Handle window resize
      window.addEventListener("resize", closeDropDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", closeDropDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", closeDropDown);
    };
  }, [openSelectedTagDropDown, setOpenSelectedTagDropDown]);

  function clickedTag(tag: Tag) {
    setSelectedTags((prevTags) => {
      if (!prevTags.includes(tag.name)) {
        return [...prevTags, tag.name];
      } else {
        return prevTags.filter((t) => t !== tag.name);
      }
    });
  }

  return (
    <div className="pl-3">
      <div
        ref={menuRef}
        style={{
          top: tagsDropDownPositions.top - 15,
          maxWidth: tagsDropDownPositions.width,
        }}
        className={`${darkModeString} ${
          openSelectedTagDropDown ? "absolute" : "hidden"
        }    z-[120] border      shadow-md  rounded-md p-4`}
      >
        {/*Search part*/}
        <div
          className={`flex  p-3  gap-5 items-center justify-between  relative  `}
        >
          <div
            className={`h-[38px] ${darkModeSearchBarBox}    flex items-center text-sm  rounded-md  pl-3 gap-1 w-[410px]    `}
          >
            <div>
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
            </div>
            <input
              value={searchInput}
              ref={searchRef}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search a Tag..."
              className="bg-transparent outline-none text-[12px] w-full font-light"
            />
          </div>
        </div>
        {/*Tags part*/}
        <div className="flex flex-wrap gap-3 px-3 mt-5 mb-3 ">
          {filterTagsBySearch.map((tag) => (
            <p
              onClick={() => clickedTag(tag)}
              key={tag._id}
              className={` ${darkModeTags} px-[8px] text-[13px] ${
                selectedTags.includes(tag.name) && "border border-slate-700"
              }  p-[3px] rounded-xl text-slate-500 select-none`}
            >
              {tag.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TagsSelectionDropDown;
