"use client";

import { useEffect } from "react";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { Footer } from "~~/components/Footer";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useDarkMode } from "~~/hooks/scaffold-eth/useDarkMode";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const price = useNativeCurrencyPrice();
  const { isDarkMode } = useDarkMode();

  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  return (
    <>
      <div className="flex flex-col">
        <main className={`relative flex flex-col flex-1 ${isDarkMode ? "dark" : ""} main-container bg-base-100`}>
          <div className="main-content bg-base-100">{children}</div>
        </main>
      </div>
      <Footer />
      <Toaster />
    </>
  );
};

export const ScaffoldEthProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={appChains.chains} avatar={BlockieAvatar} theme={lightTheme()}>
        <ScaffoldEthApp>{children}</ScaffoldEthApp>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
