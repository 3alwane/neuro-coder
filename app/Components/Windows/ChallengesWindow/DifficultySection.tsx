import { useAppContext } from '@/app/ContextApi';
import { useChallengeWindowContext } from '../ChallengeWindow';

export default function DifficultySection() {
  const {
    darkModeObject: { darkMode },
  } = useAppContext();

  const {
    difficultyObject: { difficulty, setDifficulty },
    errorMessagesObject: { errorMessages, setErrorMessage },
  } = useChallengeWindowContext();

  const darkModeColor =
    darkMode !== null && darkMode[1].isSelected
      ? 'bg-slate-700 text-white border border-slate-500 '
      : 'bg-white border';

  function updateDifficulty(e: React.ChangeEvent<HTMLSelectElement>) {
    setDifficulty(e.target.value);
    //When the user selects, hide the error
    setErrorMessage((prevState) =>
      prevState.map((item) => {
        if (item.inputName === 'difficulty') {
          return { ...item, show: false, errorMessage: '' };
        }
        return item;
      }),
    );
  }

  return (
    <div className="flex flex-col gap-2 w-1/2">
      <span className="font-semibold text-[14px] text-gray-600">
        Difficulty
      </span>
      <select
        value={difficulty}
        onChange={updateDifficulty}
        className={` ${darkModeColor}   p-[10px] border rounded-md text-[12px] text-gray-600 pr-[12px]`}
      >
        <option value="" disabled selected>
          Select Difficulty
        </option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      {errorMessages[3].show && (
        <p className="text-red-500 text-[11px]">
          {errorMessages[3].errorMessage}
        </p>
      )}
    </div>
  );
}
