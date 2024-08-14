import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAppContext } from "./ContextApi";
import TopBar from "./Components/ChallengesArea/TopBar";
import SearchAndFilterBar from "./Components/ChallengesArea/SearchAndFilterBar";
import AllChallenges from "./Components/ChallengesArea/AllChallnges";
import DifficultyDropDown from "./Components/dropDowns/DifficultyDropDown";
import LanguageDropDown from "./Components/dropDowns/LanguageDropDown";
import StatusDropDown from "./Components/dropDowns/StatusDropDown";
import TagsDropDown from "./Components/dropDowns/tagsDropDown";

export interface FilterButton {
  id: number;
  name: string;
  isOpened: boolean;
}

function ChallengesArea() {
  const {
    darkModeObject: { darkMode },
    openSideBarObject: { openSideBar },
  } = useAppContext();

  const darkModeString =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-700 text-white"
      : "bg-slate-50";

  const filterButtonsArray = [
    { id: 1, name: "Language", isOpened: false },
    {
      id: 2,
      name: "Difficulty",
      isOpened: false,
    },
    {
      id: 3,
      name: "Status",
      isOpened: false,
    },
    {
      id: 4,
      name: "Tags",
      isOpened: false,
    },
  ];
  //Array of languages
  const [languagesArray, setLanguagesArray] = useState([
    { id: 1, name: "Javascript", isSelected: true },
    { id: 2, name: "Python", isSelected: false },
    { id: 3, name: "Go", isSelected: false },
  ]);

  const [filterButtons, setFilterButtons] = useState(filterButtonsArray);
  const [isDifficultyOpened, setIsDifficultyOpened] = useState(false);
  const [isLanguageOpened, setIsLanguageOpened] = useState(false);
  const [isStatusOpened, setIsStatusOpened] = useState(false);

  useLayoutEffect(() => {
    setIsLanguageOpened(filterButtons[0].isOpened ? true : false);
    setIsDifficultyOpened(filterButtons[1].isOpened ? true : false);
    setIsStatusOpened(filterButtons[2].isOpened ? true : false);
  }, [filterButtons]);

  return (
    <div className={`w-full min-h-screen p-5 pt-6  ${darkModeString}`}>
      {/* Soft Layer */}
      {openSideBar && (
        <div className="w-full h-full bg-black opacity-15 fixed top-0 left-0 z-30"></div>
      )}

      {/* Open the difficulty drop down when the isDifficultyOpened is true */}
      {isDifficultyOpened && (
        <DifficultyDropDown
          filterButtons={filterButtons}
          setFilterButtons={setFilterButtons}
        />
      )}

      {/* Open the language drop down when the isLanguageOpened is true */}
      {isLanguageOpened && (
        <LanguageDropDown
          filterButtons={filterButtons}
          setFilterButtons={setFilterButtons}
        />
      )}
      {/* Open the status drop down when the isStatusOpened is true */}
      {isStatusOpened && (
        <StatusDropDown
          filterButtons={filterButtons}
          setFilterButtons={setFilterButtons}
        />
      )}

      <TagsDropDown />

      <TopBar />

      <SearchAndFilterBar
        filterButtons={filterButtons}
        setFilterButtons={setFilterButtons}
      />

      <AllChallenges />
    </div>
  );
}

export default ChallengesArea;
