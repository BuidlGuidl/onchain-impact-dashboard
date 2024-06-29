import "./page.css";
import type { NextPage } from "next";
import Leaderboard from "~~/components/onchain-impact-dashboard/Leaderboard";

const LeaderboardView: NextPage = () => {
  return (
    <div className="px-4">
      <div className="leaderboard-heading mb-6">
        <h1>Onchain Impact Dashboard</h1>
        <p>
          See the onchain impact that is beeing generated across the superchain Retro Funding 4 established metrics to
          measure onchain impact. These metrics will be evolve round over round.
        </p>
      </div>
      <main className="leaderboard-content lg:flex">
        <div className="mb-3 border border-gray-300 rounded-lg p-4 grow min-h-[300px] lg:mr-4 lg:7/12">
          Graph goes here...
        </div>
        <div className="mb-3 lg:basis-5/12">
          <Leaderboard />
        </div>
      </main>
    </div>
  );
};

export default LeaderboardView;
