import { useEffect, useState } from 'react';
import { useChallengeWindowContext } from '../ChallengeWindow';
import { useAppContext } from '@/app/ContextApi';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/ext-language_tools';

export default function StarterCode() {
  const {
    darkModeObject: { darkMode },
    openChallengeWindowObject: { openChallengeWindow },
  } = useAppContext();

  const {
    starterCodeObject: { starterCode, setStarterCode },
    errorMessagesObject: { errorMessages, setErrorMessage },
    languageObject: { language },
    inputTitleObject: { title },
  } = useChallengeWindowContext();

  function updateStarterCode(e: string) {
    setStarterCode(e);
    //When the user types in, hide the error
    setErrorMessage((prevState) =>
      prevState.map((item) => {
        if (item.inputName === 'starterCode') {
          return { ...item, show: false, errorMessage: '' };
        }
        return item;
      }),
    );
  }

  //Add a function synthax based on the language

  useEffect(() => {
    let functionBoilerPlate = '';

    switch (language) {
      case 'javascript':
        functionBoilerPlate = `function ${title}() {\n  // Your code here\n}`;
        break;
      case 'python':
        functionBoilerPlate = `def ${title}():\n    # Your code here`;
        break;

      case 'go':
        functionBoilerPlate = `package main\n\nfunc ${title}() {\n  // Your code here\n}`;
        break;
      default:
        functionBoilerPlate = '';
        break;
    }

    setStarterCode(functionBoilerPlate);
  }, [language, title, setStarterCode]);

  useEffect(() => {
    if (openChallengeWindow) {
      setStarterCode('');
    }
  }, [openChallengeWindow]);

  return (
    <div className="flex flex-col gap-2 relative">
      <span className="font-semibold text-[14px] text-gray-600">
        Starter Code
      </span>
      <div className="border rounded-md overflow-hidden mr-5 mt-1">
        <AceEditor
          style={{
            fontFamily: 'monospace',
            fontSize: '14px',
            backgroundColor:
              darkMode !== null && darkMode[1].isSelected
                ? '#334155 '
                : 'white',
            color:
              darkMode !== null && darkMode[1].isSelected ? 'white' : 'black',
          }}
          onChange={updateStarterCode}
          placeholder="Your starter code..."
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
          value={starterCode}
        />
      </div>

      {/*Error Message*/}
      {errorMessages[5].show && (
        <p className="text-red-500 text-[11px]">
          {errorMessages[5].errorMessage}
        </p>
      )}
    </div>
  );
}
