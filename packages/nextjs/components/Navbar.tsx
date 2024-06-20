import React from "react";
import Image from "next/image";
import { SwitchTheme } from "./SwitchTheme";

const Navbar = () => {
  return (
    <nav className="max-w-screen-2xl mx-auto flex justify-between items-center p-2">
      <div className="flex gap-2 items-center">
        <div className="max-w-[24px]">
          <Image src="/assets/svg/logo.svg" width={24} height={24} className="w-full" alt="logo" />
        </div>
        <h3 className="text-neutral-900  font-bold text-sm sm:text-xl  m-0">Retro Funding</h3>
      </div>
      <div className="flex items-center gap-3">
        <SwitchTheme />
        <div className="w-[1px] h-[24px] bg-neutral-200"></div>
        <button className="bg-primary rounded-md p-2 flex gap-2 text-white font-medium text-xs sm:text-sm">
          <Image src="/assets/svg/farcaster-fill.svg" alt="" width={16} height={16} /> Add your own project
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
