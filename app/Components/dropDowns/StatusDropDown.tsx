import { StatusItem, useAppContext } from "@/app/ContextApi";
import React, { useRef, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { FilterButton } from "@/app/ChallengesArea";

function StatusDropDown({
  filterButtons,
  setFilterButtons,
}: {
  filterButtons: FilterButton[];
  setFilterButtons: React.Dispatch<FilterButton[]>;
}) {
  const {
    darkModeObject: { darkMode },
    statusArrayObject: { statusArray, setStatusArray },
    statusDropDownPositionsObject: { statusDropDownPositions },
    filterByStatusObject: { setFilterByStatus },
  } = useAppContext();

  const darkModeString =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-600 text-white "
      : "bg-white  border border-slate-50";

  function handleClickedElement(index: number) {
    const updateStatusArray = statusArray.map((singleItem, i) => {
      if (index === i) {
        setFilterByStatus(singleItem.name);
        return { ...singleItem, isSelected: true };
      }

      return { ...singleItem, isSelected: false };
    });

    setStatusArray(updateStatusArray);

    //Update the filter buttons state to close the drop down when we click on the status
    const copyFilterButtons = filterButtons.map((singleFilterButton) => {
      return { ...singleFilterButton, isOpened: false };
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

    if (filterButtons[3].isOpened) {
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
        top: statusDropDownPositions.top + 49,
        left: statusDropDownPositions.left - 50,
      }}
      className={` ${darkModeString} fixed z-50 py-3 p-2 w-[160px] select-none  shadow-md rounded-lg flex flex-col gap-2`}
    >
      {statusArray.map((singleStatus: StatusItem, index: number) => (
        <div
          key={index}
          onClick={() => handleClickedElement(index)}
          className={`flex  justify-between ${
            darkMode !== null && darkMode[1].isSelected
              ? "hover:bg-slate-700"
              : "hover:bg-slate-100"
          }  p-2 px-3 rounded-md gap-1 items-center cursor-pointer`}
        >
          <span
            className={`text-[14px] ${
              singleStatus.isSelected ? "text-red-500" : "text-slate-400"
            } `}
          >
            {singleStatus.name}
          </span>
          {singleStatus.isSelected && (
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
      ))}
    </div>
  );
}

export default StatusDropDown;
