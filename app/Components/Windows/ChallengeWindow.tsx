import React, { createContext, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { useAppContext } from "@/app/ContextApi";
import CloseIcon from "@mui/icons-material/Close";

interface ChallengeWindowState {}
const defaultState = {};
const ChallengeWindowContext =
  createContext<ChallengeWindowState>(defaultState);

function ChallengeWindow() {
  const {
    openChallengeWindowObject: { openChallengeWindow },
    darkModeObject: { darkMode },
  } = useAppContext();

  const darkModeWindow =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-800 text-white "
      : "bg-white border border-slate-50";

  return (
    <ChallengeWindowContext.Provider value={{}}>
      <div
        className={`  ${darkModeWindow} ${
          openChallengeWindow ? "block" : "hidden"
        } top-4 rounded-lg p-5 absolute   z-[90] w-[80%] max-sm:w-[98%] left-1/2 -translate-x-1/2   shadow-md`}
      >
        {/*the form*/}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex max-sm:flex-col  gap-8 m-[10px]  ">
            {/*  */}
            {/* Left Section */}
            <div className="flex flex-col gap-6 w-1/2 max-sm:w-full">
              <Header />
              <ChallengeTitle />
              <ChallengeInstructions />
              <div className="w-full  ">
                <div className="flex  gap-2">
                  <TagsSection />
                  <LanguageSection />
                </div>
                <div className="flex mt-2  gap-2">
                  <DifficultySection />
                  <TypeSection />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col w-1/2 gap-6 mt-3 max-sm:w-full">
              <StarterCode />
              <TestCases />
              <Buttons />
            </div>
          </div>
        </form>
      </div>
    </ChallengeWindowContext.Provider>
  );
}

export default ChallengeWindow;

function Header() {
  const {
    openChallengeWindowObject: { setOpenChallengeWindow },
  } = useAppContext();
  return (
    <div className="flex justify-between items-center p-2 rounded-lg ">
      <div className="flex items-center gap-2">
        {/*Icon*/}
        <div className="w-[30px] h-[30px] bg-red-200 rounded-full flex items-center justify-center">
          <svg
            fill="red"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            version="1.2"
            baseProfile="tiny"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.383 4.318c-.374-.155-.804-.069-1.09.217-1.264 1.263-3.321 1.264-4.586 0-2.045-2.043-5.37-2.043-7.414 0-.188.187-.293.442-.293.707v13c0 .552.447 1 1 1s1-.448 1-1v-4.553c1.271-.997 3.121-.911 4.293.26 2.045 2.043 5.371 2.043 7.414 0 .188-.188.293-.442.293-.707v-8c0-.405-.244-.769-.617-.924z" />
          </svg>
        </div>

        <span className="text-lg font-bold  ">New Challenge</span>
      </div>
      {/*Icon*/}
      <CloseIcon
        onClick={() => setOpenChallengeWindow(false)}
        sx={{ fontSize: 18 }}
        className="text-gray-400 cursor-pointer"
      />
    </div>
  );
}

function ChallengeTitle() {
  const {
    darkModeObject: { darkMode },
  } = useAppContext();

  const darkModeInput =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-700 text-white border border-slate-500 "
      : "bg-white border";

  return (
    <div className="flex flex-col gap-2 relative mt-3">
      <span className="font-semibold text-[14px] text-gray-600">
        Challenge Title
      </span>

      <input
        type="text"
        placeholder="Challenge Title..."
        className={` ${darkModeInput}  w-full p-[11px]  outline-none    text-[12px] rounded-md font-light`}
      />
      {/*Error Message*/}
      <p className="text-red-500 text-[11px]">The title is still empty!</p>
    </div>
  );
}

function ChallengeInstructions() {
  const {
    darkModeObject: { darkMode },
  } = useAppContext();

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
          theme="snow"
          placeholder="Challenge Instructions..."
          modules={modules}
        />
      </div>

      {/*Error Message*/}
      <p className="text-red-500 text-[11px]">The field is sitll empty!</p>
    </div>
  );
}

function StarterCode() {
  return (
    <div className="flex flex-col gap-2 relative">
      <span className="font-semibold text-[14px] text-gray-600">
        Starter Code
      </span>
      <div className="border rounded-md overflow-hidden mr-5 mt-1">
        <AceEditor
          placeholder="Placeholder Text"
          mode="javascript"
          theme="tomorrow"
          name="blah2"
          lineHeight={19}
          showPrintMargin={true}
          showGutter={false}
          highlightActiveLine={false}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          fontSize={14}
          width="100%"
          height="370px"
          value={`function onLoad(editor) {
  console.log("i've loaded");
}`}
        />
      </div>

      {/*Error Message*/}
      <p className="text-red-500 text-[11px]">The field is sitll empty!</p>
    </div>
  );
}

function TagsSection() {
  return (
    <div className="flex flex-col gap-2 w-1/2">
      <span className="font-semibold text-[14px] text-gray-600">Tags</span>
      <div className="p-[10px] border rounded-md text-[12px] text-gray-400 pr-[12px] ">
        Select Tags
      </div>
      <p className="text-red-500 text-[11px]">Please Select a tags!</p>
    </div>
  );
}

function LanguageSection() {
  return (
    <div className="flex flex-col gap-2 w-1/2">
      <span className="font-semibold text-[14px] text-gray-600">Language</span>
      <div className="p-[10px] border rounded-md text-[12px] text-gray-400 pr-[12px] ">
        Select language
      </div>
      <p className="text-red-500 text-[11px]">Please Select a language!</p>
    </div>
  );
}

function DifficultySection() {
  return (
    <div className="flex flex-col gap-2 w-1/2">
      <span className="font-semibold text-[14px] text-gray-600">
        Difficulty
      </span>
      <div className="p-[10px] border rounded-md text-[12px] text-gray-400 pr-[12px] ">
        Select Difficulty
      </div>
      {/*Error Message*/}
      <p className="text-red-500 text-[11px]">Please Select a difficulty!</p>
    </div>
  );
}

function TypeSection() {
  return (
    <div className="flex flex-col gap-2 w-1/2">
      <span className="font-semibold text-[14px] text-gray-600">Type</span>
      <div className="p-[10px] border rounded-md text-[12px] text-gray-400 pr-[12px] ">
        Select Type
      </div>
      {/*Error Message*/}
      <p className="text-red-500 text-[11px]">Please Select a difficulty!</p>
    </div>
  );
}

function TestCases() {
  return (
    <div className="w-full">
      <span className="font-semibold text-[14px] text-gray-600">
        Test Cases
      </span>
      <div className="flex flex-col gap-3 mt-3">
        {/*Test case 1*/}
        <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center  w-full">
            <p className="text-[12px] text-gray-400  w-[80px]">Test Case 1:</p>
            <input
              className="border p-2 rounded-md text-[12px] w-1/3  "
              placeholder="Input"
            />
            <input
              className="border p-2 rounded-md text-[12px] w-1/3 "
              placeholder="Expected Output"
            />
          </div>
        </div>
        {/*Test case 2*/}
        <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center  w-full">
            <p className="text-[12px] text-gray-400  w-[80px]">Test Case 2:</p>
            <input
              className="border p-2 rounded-md text-[12px] w-1/3  "
              placeholder="Input"
            />
            <input
              className="border p-2 rounded-md text-[12px] w-1/3 "
              placeholder="Expected Output"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Buttons() {
  const {
    openChallengeWindowObject: { setOpenChallengeWindow },
  } = useAppContext();
  return (
    <div className="flex justify-end gap-2 mt-11 text-[13px] mb-3">
      <button
        onClick={() => setOpenChallengeWindow(false)}
        className="px-8  py-2 border rounded-lg text-gray-600 hover:bg-gray-100 "
      >
        Cancel
      </button>
      <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600  rounded-lg text-white  hover:bg-blue-600">
        Add New Challenge
      </button>
    </div>
  );
}
