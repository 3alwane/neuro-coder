import React from "react";
import SideBar from "../Components/SideBar";
import ContentArea from "../Components/ContentArea";

function Page() {
  return (
    <div className="poppins flex bg-slate-50 ">
      <SideBar />
      <ContentArea />
    </div>
  );
}

export default Page;
