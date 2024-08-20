import React, { useRef, useMemo, useEffect } from "react";
import ReactQuill from "react-quill";
import { useAppContext } from "@/app/ContextApi";
import { useChallengeWindowContext } from "../ChallengeWindow";
function ChallengeInstructions() {
  const {
    darkModeObject: { darkMode },
    openChallengeWindowObject: { openChallengeWindow },
  } = useAppContext();

  const {
    inputInstructionsObjct: { instructions, setInstructions },
    errorMessagesObject: { errorMessages, setErrorMessage },
  } = useChallengeWindowContext();

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
      ],
    }),
    []
  );

  const instructionsInputRef = useRef<ReactQuill>(null);

  //Functions:
  function updateInputInstructions(content: string) {
    //Update the value in the input
    setInstructions(content);
    //When the user types in, hide the error
    setErrorMessage((prevState) =>
      prevState.map((item) => {
        if (item.inputName === "instructions") {
          return { ...item, show: false, errorMessage: "" };
        }
        return item;
      })
    );
  }

  useEffect(() => {
    setInstructions("");
  }, [openChallengeWindow]);

  return (
    <div className="flex flex-col gap-2 relative">
      <span className="font-semibold text-[14px] text-gray-600 ">
        Challenge Instructions
      </span>

      <div
        className={`quill-wrapper rounded-md w-full ${
          darkMode !== null && darkMode[1].isSelected
            ? "dark-mode"
            : "light-mode"
        }`}
      >
        <ReactQuill
          ref={instructionsInputRef}
          theme="snow"
          value={instructions}
          placeholder="Challenge Instructions..."
          modules={modules}
          onChange={updateInputInstructions}
        />
      </div>

      {/*Error Message*/}
      {errorMessages[1].show && (
        <p className="text-red-500 text-[11px]">
          {errorMessages[1].errorMessage}
        </p>
      )}
    </div>
  );
}

export default ChallengeInstructions;
