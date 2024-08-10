"use client";

import React, { useRef, useEffect } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useAppContext } from "../ContextApi";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function SideBar() {
  const {
    hideSideBarObject: { hideSideBar },
    darkModeObject: { darkMode },
    isMobileViewObject: { isMobileView },
    openSideBarObject: { openSideBar, setOpenSideBar },
  } = useAppContext();

  const sideBarRef = useRef<HTMLDivElement>(null);

  const isDarkModeString: string =
    darkMode !== null && darkMode[1].isSelected ? "bg-slate-800" : "bg-white";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target as Node)
      ) {
        setOpenSideBar(false);
      }
    }

    if (openSideBar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSideBar, setOpenSideBar]);

  return (
    <div
      ref={sideBarRef}
      className={`${
        hideSideBar ? "w-[130px]" : "w-[295px]"
      } ${isDarkModeString}  min-h-screen p-6 pt-10 ${
        isMobileView
          ? openSideBar
            ? "fixed shadow-lg "
            : "hidden"
          : "relative"
      }  transition-all duration-300 z-50`}
    >
      {!isMobileView && <RoundedArrowIcon />}
      <Logo />
      <Links />
      <LogOutButton />
      <RemainingChallenges />
    </div>
  );

  function RemainingChallenges() {
    const {
      hideSideBarObject: { hideSideBar },
    } = useAppContext();

    return (
      <div
        className={` ${
          !hideSideBar ? "block" : "hidden"
        } p-[18px] rounded-lg shadow-md mt-16 mx-2   bg-gradient-to-r from-red-500 to-pink-600`}
      >
        <h3 className="text-[15px] font-semibold mb-2 text-white ">
          AI-Generated Challenges
        </h3>
        <div className="w-full bg-gray-300 rounded-full h-1.5 mt-5 mb-2">
          <div
            className="bg-white h-1.5 rounded-full"
            style={{ width: `20%` }}
          ></div>
        </div>
        <p className="text-[10px] text-white mb-5">3 / 20 challenges created</p>
        <button className="w-full text-[10px] bg-white text-red-500 py-2 px-4 rounded-md hover:bg-slate-100 transition duration-300">
          Upgrade to Pro
        </button>
      </div>
    );
  }

  function RoundedArrowIcon() {
    const {
      hideSideBarObject: { setHideSideBar, hideSideBar },
    } = useAppContext();

    function changeSideBarState() {
      setHideSideBar(!hideSideBar);
    }

    console.log(darkMode);

    return (
      <div
        className={`w-7 h-7 z-40  rounded-full   absolute right-[-11px] top-[145px] flex items-center justify-center`}
      >
        <div
          onClick={changeSideBarState}
          className="bg-gradient-to-r from-red-500 to-pink-600 rounded-full w-[70%] h-[70%] flex items-center justify-center cursor-pointer"
        >
          {!hideSideBar ? (
            <ArrowForwardIosIcon sx={{ fontSize: 10, color: "white" }} />
          ) : (
            <ArrowBackIosIcon sx={{ fontSize: 10, color: "white" }} />
          )}
        </div>
      </div>
    );
  }
  function Logo() {
    const {
      hideSideBarObject: { hideSideBar },
    } = useAppContext();
    return (
      <div className="flex gap-2 items-center ml-3  ">
        <div
          className={`bg-gradient-to-r from-red-500 to-pink-600 p-[12px] rounded-md`}
        >
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 48 48"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M32.8109 19.6249L33.8562 20.2582C34.4235 20.6019 35.0964 20.8091 35.8029 20.8469L38.8514 19.8455C39.4078 19.3604 39.7616 18.7585 39.9017 18.1361C40.0591 17.4371 39.9505 16.7029 39.5696 16.0431C39.1853 15.3772 38.5324 14.8077 37.6809 14.4739L36.7144 14.0952L36.4679 13.0869C36.3234 12.4958 35.9767 11.9253 35.4383 11.4668L32.4502 10.5228H31.3578L30.7576 9.73214C30.2827 9.1067 29.5508 8.61379 28.663 8.38241L21.2145 8.0044C20.3657 8.09027 19.5937 8.41867 19.0077 8.91147L18.2599 9.54041L17.3041 9.337C16.9923 9.27064 16.672 9.23576 16.3497 9.23348C15.582 9.23618 14.8447 9.43945 14.2277 9.8021C13.61 10.1652 13.1534 10.6631 12.8831 11.2118L12.6365 11.7122L9.51589 13.7078C9.175 14.2084 9.00713 14.7654 9.00808 15.316L9.00811 15.3333L9.00785 15.3506C9.00397 15.5999 9.04053 15.8505 9.11835 16.0956L9.45456 17.1545L8.73325 17.9994C8.25657 18.5578 8.02428 19.2119 8.02862 19.8555L8.02868 19.8636L8.02867 19.8717C8.02763 20.622 8.34328 21.3863 8.98158 21.9963L9.52794 22.5184L9.59251 23.2714C9.63924 23.8164 9.85127 24.3598 10.232 24.8401C10.6144 25.3225 11.1551 25.7248 11.8125 25.9799L11.9478 26.0324L12.0741 26.1038C13.4398 26.8768 14.6143 27.9264 15.499 29.1883C16.0373 29.956 16.4591 30.7894 16.7516 31.6649H20.7934V28.1391H22.7934M11.089 27.8444C12.2078 28.4776 13.1552 29.3292 13.8614 30.3364C14.5677 31.3437 15.0148 32.4811 15.1699 33.6649H22.7934V31.6649M11.089 27.8444C10.118 27.4677 9.2796 26.8583 8.6646 26.0824C8.04959 25.3065 7.68138 24.3935 7.59982 23.4423C6.58909 22.4764 6.02683 21.1976 6.02867 19.869C6.02094 18.7234 6.43748 17.6083 7.21213 16.7009C7.06957 16.2519 7.00082 15.7865 7.00809 15.3194C7.00614 14.2026 7.40166 13.1146 8.13637 12.216L11.089 10.3279C11.542 9.40843 12.2801 8.62699 13.2142 8.0779C14.1484 7.52881 15.2386 7.23553 16.3534 7.23346C16.8138 7.23601 17.2724 7.28544 17.7205 7.38081C18.6688 6.58325 19.8868 6.09689 21.1785 6L28.9495 6.39438C30.334 6.70341 31.5443 7.46088 32.3505 8.5228H32.7586L36.3832 9.66789C37.4113 10.4117 38.1267 11.4505 38.4107 12.6118C39.6545 13.0993 40.6752 13.9577 41.3018 15.0433C41.9284 16.1289 42.1229 17.3758 41.8529 18.5754C41.5828 19.7749 40.8645 20.8544 39.8181 21.6331L36.1049 22.8529C34.936 22.8651 33.7905 22.5568 32.8198 21.9687C31.8638 22.5579 30.7331 22.8731 29.5755 22.8731C28.7003 22.8731 28.4447 22.6929 27.9589 22.3504C27.8022 22.2399 27.6215 22.1124 27.3883 21.9687C27.1199 22.2255 26.9963 22.4592 26.8861 22.6673C26.7208 22.9796 26.5859 23.2345 26.0377 23.4238M29.3237 20.8622C29.3633 20.8668 29.4414 20.8731 29.5755 20.8731C30.3745 20.8731 31.14 20.6547 31.7705 20.2661L32.8109 19.6249"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.1367 11.4071C21.6994 11.3276 21.2621 11.5462 21.0634 11.9437L20.2586 13.5533H18.3539C18.1637 13.5533 17.9775 13.6075 17.817 13.7096L13.8527 16.2324C13.5097 16.4506 13.333 16.8549 13.4057 17.2549L14.1265 21.2192C14.1665 21.4391 14.279 21.6392 14.446 21.7877L17.3539 24.3725V32.1644C17.3539 32.7167 17.8016 33.1644 18.3539 33.1644C18.9062 33.1644 19.3539 32.7167 19.3539 32.1644V23.9234C19.3539 23.6378 19.2317 23.3658 19.0182 23.176L16.0325 20.5221L15.4937 17.5587L18.6451 15.5533H19.8766V18.878C19.8766 19.4303 20.3243 19.878 20.8766 19.878C21.4289 19.878 21.8766 19.4303 21.8766 18.878V14.7893L22.5168 13.509L25.3673 14.0272L27.6555 16.9692C27.7983 17.1528 28.0008 17.2809 28.2279 17.3314L31.3512 18.0255L32.6827 18.6912C33.1767 18.9382 33.7773 18.738 34.0243 18.244C34.2713 17.75 34.0711 17.1494 33.5771 16.9024L32.1356 16.1816C32.0624 16.145 31.9851 16.1176 31.9053 16.0998L29.0132 15.4571L26.7114 12.4978C26.5604 12.3036 26.343 12.1719 26.101 12.1278L22.1367 11.4071Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.4827 9.30938C19.975 9.52694 19.7399 10.1148 19.9574 10.6224L21.0386 13.1452C21.2562 13.6528 21.844 13.888 22.3517 13.6704C22.8593 13.4529 23.0945 12.865 22.8769 12.3573L21.7957 9.83461C21.5782 9.32698 20.9903 9.09183 20.4827 9.30938ZM16.9216 10.3734C16.4044 10.5673 16.1424 11.1437 16.3363 11.6608L17.4175 14.544C17.6114 15.0611 18.1878 15.3231 18.705 15.1292C19.2221 14.9352 19.4841 14.3588 19.2902 13.8417L18.209 10.9586C18.0151 10.4415 17.4387 10.1795 16.9216 10.3734ZM28.5049 10.685C28.1599 10.2537 27.5306 10.1838 27.0993 10.5288L25.2974 11.9704C24.8661 12.3154 24.7962 12.9447 25.1412 13.376C25.4862 13.8072 26.1155 13.8771 26.5468 13.5321L28.3487 12.0906C28.78 11.7456 28.8499 11.1163 28.5049 10.685ZM33.0487 14.1928C33.0487 13.6405 32.601 13.1928 32.0487 13.1928H29.8864C29.5076 13.1928 29.1613 13.4068 28.9919 13.7456L27.9108 15.908C27.6638 16.4019 27.864 17.0026 28.358 17.2496C28.852 17.4966 29.4526 17.2964 29.6996 16.8024L30.5044 15.1928H32.0487C32.601 15.1928 33.0487 14.7451 33.0487 14.1928ZM10.612 15.1872C10.365 15.6812 10.5652 16.2818 11.0592 16.5288L13.9423 17.9704C14.4363 18.2174 15.037 18.0172 15.284 17.5232C15.531 17.0292 15.3307 16.4285 14.8368 16.1815L11.9536 14.74C11.4597 14.493 10.859 14.6932 10.612 15.1872ZM23.4861 15.4607C23.3473 15.3913 23.1942 15.3552 23.0389 15.3552H20.8766C20.3243 15.3552 19.8766 15.8029 19.8766 16.3552C19.8766 16.9075 20.3243 17.3552 20.8766 17.3552H22.8029L25.4748 18.6912C25.9688 18.9382 26.5695 18.7379 26.8165 18.244C27.0635 17.75 26.8633 17.1493 26.3693 16.9023L23.4861 15.4607ZM15.8174 20.3332C15.4269 19.9426 14.7937 19.9426 14.4032 20.3332L12.2409 22.4955C11.8503 22.886 11.8503 23.5192 12.2409 23.9097C12.6314 24.3002 13.2646 24.3002 13.6551 23.9097L15.8174 21.7474C16.208 21.3568 16.208 20.7237 15.8174 20.3332Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M23 38H15V36H23V38Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M23 42H15V40H23V42Z"
              fill="white"
            />
          </svg>
        </div>
        {!hideSideBar && (
          <div className="flex gap-1 text-[23px] ">
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
              Neuro
            </span>
            <span className="text-slate-600">Coder</span>
          </div>
        )}
      </div>
    );
  }

  function Links() {
    const {
      hideSideBarObject: { hideSideBar },
      sideBarMenuItemsObject: { sideBarMenuItems, setSideBarMenuItems },
    } = useAppContext();

    function updateMenuItemState(index: number) {
      //Updating the sideBarMenuItems, and storing the return results in
      //in the sideBarMenuItemsCopy to ensure immutability
      const sideBarMenuItemsCopy = sideBarMenuItems.map((singleMenuItem, i) => {
        if (i === index) {
          return { ...singleMenuItem, isSelected: true };
        }
        return { ...singleMenuItem, isSelected: false };
      });

      //Updating the sideBarMenuItems to see the result in the UI
      setSideBarMenuItems(sideBarMenuItemsCopy);
    }
    return (
      <div
        className={`mt-[153px] ${
          !hideSideBar ? "ml-8" : "ml-3"
        } flex flex-col gap-2 text-[16px]`}
      >
        {sideBarMenuItems.map((singleMenuItem, index) => (
          <div
            key={index}
            onClick={() => updateMenuItemState(index)}
            className={`p-[7px] rounded-lg flex items-center gap-2 ${
              !hideSideBar ? "w-[70%]" : " w-[50%]"
            } ${
              singleMenuItem.isSelected
                ? "bg-gradient-to-r from-red-500 to-pink-600 text-white"
                : " text-slate-400 hover:text-red-500"
            } cursor-pointer`}
          >
            {singleMenuItem.icon}
            {!hideSideBar && (
              <span className="mt-0.5">{singleMenuItem.name}</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  function LogOutButton() {
    const {
      hideSideBarObject: { hideSideBar },
    } = useAppContext();
    return (
      <div
        className={`p-[7px] mt-10  ${
          !hideSideBar ? "ml-8" : "ml-3"
        } text-[14px] rounded-lg flex items-center gap-2 w-[80%] text-slate-400 cursor-pointer hover:text-red-500`}
      >
        <LogoutRoundedIcon sx={{ fontSize: 20 }} />
        {!hideSideBar && <span className="mt-0.5">Log Out</span>}
      </div>
    );
  }
}

export default SideBar;
