import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useAppContext } from "@/app/ContextApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TagsDropDown() {
  const {
    darkModeObject: { darkMode },
  } = useAppContext();

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

  const [isTagHovered, setIsHovered] = useState(false);

  return (
    <div className="">
      {/*Background white*/}
      <div
        style={{ top: 210, left: 1234 }}
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
              placeholder="Search a Tag..."
              className={`bg-transparent outline-none w-full font-light ${darkModeInputSearch} `}
            />
          </div>
          <button className="bg-gradient-to-r from-red-500 to-pink-600 ml-2 p-[9px]  flex w-[50%]   rounded-md text-white items-center justify-center max-lg:w-[25%]">
            <span className="max-md:hidden">Add Tag</span>
          </button>
        </div>
        {/*Tags part*/}
        <div className={`mx-3 flex flex-wrap gap-4 items-center mt-3 `}>
          {/* String tag */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`text-slate-500 px-2 flex gap-2 p-[5px] items-center bg-slate-100 
          rounded-lg ${darkModeTags}    text-[13px]  `}
          >
            <p className={` cursor-pointer  rounded-lg  select-none `}>
              strings
            </p>

            {/* Edit and delete buttons */}

            {isTagHovered && (
              <div className="flex  items-center">
                <EditIcon
                  className="text-slate-400 rounded-full 
              cursor-pointer p-[5px] hover:bg-slate-200"
                />
                <DeleteIcon
                  className="text-slate-400 rounded-full 
              cursor-pointer p-[5px] hover:bg-slate-200"
                />
              </div>
            )}
          </div>

          <div
            className={`text-slate-500 px-2 flex gap-2 p-[5px] items-center bg-slate-100 
          rounded-lg ${darkModeTags}   text-[13px] `}
          >
            <p className={` cursor-pointer  rounded-lg  select-none`}>
              strings
            </p>
          </div>
        </div>
        {/*line part*/}
        <div className="flex items-center mt-[28px] mx-[20px] justify-center">
          <hr className="w-full"></hr>
        </div>
        {/*Reset part*/}
        <div className="flex justify-end items-center  mx-[13px] mt-4 text-gray-400   py-[10px]">
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
