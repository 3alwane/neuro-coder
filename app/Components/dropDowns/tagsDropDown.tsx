import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useAppContext } from "@/app/ContextApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FilterButton, useChallengesAreaContext } from "@/app/ChallengesArea";
import { deleteTagFunction } from "@/app/functions/tagsFunctions";
import { Tag } from "@/data/AllTags";

function TagsDropDown({
  filterButtons,
  setFilterButtons,
}: {
  filterButtons: FilterButton[];
  setFilterButtons: React.Dispatch<FilterButton[]>;
}) {
  const {
    darkModeObject: { darkMode },
    tagsDropDownPositionsObject: { tagsDropDownPositions },
    openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
    allTagsObject: { allTags, setAllTags },
    allChallengesObject: { allChallenges, setAllChallenges },
    filterByTagsObject: { filterByTags, setFilterByTags },
  } = useAppContext();

  const [allTagsWithHovered, setAllTagsWithHovered] = useState(() => {
    return allTags.map((tag) => ({ ...tag, isHovered: false }));
  });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [searchTagsInput, setSearchTagsInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [filterAllTagsBySearch, setFilterAllTagsBySearch] = useState<
    { _id: string; name: string; isHovered: boolean }[]
  >([]);

  const { setTagToEdit } = useChallengesAreaContext();

  useEffect(() => {
    setAllTagsWithHovered(allTags.map((tag) => ({ ...tag, isHovered: false })));
  }, [allTags]);

  //Update the filterAllTagsSearch when the searchTagsInput and allTagsWithHovered changes
  useLayoutEffect(() => {
    const copyAllTagsWithHovered = allTagsWithHovered.filter((tag) =>
      tag.name.toLowerCase().includes(searchTagsInput.toLocaleLowerCase())
    );

    setFilterAllTagsBySearch(copyAllTagsWithHovered);
  }, [searchTagsInput, allTagsWithHovered]);

  //Dark Mode switch for the whole component
  const darkModeString =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-600 text-white "
      : "bg-white border border-slate-50";

  //Dark mode switch for the search bar
  const darkModeSearchBarBox =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-400 text-slate-700 "
      : "bg-slate-50";

  //Dark mode switch of the input search
  const darkModeInputSearch =
    darkMode !== null && darkMode[1].isSelected ? "placeholder-slate-700" : "";

  //Dark mode switch for the search Icon
  const darkModeSearchIcon =
    darkMode !== null && darkMode[1].isSelected
      ? "text-slate-600"
      : "text-slate-400";

  //Dark mode switch of the tags
  const darkModeTags =
    darkMode !== null && darkMode[1].isSelected
      ? "text-slate-300 hover:text-slate-400 bg-slate-700 "
      : "bg-slate-100 text-slate-500 hover:text-slate-700";

  function resetTheFilterButtonsArray() {
    const copyFilterButtons = filterButtons.map((singleFilterButton) => {
      return { ...singleFilterButton, isOpened: false };
    });
    setFilterButtons(copyFilterButtons);
  }

  //Store the index hovered on the the hoverIndex variable
  function handleMouseEnter(index: number) {
    setHoveredIndex(index);
  }

  //Set the hoverIndex as null when the user leaves the tag
  function handleMouseLeave() {
    setHoveredIndex(null);
  }

  function handleClickedTag(singleTag: Tag) {
    //Update the filter tags array only of it does not exist
    setFilterByTags((prevTags) => {
      if (!prevTags.includes(singleTag.name)) {
        return [...prevTags, singleTag.name];
      }

      return prevTags;
    });
  }

  //Update the all tags with hovered array
  useLayoutEffect(() => {
    if (hoveredIndex !== null) {
      const updateAllTagsWithHovered = filterAllTagsBySearch.map((tag, i) => {
        if (i === hoveredIndex) {
          return { ...tag, isHovered: true };
        }

        return { ...tag, isHovered: false };
      });

      setFilterAllTagsBySearch(updateAllTagsWithHovered);
    }
  }, [hoveredIndex]);

  //Close the tags drop down when the window object changes, or
  //the user clicks outside of it

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (!openTagsWindow) {
          resetTheFilterButtonsArray();
        }
      }
    }

    function closeTheDropDown() {
      if (!openTagsWindow) {
        // Add this condition
        resetTheFilterButtonsArray();
      }
    }
    if (filterButtons[0].isOpened) {
      //Only set the focus when the tags window is not opened
      if (!openTagsWindow) {
        inputRef.current?.focus();
      }

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
  }, [filterButtons, setFilterButtons, openTagsWindow]);
  console.log(filterByTags);

  return (
    <div className="">
      {/*Background white*/}
      <div
        ref={menuRef}
        style={{
          top: tagsDropDownPositions.top + 49,
          left: tagsDropDownPositions.left,
        }}
        className={`${darkModeString} w-[400px] shadow-md  fixed text-[13px]     rounded-xl p-3`}
      >
        {/*Search part*/}
        <div className="flex  p-3  gap-5 items-center justify-between   ">
          <div
            className={`h-[38px] ${darkModeSearchBarBox} flex items-center  rounded-md  pl-3 gap-1 w-[410px]    `}
          >
            <div>
              <SearchIcon
                sx={{ fontSize: 20 }}
                className={`${darkModeSearchIcon}`}
              />
            </div>
            <input
              type="text"
              ref={inputRef}
              value={searchTagsInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchTagsInput(e.target.value);
              }}
              placeholder="Search a Tag..."
              className={`bg-transparent outline-none w-full font-light ${darkModeInputSearch} `}
            />
          </div>
          <button
            onClick={() => {
              setOpenTagsWindow(true);
            }}
            className="bg-gradient-to-r from-red-500 to-pink-600 ml-2 p-[9px]  flex w-[50%]   rounded-md text-white items-center justify-center max-lg:w-[25%]"
          >
            <div className="">
              <span className="max-sm:hidden">Add Tag</span>
              <span className="hidden max-sm:block text-lg">+</span>
            </div>
          </button>
        </div>
        {/*Tags part*/}
        <div
          onMouseLeave={() => {
            const ResetTheAllTagsWithHovered = filterAllTagsBySearch.map(
              (tag) => {
                return { ...tag, isHovered: false };
              }
            );

            setFilterAllTagsBySearch(ResetTheAllTagsWithHovered);
          }}
          className={`mx-3 flex flex-wrap gap-4 items-center mt-3 `}
        >
          {/* String tag */}
          {allTagsWithHovered.length !== 0 ? (
            <>
              {filterAllTagsBySearch.map((singleTag, index) => (
                <div
                  key={singleTag._id}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  className={`text-slate-500 px-2 flex gap-2 p-[5px] items-center bg-slate-100 
          rounded-lg ${darkModeTags} ${
                    filterByTags.includes(singleTag.name) &&
                    "border border-slate-800"
                  }    text-[13px]  `}
                >
                  <p
                    onClick={() => handleClickedTag(singleTag)}
                    className={` cursor-pointer  rounded-lg  select-none `}
                  >
                    {singleTag.name}
                  </p>

                  {/* Edit and delete buttons */}

                  {singleTag.isHovered && (
                    <div className="flex  items-center">
                      <EditIcon
                        onClick={() => {
                          //Set the tag to edit
                          setTagToEdit(singleTag.name);
                          //open the tag window
                          setOpenTagsWindow(true);
                        }}
                        className="text-slate-400 rounded-full 
              cursor-pointer p-[5px] hover:bg-slate-200"
                      />
                      <DeleteIcon
                        onClick={() =>
                          deleteTagFunction(
                            singleTag,
                            allTags,
                            setAllTags,
                            allChallenges,
                            setAllChallenges,
                            filterByTags,
                            setFilterByTags
                          )
                        }
                        className="text-slate-400 rounded-full 
              cursor-pointer p-[5px] hover:bg-slate-200"
                      />
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="text-slate-400 text-[12px] w-full h-[50px] text-center flex items-center justify-center">
              <p>There are no tags at this moment...</p>
            </div>
          )}
        </div>
        {/*line part*/}
        <div className="flex items-center mt-[28px] mx-[20px] justify-center">
          <hr className="w-full"></hr>
        </div>
        {/*Reset part*/}
        <div
          onClick={() => {
            setFilterByTags([]);
            inputRef.current?.focus();
          }}
          className="flex justify-end items-center  mx-[13px] mt-4 text-gray-400   py-[10px]"
        >
          <div>
            <RestartAltIcon sx={{ fontSize: 22 }} className="text-slate-400" />
          </div>
          <button className="p-2 text-[13px]">Reset</button>
        </div>
      </div>
    </div>
  );
}

export default TagsDropDown;
