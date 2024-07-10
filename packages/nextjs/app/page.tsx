import "./page.css";
import type { NextPage } from "next";
import { LeaderBoardComponent } from "~~/components/onchain-impact-dashboard/leaderBoardComponent/leaderBoardComponent";

const LeaderboardView: NextPage = () => {
  return (
    <div className="px-[5%] leaderboard-container">
      <div className="leaderboard-heading mt-10 mb-6">
        <h1>Onchain Impact Dashboard</h1>
        <p>
          See the onchain impact that is beeing generated across the superchain Retro Funding 4 established metrics to
          measure onchain impact. These metrics will be evolve round over round.
        </p>
      </div>
      <LeaderBoardComponent />
    </div>
  );
};

export default LeaderboardView;
