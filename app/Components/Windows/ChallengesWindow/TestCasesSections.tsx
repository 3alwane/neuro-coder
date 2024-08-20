import { useAppContext } from '@/app/ContextApi';
import { useChallengeWindowContext } from '../ChallengeWindow';

export default function TestCases() {
  const {
    darkModeObject: { darkMode },
  } = useAppContext();

  const {
    testCasesObject: { testCases, setTestCases },
  } = useChallengeWindowContext();

  const darkModeColor =
    darkMode !== null && darkMode[1].isSelected
      ? 'bg-slate-700 text-white border border-slate-500 '
      : 'bg-white border';
  // const [testCases, setTestCases] = useState([
  //   { id: 1, input: '', output: '' },
  //   { id: 2, input: '', output: '' },
  // ]);
  function updateTheCasesInputs(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string,
  ) {
    setTestCases((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, [field]: e.target.value } : item,
      ),
    );
  }

  return (
    <div className="w-full">
      <span className="font-semibold text-[14px] text-gray-600">
        Test Cases
      </span>
      <div className="flex flex-col gap-3 mt-3">
        {testCases.map((testCase, index) => (
          <div key={testCase.id} className="flex gap-4 items-center">
            <div className="flex gap-2 items-center w-full">
              <p className="text-[12px] text-gray-400 w-[80px]">
                Test Case {testCase.id}:
              </p>
              <input
                value={testCase.input}
                className={` ${darkModeColor} outline-none  p-2 rounded-md text-[12px] w-1/3`}
                placeholder="input"
                onChange={(e) => {
                  updateTheCasesInputs(e, index, 'input');
                }}
              />
              <input
                value={testCase.output}
                className={` ${darkModeColor}  p-2 outline-none rounded-md text-[12px] w-1/3`}
                placeholder="output"
                onChange={(e) => {
                  updateTheCasesInputs(e, index, 'output');
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-red-500 text-[11px] mt-4">Please Select a type!</p>
    </div>
  );
}
