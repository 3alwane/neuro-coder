import React, { useRef, useState, useEffect } from "react";
import StyleIcon from "@mui/icons-material/Style";
import CloseIcon from "@mui/icons-material/Close";
import { useAppContext } from "@/app/ContextApi";
import { addTagFunction, editTagFunction } from "@/app/functions/tagsFunctions";
import { useChallengesAreaContext } from "@/app/ChallengesArea";

function TagWindow() {
  const {
    darkModeObject: { darkMode },
    openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
    allTagsObject: { allTags, setAllTags },
    allChallengesObject: { allChallenges, setAllChallenges },
    filterByTagsObject: { filterByTags, setFilterByTags },
  } = useAppContext();

  const { tagToEdit, setTagToEdit } = useChallengesAreaContext();

  const [inputTagName, setInputTagName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const darkModeWindow =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-600 text-white "
      : "bg-white border border-slate-50";

  const darkModeInput =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-700 text-white border border-slate-500 "
      : "bg-white border";

  const openToggle = openTagsWindow ? "absolute" : "hidden";

  const inputRef = useRef<HTMLInputElement>(null);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    //Update the input tag name
    setInputTagName(newValue);
    //Reset the error Message variable
    setErrorMessage("");
  }

  useEffect(() => {
    //if the tagEdit state is not null, set the inputTagName to false
    //otherwise show the tag we want to edit in the input
    if (tagToEdit === null) {
      setInputTagName("");
    } else {
      setInputTagName(tagToEdit);
    }

    //Reset the input field and the error message when the window is closed
    setErrorMessage("");

    //Set the focus to the input when the window is opened
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [openTagsWindow]);

  function updateAllTagsArray() {
    //Check the input is  empty
    if (inputTagName.trim().length === 0) {
      setErrorMessage("The input filed is still empty!");
      //exit the function
      return;
    }

    //Check if the tag already exists
    //-------------------------------$

    //1- Find the tag in the array using the find method
    const findTagInTheArray = allTags.find(
      (tag) => tag.name.toLowerCase() === inputTagName.toLowerCase()
    );

    //2- if the findTagArray is not undefined, it means that it exists
    if (findTagInTheArray) {
      setErrorMessage(`The tag ${findTagInTheArray.name} does already exist!`);
      return;
    }

    if (tagToEdit === null) {
      addTagFunction(inputTagName, allTags, setAllTags, setOpenTagsWindow);
    } else {
      editTagFunction(
        tagToEdit,
        inputTagName,
        allTags,
        setAllTags,
        allChallenges,
        setAllChallenges,
        setOpenTagsWindow,
        filterByTags,
        setFilterByTags
      );
    }

    resetTheTagToEditStateToNull();
  }

  //Set the tagToEdit as null when the user closes the window
  function resetTheTagToEditStateToNull() {
    setTagToEdit(null);
  }

  //I'm using this useEffect to set the focus to the input when the error message appears
  useEffect(() => {
    inputRef.current?.focus();
  }, [errorMessage]);

  return (
    <div
      className={` ${darkModeWindow} ${openToggle} max-md:w-[90%]  w-[37%]   flex flex-col gap-3   
     rounded-md shadow-md  left-1/2 top-[140px] -translate-x-1/2 z-[90]`}
    >
      {/*  */}
      {/* Header */}
      <div className="flex justify-between items-center pt-7 px-7">
        <div className="flex items-center gap-2">
          {/* Tag Icon */}
          <div className="w-[30px] h-[30px] bg-red-200 rounded-full flex items-center justify-center">
            <StyleIcon sx={{ fontSize: 17 }} className="text-red-500" />
          </div>
          {/* Category Header */}
          <span className="font-semibold">
            {tagToEdit ? "Edit Tag" : "New Tag"}
          </span>
        </div>
        {/* Close icon */}
        <CloseIcon
          onClick={() => {
            setOpenTagsWindow(false);
            resetTheTagToEditStateToNull();
          }}
          sx={{ fontSize: 15 }}
          className="text-slate-400 cursor-pointer"
        />
      </div>

      {/* Body */}
      <div className=" flex flex-col gap-2 pt-8 px-7">
        <span className="text-[13px] font-medium">Tag Name</span>
        <div className="flex flex-col gap-2">
          {/* Input */}
          <input
            ref={inputRef}
            onChange={handleInputChange}
            value={inputTagName}
            placeholder="Enter Tag Name..."
            className={`p-[10px] text-[12px] w-full rounded-md  outline-none ${darkModeInput}`}
          />
          <span className="text-red-500 text-[11px]">{errorMessage}</span>
        </div>
      </div>
      {/* Footer */}
      <div className="w-full p-[12px] my-5 flex gap-3 justify-end px-7 items-center">
        {/* Cancel Button */}
        <button
          onClick={() => {
            setOpenTagsWindow(false);
            resetTheTagToEditStateToNull();
          }}
          className="border border-slate-200 text-slate-400 text-[12px] p-2 px-6 rounded-md hover:border-slate-300 transition-all"
        >
          Cancel
        </button>

        <button
          onClick={updateAllTagsArray}
          className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-[12px] p-2 px-3 rounded-md transition-all"
        >
          {tagToEdit ? "Edit Tag" : "Add Tag"}
        </button>
      </div>
    </div>
  );
}

export default TagWindow;
