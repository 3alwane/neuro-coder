import React, { useEffect, useRef } from "react";
import { useAppContext } from "@/app/ContextApi";
import { useChallengeWindowContext } from "../ChallengeWindow";

function ChallengeTitle() {
  //Variables
  const {
    darkModeObject: { darkMode },
    openChallengeWindowObject: { openChallengeWindow },
  } = useAppContext();

  const {
    inputTitleObject: { title, setTitle },
    errorMessagesObject: { errorMessages, setErrorMessage },
  } = useChallengeWindowContext();

  const darkModeInput =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-700 text-white border border-slate-500 "
      : "bg-white border";

  const inputTitleRef = useRef<HTMLInputElement>(null);

  //Functions
  function updateTitle(e: React.ChangeEvent<HTMLInputElement>) {
    //Update the value in the input
    setTitle(e.target.value);
    //When the user types in, hide the error
    setErrorMessage((prevState) =>
      prevState.map((item) => {
        if (item.inputName === "title") {
          return { ...item, show: false, errorMessage: "" };
        }
        return item;
      })
    );
  }

  //Use effects
  useEffect(() => {
    setTitle("");
    if (inputTitleRef.current) {
      inputTitleRef.current.focus();
    }
  }, [openChallengeWindow]);

  return (
    <div className="flex flex-col gap-2 relative mt-3">
      <span className="font-semibold text-[14px] text-gray-600">
        Challenge Title
      </span>

      <input
        ref={inputTitleRef}
        type="text"
        placeholder="Challenge Title..."
        value={title}
        name="title"
        onChange={updateTitle}
        className={` ${darkModeInput}  w-full p-[11px]  outline-none    text-[12px] rounded-md font-light`}
      />
      {/*Error Message*/}
      {errorMessages[0].show && (
        <p className="text-red-500 text-[11px]">
          {errorMessages[0].errorMessage}
        </p>
      )}
    </div>
  );
}

export default ChallengeTitle;
