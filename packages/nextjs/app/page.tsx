"use client";

import { useState } from "react";
import "./page.css";
import type { NextPage } from "next";
import OnchainInfoModal from "~~/components/OnchainInfoModal";

const Leaderboard: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="px-4">
      <h1>Onchain Impact Dashboard</h1>

      <p>
        See the onchain impact that is beeing generated across the superchain Retro Funding 4 established metrics to
        measure onchain impact. These metrics will be evolve round over round.
      </p>
      {/* to be removed after approval */}
      <button className="bg-OPred text-white p-2 rounded-md" onClick={() => setIsModalOpen(true)}>
        Test Modal
      </button>

      <OnchainInfoModal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Leaderboard;
