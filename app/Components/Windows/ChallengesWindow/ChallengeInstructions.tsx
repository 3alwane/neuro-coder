"use client";
import React, { useRef, useMemo, useEffect } from "react";

import { useAppContext } from "@/app/ContextApi";
import { useChallengeWindowContext } from "../ChallengeWindow";

import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css";
function ChallengeInstructions() {
  const {
    darkModeObject: { darkMode },
    openChallengeWindowObject: { openChallengeWindow },
  } = useAppContext();

  const {
    inputInstructionsObjct: { instructions, setInstructions },
    errorMessagesObject: { errorMessages, setErrorMessage },
  } = useChallengeWindowContext();

  const { quill, quillRef } = useQuill({
    placeholder: "Challenge Instructions",
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
      ],
    },
  });

  //Clear the react quill editor
  useEffect(() => {
    setInstructions("");
    if (quill) {
      quill.setText("");
    }
  }, [openChallengeWindow]);

  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        setInstructions(quill.getText());

        //When the user types in, hide the error
        setErrorMessage((prevState) =>
          prevState.map((item) => {
            if (item.inputName === "instructions") {
              return { ...item, show: false, errorMessage: "" };
            }
            return item;
          })
        ); // Get text only
      });
    }
  }, [quill, openChallengeWindow]);

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
        <div>
          <div ref={quillRef} />
        </div>
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
