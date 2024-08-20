import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  useContext,
  InputHTMLAttributes,
  useRef,
} from 'react';

import { useAppContext } from '@/app/ContextApi';
import CloseIcon from '@mui/icons-material/Close';
import ChallengeTitle from './ChallengesWindow/ChallengeTitle';
import ChallengeInstructions from './ChallengesWindow/ChallengeInstructions';
import { challenges } from '@/data/AllChallenges';
import LanguageSection from './ChallengesWindow/LanguageSection';
import DifficultySection from './ChallengesWindow/DifficultySection';
import TypeSection from './ChallengesWindow/TypeSection';
import StarterCode from './ChallengesWindow/starterCode';
import TestCases from './ChallengesWindow/TestCasesSections';

interface ErrorMessageItem {
  id: number;
  inputName: string;
  errorMessage: string;
  show: boolean;
}

interface TestCase {
  id: number;
  input: string;
  output: string;
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

  languageObject: {
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
  };

  difficultyObject: {
    difficulty: string;
    setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  };

  typeObject: {
    type: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
  };

  starterCodeObject: {
    starterCode: string;
    setStarterCode: React.Dispatch<React.SetStateAction<string>>;
  };

  errorMessagesObject: {
    errorMessages: ErrorMessageItem[];
    setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessageItem[]>>;
  };

  testCasesObject: {
    testCases: TestCase[];
    setTestCases: React.Dispatch<React.SetStateAction<TestCase[]>>;
  };
}
const defaultState = {
  inputTitleObject: {
    title: '',
    setTitle: () => {},
  },

  inputInstructionsObjct: {
    instructions: '',
    setInstructions: () => {},
  },

  languageObject: {
    language: '',
    setLanguage: () => {},
  },

  difficultyObject: {
    difficulty: '',
    setDifficulty: () => {},
  },

  typeObject: {
    type: '',
    setType: () => {},
  },

  starterCodeObject: {
    starterCode: '',
    setStarterCode: () => {},
  },

  errorMessagesObject: {
    errorMessages: [],
    setErrorMessage: () => {},
  },

  testCasesObject: {
    testCases: [],
    setTestCases: () => {},
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
    allChallengesObject: { allChallenges, setAllChallenges },
  } = useAppContext();

  //Toggle dark mode
  const darkModeWindow =
    darkMode !== null && darkMode[1].isSelected
      ? 'bg-slate-800 text-white '
      : 'bg-white border border-slate-50';

  //Variable states of the challenge window form
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [language, setLanguage] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('');
  const [starterCode, setStarterCode] = useState('');
  const [testCases, setTestCases] = useState([
    { id: 1, input: '', output: '' },
    { id: 2, input: '', output: '' },
  ]);

  const [errorMessages, setErrorMessage] = useState<ErrorMessageItem[]>([
    { id: 1, inputName: 'title', errorMessage: '', show: false },
    { id: 2, inputName: 'instructions', errorMessage: '', show: false },
    { id: 3, inputName: 'language', errorMessage: '', show: false },
    { id: 4, inputName: 'difficulty', errorMessage: '', show: false },
    { id: 5, inputName: 'type', errorMessage: '', show: false },
    { id: 6, inputName: 'starterCode', errorMessage: '', show: false },
    { id: 7, inputName: 'testCases', errorMessage: '', show: false },
  ]);

  console.log(testCases);

  function submitTheChallenge(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //Check if the input title is empty or not
    let inputErrorMessage = '';
    //
    if (title.trim().length === 0) {
      inputErrorMessage = 'The input title is still empty!';
      setErrorMessage((prevState) =>
        prevState.map((item) => {
          if (item.inputName === 'title') {
            return {
              ...item,
              show: true,
              errorMessage: inputErrorMessage,
            };
          }

          return { ...item };
        }),
      );
    } else {
      //Find if the title already exists in the challenges array
      const findChallengeTitle = challenges.find(
        (challenge) => challenge.title.toLowerCase() === title.toLowerCase(),
      );

      if (findChallengeTitle) {
        inputErrorMessage = 'The challenge title already exists';
        setErrorMessage((prevState) =>
          prevState.map((item) => {
            if (item.inputName === 'title') {
              return {
                ...item,
                show: true,
                errorMessage: inputErrorMessage,
              };
            }

            return { ...item };
          }),
        );
      }
    }

    //Check if the instructions is empty
    if (isQuillEmpty(instructions)) {
      setErrorMessage((prevState) =>
        prevState.map((item) => {
          if (item.inputName === 'instructions') {
            return {
              ...item,
              show: true,
              errorMessage: 'The challenges instructions is still empty!',
            };
          }

          return { ...item };
        }),
      );
    }

    //Check if the language is selected or not
    if (language.trim().length === 0) {
      setErrorMessage((prevState) =>
        prevState.map((item) => {
          if (item.inputName === 'language') {
            return {
              ...item,
              show: true,
              errorMessage: 'Please selected a language',
            };
          }
          return item;
        }),
      );
    }

    //Check if the difficulty is selected or not
    if (difficulty.trim().length === 0) {
      setErrorMessage((prevState) =>
        prevState.map((item) => {
          if (item.inputName === 'difficulty') {
            return {
              ...item,
              show: true,
              errorMessage: 'Please selected a difficulty',
            };
          }
          return item;
        }),
      );
    }

    //Check if the type is selected or not
    if (type.trim().length === 0) {
      setErrorMessage((prevState) =>
        prevState.map((item) => {
          if (item.inputName === 'type') {
            return {
              ...item,
              show: true,
              errorMessage: 'Please selected a type',
            };
          }
          return item;
        }),
      );
    }

    //Check if the starter code is empty or not
    if (starterCode.trim().length === 0) {
      setErrorMessage((prevState) =>
        prevState.map((item) => {
          if (item.inputName === 'starterCode') {
            return {
              ...item,
              show: true,
              errorMessage: 'The starter code input is still empty!',
            };
          }
          return item;
        }),
      );
    }

    const areAllTestCasesFilled = testCases.every(
      (testCase) =>
        testCase.input.trim() !== '' && testCase.output.trim() !== '',
    );

    console.log(areAllTestCasesFilled);
  }

  function isQuillEmpty(value: string) {
    return value.replace(/<(.|\n)*?>/g, '').trim().length === 0;
  }

  //Reset all show and the errorMessage proprities when the window is opened
  useEffect(() => {
    if (openChallengeWindow) {
      setErrorMessage((prevState) =>
        prevState.map((item) => ({ ...item, show: false, errorMessage: '' })),
      );
    }
  }, [openChallengeWindow]);

  return (
    <ChallengeWindowContext.Provider
      value={{
        inputTitleObject: { title, setTitle },
        inputInstructionsObjct: { instructions, setInstructions },
        errorMessagesObject: { errorMessages, setErrorMessage },
        languageObject: { language, setLanguage },
        typeObject: { type, setType },
        difficultyObject: { difficulty, setDifficulty },
        starterCodeObject: { starterCode, setStarterCode },
        testCasesObject: { testCases, setTestCases },
      }}
    >
      <div
        className={`  ${darkModeWindow} ${
          openChallengeWindow ? 'block' : 'hidden'
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
