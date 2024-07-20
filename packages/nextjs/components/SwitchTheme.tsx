"use client";

import { useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useDarkMode } from "~~/hooks/scaffold-eth/useDarkMode";

export const SwitchTheme = ({ className }: { className?: string }) => {
  const { isDarkMode, toggle } = useDarkMode(false);

  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", isDarkMode ? "scaffoldEthDark" : "scaffoldEth");
  }, [isDarkMode]);

  return (
    <div className={`flex space-x-2 text-sm ${className}`}>
      <label onClick={toggle} htmlFor="theme-toggle" className={`swap swap-rotate ${!isDarkMode ? "swap-active" : ""}`}>
        <MoonIcon className="swap-on h-5 w-5" />
        <SunIcon className="swap-off h-5 w-5" />
      </label>
    </div>
  );
};
