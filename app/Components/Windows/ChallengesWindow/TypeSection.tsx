import { useAppContext } from "@/app/ContextApi";
import { useChallengeWindowContext } from "../ChallengeWindow";
import { useEffect } from "react";
export default function TypeSection() {
  const {
    darkModeObject: { darkMode },
    openChallengeWindowObject: { openChallengeWindow },
  } = useAppContext();

  const {
    typeObject: { type, setType },
    errorMessagesObject: { errorMessages, setErrorMessage },
  } = useChallengeWindowContext();

  const darkModeColor =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-700 text-white border border-slate-500 "
      : "bg-white border";

  function updateType(e: React.ChangeEvent<HTMLSelectElement>) {
    setType(e.target.value);
    //When the user selects, hide the error
    setErrorMessage((prevState) =>
      prevState.map((item) => {
        if (item.inputName === "type") {
          return { ...item, show: false, errorMessage: "" };
        }
        return item;
      })
    );
  }

  useEffect(() => {
    if (openChallengeWindow) {
      setType("");
    }
  }, [openChallengeWindow]);

  return (
    <div className="flex flex-col gap-2 w-1/2">
      <span className="font-semibold text-[14px] text-gray-600">Type</span>
      <select
        onChange={updateType}
        value={type}
        className={` ${darkModeColor}   p-[10px] border rounded-md text-[12px] text-gray-600 pr-[12px]`}
      >
        <option value="" disabled selected>
          Select Type
        </option>
        <option value="algorithm">Algorithm</option>
        <option value="data-structure">Data Structure</option>
        <option value="loops">Loops</option>
        <option value="functions">Functions</option>
        <option value="arrays">Arrays</option>
        <option value="conditionals">Conditionals</option>
        <option value="string-manipulation">String Manipulation</option>
        {/* Add more types as needed */}
      </select>
      {errorMessages[4].show && (
        <p className="text-red-500 text-[11px]">
          {errorMessages[4].errorMessage}
        </p>
      )}
    </div>
  );
}
