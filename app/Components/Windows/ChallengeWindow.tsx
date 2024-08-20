import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  useContext,
  InputHTMLAttributes,
  useRef,
} from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import { useAppContext } from "@/app/ContextApi";
import CloseIcon from "@mui/icons-material/Close";
import ChallengeTitle from "./ChallengesWindow/ChallengeTitle";
import ChallengeInstructions from "./ChallengesWindow/ChallengeInstructions";

interface ErrorMessageItem {
  id: number;
  inputName: string;
  errorMessage: string;
  show: boolean;
}

interface ChallengeWindowState {
  inputTitleObject: {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
  };

  inputInstructionsObjct: {
    instructions: string;
    setInstructions: React.Dispatch<React.SetStateAction<string>>;
  };
  errorMessagesObject: {
    errorMessages: ErrorMessageItem[];
    setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessageItem[]>>;
  };
}
const defaultState = {
  inputTitleObject: {
    title: "",
    setTitle: () => {},
  },

  inputInstructionsObjct: {
    instructions: "",
    setInstructions: () => {},
  },

  errorMessagesObject: {
    errorMessages: [],
    setErrorMessage: () => {},
  },
};
const ChallengeWindowContext =
  createContext<ChallengeWindowState>(defaultState);

// Create a custom hook to use the context
export const useChallengeWindowContext = () =>
  useContext(ChallengeWindowContext);

function ChallengeWindow() {
  //Get the variable states from the context API
  const {
    openChallengeWindowObject: { openChallengeWindow },
    darkModeObject: { darkMode },
  } = useAppContext();

  //Toggle dark mode
  const darkModeWindow =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-800 text-white "
      : "bg-white border border-slate-50";

  //Variable states of the challenge window form
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errorMessages, setErrorMessage] = useState<ErrorMessageItem[]>([
    { id: 1, inputName: "title", errorMessage: "", show: false },
    { id: 2, inputName: "instructions", errorMessage: "", show: false },
  ]);

  function submitTheChallenge(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //Check if the input title is empty or not
    if (title.trim().length === 0) {
      setErrorMessage((prevState) =>
        prevState.map((item) => {
          if (item.inputName === "title") {
            return {
              ...item,
              show: true,
              errorMessage: "The input title is still empty!",
            };
          }

          return { ...item };
        })
      );
    }

    if (isQuillEmpty(instructions)) {
      setErrorMessage((prevState) =>
        prevState.map((item) => {
          if (item.inputName === "instructions") {
            return {
              ...item,
              show: true,
              errorMessage: "The challenges instructions is still empty!",
            };
          }

          return { ...item };
        })
      );
    }
  }

  function isQuillEmpty(value: string) {
    return value.replace(/<(.|\n)*?>/g, "").trim().length === 0;
  }

  return (
    <ChallengeWindowContext.Provider
      value={{
        inputTitleObject: { title, setTitle },
        inputInstructionsObjct: { instructions, setInstructions },
        errorMessagesObject: { errorMessages, setErrorMessage },
      }}
    >
      <div
        className={`  ${darkModeWindow} ${
          openChallengeWindow ? "block" : "hidden"
        } top-4 rounded-lg p-5 absolute   z-[90] w-[80%] max-sm:w-[98%] left-1/2 -translate-x-1/2   shadow-md`}
      >
        {/*the form*/}
        <form onSubmit={submitTheChallenge}>
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

function StarterCode() {
  const {
    darkModeObject: { darkMode },
  } = useAppContext();
  const [theme, setTheme] = useState("tomorrow");

  const darkModeInput =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-700 text-white border border-slate-500 "
      : "bg-white border";

  useEffect(() => {
    if (darkMode !== null && darkMode[1].isSelected) {
      setTheme("solarized_dark");
    } else {
      setTheme("tomorrow");
    }
  }, [darkMode]);

  console.log(theme);

  return (
    <div className="flex flex-col gap-2 relative">
      <span className="font-semibold text-[14px] text-gray-600">
        Starter Code
      </span>
      <div className="border rounded-md overflow-hidden mr-5 mt-1">
        <AceEditor
          style={{
            fontFamily: "monospace",
            fontSize: "14px",
            backgroundColor:
              darkMode !== null && darkMode[1].isSelected
                ? "#334155 "
                : "white",
            color:
              darkMode !== null && darkMode[1].isSelected ? "white" : "black",
          }}
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
  const {
    darkModeObject: { darkMode },
  } = useAppContext();

  const darkModeInput =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-700 text-white border border-slate-500 "
      : "bg-white border";

  return (
    <div className="flex flex-col gap-2 w-1/2">
      <span className="font-semibold text-[14px] text-gray-600">Language</span>
      <select
        className={` ${darkModeInput} poppins   p-[10px] border rounded-md text-[12px] text-gray-600 pr-[12px]`}
      >
        <option value="" disabled selected>
          Select language
        </option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="go">Go</option>

        {/* Add more languages as needed */}
      </select>
      <p className="text-red-500 text-[11px]">Please Select a language!</p>
    </div>
  );
}

function DifficultySection() {
  const {
    darkModeObject: { darkMode },
  } = useAppContext();

  const darkModeColor =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-700 text-white border border-slate-500 "
      : "bg-white border";

  return (
    <div className="flex flex-col gap-2 w-1/2">
      <span className="font-semibold text-[14px] text-gray-600">
        Difficulty
      </span>
      <select
        className={` ${darkModeColor}   p-[10px] border rounded-md text-[12px] text-gray-600 pr-[12px]`}
      >
        <option value="" disabled selected>
          Select Difficulty
        </option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <p className="text-red-500 text-[11px]">Please Select a difficulty!</p>
    </div>
  );
}

function TypeSection() {
  const {
    darkModeObject: { darkMode },
  } = useAppContext();

  const darkModeColor =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-700 text-white border border-slate-500 "
      : "bg-white border";

  return (
    <div className="flex flex-col gap-2 w-1/2">
      <span className="font-semibold text-[14px] text-gray-600">Type</span>
      <select
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
      <p className="text-red-500 text-[11px]">Please Select a type!</p>
    </div>
  );
}

function TestCases() {
  const {
    darkModeObject: { darkMode },
  } = useAppContext();

  const darkModeColor =
    darkMode !== null && darkMode[1].isSelected
      ? "bg-slate-700 text-white border border-slate-500 "
      : "bg-white border";

  const testCases = [
    { id: 1, inputPlaceholder: "Input", outputPlaceholder: "Expected Output" },
    { id: 2, inputPlaceholder: "Input", outputPlaceholder: "Expected Output" },
    // Add more test cases as needed
  ];

  return (
    <div className="w-full">
      <span className="font-semibold text-[14px] text-gray-600">
        Test Cases
      </span>
      <div className="flex flex-col gap-3 mt-3">
        {testCases.map((testCase) => (
          <div key={testCase.id} className="flex gap-4 items-center">
            <div className="flex gap-2 items-center w-full">
              <p className="text-[12px] text-gray-400 w-[80px]">
                Test Case {testCase.id}:
              </p>
              <input
                className={` ${darkModeColor} outline-none  p-2 rounded-md text-[12px] w-1/3`}
                placeholder={testCase.inputPlaceholder}
              />
              <input
                className={` ${darkModeColor}  p-2 outline-none rounded-md text-[12px] w-1/3`}
                placeholder={testCase.outputPlaceholder}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-red-500 text-[11px] mt-4">Please Select a type!</p>
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
