import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "@/app/ContextApi";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function ChallengeDropDown() {
  const {
    darkModeObject: { darkMode },
    openChallengeDropDownObject: {
      openChallengeDropDown,
      setOpenChallengeDropDown,
    },

    challengesDropDownPositionsObject: {
      challengesDropDownPositions,
      setChallengesDropDownPositions,
    },

    sideBarMenuItemsObject: { sideBarMenuItems },
  } = useAppContext();

  //Array of languages
  const [options, setOptions] = useState([
    { id: 1, name: "Edit" },
    { id: 2, name: "Delete" },
  ]);

  const darkModeString =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-600 text-white "
      : "bg-white  border border-slate-50";

  const toggleDropDown = openChallengeDropDown ? "fixed" : "hidden";

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeDropDown() {
      setOpenChallengeDropDown(false);
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !sideBarMenuItems[0].isSelected
      ) {
        closeDropDown();
      }
    }

    if (openChallengeDropDown) {
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
  }, [openChallengeDropDown, setOpenChallengeDropDown]);

  return (
    <div
      ref={menuRef}
      style={{
        top: challengesDropDownPositions.top + 29,
        left: challengesDropDownPositions.left + 10,
      }}
      className={`${darkModeString} ${toggleDropDown} fixed p-1 py-4 px-3  w-[180px]  z-50 select-none shadow-md rounded-lg flex flex-col gap-4`}
    >
      {options.map((singleOption, index) => (
        <div
          key={index}
          className={`p-2 px-3 flex  rounded-md gap-2 items-center ${
            darkMode !== null && darkMode[1].isSelected
              ? "hover:bg-slate-700"
              : "hover:bg-slate-100"
          } cursor-pointer `}
        >
          <div className="">
            {singleOption.id === 1 && (
              <EditOutlinedIcon
                sx={{ fontSize: 22 }}
                className="text-red-500"
              />
            )}
            {singleOption.id === 2 && (
              <DeleteOutlineOutlinedIcon
                sx={{ fontSize: 22 }}
                className="text-red-500"
              />
            )}
          </div>
          <span className={`text-[15px] mt-1`}>{singleOption.name}</span>
        </div>
      ))}
    </div>
  );
}

export default ChallengeDropDown;
