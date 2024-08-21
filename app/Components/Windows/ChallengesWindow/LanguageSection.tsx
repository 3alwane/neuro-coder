import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  useContext,
  InputHTMLAttributes,
  useRef,
} from "react";
import { useChallengeWindowContext } from "../ChallengeWindow";
import { useAppContext } from "@/app/ContextApi";

export default function LanguageSection() {
  const {
    darkModeObject: { darkMode },
    openChallengeWindowObject: { openChallengeWindow, setOpenChallengeWindow },
  } = useAppContext();

  const {
    languageObject: { language, setLanguage },
    errorMessagesObject: { errorMessages, setErrorMessage },
  } = useChallengeWindowContext();

  const darkModeInput =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-700 text-white border border-slate-500 "
      : "bg-white border";

  function updateLanguage(e: React.ChangeEvent<HTMLSelectElement>) {
    setLanguage(e.target.value);
    //When the user selects, hide the error
    setErrorMessage((prevState) =>
      prevState.map((item) => {
        if (item.inputName === "language") {
          return { ...item, show: false, errorMessage: "" };
        }
        return item;
      })
    );
  }

  useEffect(() => {
    if (openChallengeWindow) {
      setLanguage("");
    }
  }, [openChallengeWindow]);

  return (
    <div className="flex flex-col gap-2 w-1/2">
      <span className="font-semibold text-[14px] text-gray-600">Language</span>
      <select
        value={language}
        onChange={updateLanguage}
        className={` ${darkModeInput} poppins   p-[10px] border rounded-md text-[12px] text-gray-600 pr-[12px]`}
      >
        <option value="" disabled>
          Select language
        </option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="go">Go</option>

        {/* Add more languages as needed */}
      </select>
      {errorMessages[2].show && (
        <p className="text-red-500 text-[11px]">
          {errorMessages[2].errorMessage}
        </p>
      )}
    </div>
  );
}
