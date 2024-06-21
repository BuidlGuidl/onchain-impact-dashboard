import React from "react";
import Image from "next/image";
import { SwitchTheme } from "./SwitchTheme";

const Navbar = () => {
  return (
    <nav className="navbar p-2 bg-base-100  ">
      <div className="max-w-screen-2xl w-full mx-auto flex justify-between items-center ">
        <div className="max-w-[167px]">
          <Image src="/assets/svg/logo.svg" width={167} height={24} className="w-fit" alt="logo" />
        </div>
        <div className="flex items-center gap-3">
          <SwitchTheme />
          <div className="w-[1px] h-[24px] bg-neutral-200"></div>
          <button className="bg-OPred rounded-md p-2 flex gap-2 text-white font-medium text-xs sm:text-sm">
            <Image src="/assets/svg/farcaster-fill.svg" alt="" width={16} height={16} /> Add your own project
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
