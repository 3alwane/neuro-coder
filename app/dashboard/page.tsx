import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import VisibilityIcon from '@mui/icons-material/Visibility';

function Dashboard() {
  return (
    <div className="flex poppins">
      <SideBar />
      <ContentArea />
    </div>
  );
}

function SideBar() {
  return (
    <div className="h-screen w-[380px] p-6 pt-9 relative rounded-xl bg-white">
      <RoundedArrowIcon />
      <Logo />
      <Links />
      <LogOutButton />
    </div>
  );

  function RoundedArrowIcon() {
    return (
      <div
        className={`w-7 h-7 z-40  rounded-full   absolute right-[-11px] top-[95px] flex items-center justify-center`}
      >
        <div></div>
        <div className="bg-red-500 rounded-full w-[70%] h-[70%] flex items-center justify-center cursor-pointer">
          <CodeRoundedIcon
            fontSize="medium"
            className="text-white text-[13px]"
          />
        </div>
      </div>
    );
  }
  function Logo() {
    return (
      <div className="flex gap-2 items-center ml-3">
        <div className={`bg-red-500 p-[6px] rounded-md`}>
          <CodeRoundedIcon sx={{ fontSize: 27, color: 'white' }} />
        </div>
        <div className="flex gap-1 text-[21px] ">
          <span className={`font-bold text-red-500`}>Neuro</span>
          <span className="text-slate-600">Coder</span>
        </div>
      </div>
    );
  }

  function Links() {
    return (
      <div className="mt-44 ml-3 flex flex-col gap-2 text-[15px]">
        {/* Home Link */}
        <div className="p-[7px] rounded-lg flex items-center gap-2 w-[70%] bg-red-500 hover:text-red-500 cursor-pointer text-white">
          <HomeRoundedIcon />
          <span className="mt-0.5">Home</span>
        </div>

        {/* Categories Link */}
        <div className="p-[7px] rounded-lg flex items-center gap-2 w-[80%] hover:text-red-500 cursor-pointer  text-slate-400">
          <FlagRoundedIcon />
          <span className="mt-0.5">Challenges</span>
        </div>

        {/* Favorite Link */}
        <div className="p-[7px] rounded-lg flex items-center gap-2 w-[80%] hover:text-red-500 cursor-pointer text-slate-400">
          <EmojiEventsRoundedIcon />
          <span className="mt-0.5">Achievements</span>
        </div>
      </div>
    );
  }

  function LogOutButton() {
    return (
      <div className="p-[7px] ml-3 mt-14 text-[15px] rounded-lg flex items-center gap-2 w-[80%] text-slate-400 cursor-pointer hover:text-red-500">
        <LogoutRoundedIcon />
        <span className="mt-0.5">Log Out</span>
      </div>
    );
  }
}

function ContentArea() {
  return (
    <div className="w-full min-h-screen bg-slate-100 p-4">
      <TopBar />
      <WelcomeBack />
      <OnGoingChallenges />
      <Achievements />
    </div>
  );

  function OnGoingChallenges() {
    return (
      <div className=" w-full mt-9 flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <span className="font-bold text-[22px] text-gray-900">
            On Going Challenges
          </span>
          {/* View All Button */}
          <div
            className="text-[14px] bg-red-500 p-1 px-2 rounded-md text-white 
          select-none cursor-pointer flex gap-1 items-center"
          >
            <VisibilityIcon sx={{ fontSize: 16 }} />
            <span>View All</span>
          </div>
        </div>
        {/* All Challenges Components */}
        <div className="w-full flex gap-3 flex-wrap mt-2">
          <SingleChallengeComponent />
          <SingleChallengeComponent />
          <SingleChallengeComponent />
        </div>
      </div>
    );

    function SingleChallengeComponent() {
      return (
        <div className=" bg-white  rounded-lg p-5 flex flex-col w-[300px]">
          {/* Media */}
          <div className=" relative flex justify-center items-center w-[100%] h-40 bg-red-100 rounded-md">
            <HomeRoundedIcon sx={{ fontSize: 60 }} className="text-red-500" />
            <span className="p-1 rounded-md text-[11px] bg-red-500 text-red-100 px-2 absolute top-3 right-3">
              Numbers
            </span>
          </div>
          {/* Headline and difficulty */}
          <div className="mt-2">
            {/* Headline */}
            <h2 className="font-bold text-lg">Even Numbers</h2>
            {/* Difficulty */}
            <div>
              <span className="bg-red-100 text-red-500 rounded-lg p-[3px] text-[12px] px-3 ">
                Easy
              </span>
            </div>
          </div>
          {/* Description */}
          <p className="text-slate-400 text-[13px] mt-5">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia
            nam ad non, ...
          </p>
          {/* Button */}
          <div className="flex justify-end mt-3 ">
            <button className="bg-red-500 rounded-md p-[5px] px-3">
              <span className="text-sm text-white">Continue</span>
              <KeyboardDoubleArrowRightIcon
                sx={{ fontSize: 17 }}
                className="text-white"
              />
            </button>
          </div>
        </div>
      );
    }
  }

  function Achievements() {
    const HexagonalBadge = ({ icon }: { icon?: React.ReactNode }) => {
      return (
        <div className="relative w-24 h-24 drop-shadow-lg">
          <div className="absolute inset-0">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50 3 94 26.5 94 73.5 50 97 6 73.5 6 26.5"
                className="fill-red-500 stroke-white stroke-[8]"
              />
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            {icon}
          </div>
        </div>
      );
    };

    function SingleBadge() {
      return (
        <div className="bg-white relative rounded-md p-5 py-7 w-[250px] flex flex-col gap-2 items-center">
          {/* experience badge */}
          <div className="absolute text-[11px] z-50 bg-red-100 rounded-xl p-[3px] px-2 top-4 right-4 text-red-500">
            + 20 XP
          </div>
          <div className="mt-[23px]">
            <HexagonalBadge
              icon={
                <FlagRoundedIcon sx={{ fontSize: 31 }} className="text-white" />
              }
            />
          </div>
          <h2 className="font-bold text-lg mt-3">First Step</h2>
          <span className="text-slate-400 text-sm text-center mb-2">
            Youve completed your first challenge
          </span>
        </div>
      );
    }

    return (
      <div className="w-full mt-9 flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <span className="font-bold text-[22px] text-gray-900">
            Achievements
          </span>
          {/* View All Button */}
          <div
            className="text-[14px] bg-red-500 p-1 px-2 rounded-md text-white 
          select-none cursor-pointer flex gap-1 items-center"
          >
            <VisibilityIcon sx={{ fontSize: 16 }} />
            <span>View All</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-3">
          <SingleBadge />
          <SingleBadge />
          <SingleBadge />
        </div>
      </div>
    );
  }

  function WelcomeBack() {
    return (
      <div className=" w-full mt-5 flex flex-col gap-2">
        <span className="font-bold text-lg text-gray-900">Your Stats</span>
        {/* All Stats Components */}
        <div className="w-full grid grid-cols-3 gap-3">
          <SingleComponent />
          <SingleComponent />
          <SingleComponent />
        </div>
      </div>
    );

    function SingleComponent() {
      return (
        <div className="bg-white p-4 rounded-lg flex gap-2 items-center">
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <FlagRoundedIcon className="text-red-500" />
          </div>
          {/* The Numbers */}
          <div className="flex flex-col gap-0">
            <span className="font-bold text-2xl">20</span>
            <span className="text-slate-400 text-[12px]">
              Challenges Created
            </span>
          </div>
        </div>
      );
    }
  }
  function TopBar() {
    return (
      <div className="bg-white w-full p-4 rounded-lg flex items-center justify-between">
        <SearchBar />
        <div className="flex gap-2">
          <LightAndDark />
          <ProfileAndXp />
        </div>
      </div>
    );

    function SearchBar() {
      return (
        <div className="flex  gap-5 items-center relative ">
          <div
            className={`h-[42px] bg-slate-50 flex items-center text-sm  rounded-3xl  pl-3 gap-1 w-[400px]    `}
          >
            <SearchRoundedIcon className="text-slate-400" />
            <input
              placeholder="Search a Project..."
              className="bg-transparent outline-none w-full font-light"
            />
          </div>
        </div>
      );
    }

    function LightAndDark() {
      return (
        <div className="flex  gap-5 items-center relative select-none ">
          <div
            className={`h-[42px] bg-slate-100 flex items-center text-sm  rounded-3xl px-2 gap-1 `}
          >
            <span className="bg-red-500 p-1 rounded-3xl px-3 text-white cursor-pointer">
              Light
            </span>
            <span className=" p-1 rounded-3xl px-3 text-slate-400 cursor-pointer">
              Dark
            </span>
          </div>
        </div>
      );
    }

    function ProfileAndXp() {
      return (
        <div className="flex  gap-5 items-center relative select-none ">
          <div
            className={`h-[42px] bg-slate-100 flex items-center text-sm  rounded-3xl pl-[4px] pr-[8px] gap-3  `}
          >
            {/* Profile And Name */}
            <div className="flex gap-1 items-center hover:bg-slate-200 rounded-3xl pr-4 cursor-pointer ">
              <div className="w-8 h-8 bg-red-600 rounded-full"></div>
              <span className="font-semibold text-gray-600">Hello, Ali</span>
            </div>
            {/* Experience */}
            <span className="bg-white p-1 px-4 rounded-3xl">
              200 <span className="font-bold text-red-500">XP</span>
            </span>
          </div>
        </div>
      );
    }
  }
}

export default Dashboard;
