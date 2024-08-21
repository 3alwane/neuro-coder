import { useAppContext } from '@/app/ContextApi';

export default function ConfirmationWindow() {
  const {
    darkModeObject: { darkMode },
  } = useAppContext();
  //Toggle dark mode
  const darkModeWindow =
    darkMode !== null && darkMode[1].isSelected
      ? 'bg-slate-800 text-white '
      : 'bg-white border border-slate-50';
  return (
    <div
      className={` ${darkModeWindow}  w-[38%] max-sm:w-[91%] p-6 fixed  shadow-md  
    z-[90] rounded-lg flex items-center top-24 left-1/2 -translate-x-1/2`}
    >
      <div className=" rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-5">Delete Challenge</h2>
        <p
          className={`text-gray-600 mb-4 text-sm ${
            darkMode !== null && darkMode[1].isSelected
              ? 'text-slate-200'
              : 'text-slate-500'
          }`}
        >
          Are you sure you want to remove this challenge? The challenge will be
          permanently deleted
        </p>

        <div className="flex justify-end gap-2 mt-10 text-[13px] ">
          <button className="px-4  py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
            Cancel
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg text-white ">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
