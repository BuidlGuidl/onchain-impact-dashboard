import "./page.css";
import type { NextPage } from "next";
import Leaderboard from "~~/components/onchain-impact-dashboard/Leaderboard";
import { Project } from "~~/services/database/schema";

type ProtoType =
  | {
      avatarUrl: string;
      name: string;
      description: string;
    }
  | Project;

const LeaderboardView: NextPage = () => {
  const testProjects: ProtoType[] = [
    {
      avatarUrl:
        "https://github.com/blahkheart/OP-RetroPGF3-Discovery-Voting/blob/main/packages/nextjs/public/assets/projects/Logo34.png?raw=true",
      name: "BuidlGuidl AllStars",
      description: "Cool builders building open source stuff",
    },
    {
      avatarUrl:
        "https://github.com/blahkheart/OP-RetroPGF3-Discovery-Voting/blob/main/packages/nextjs/public/assets/projects/Logo_2.png?raw=true",
      name: "Guild Warriors",
      description: "Cyber punk gamers on the blockchain",
    },
  ];

  return (
    <>
      <div className="leaderboard-heading">
        <h1>Onchain Impact Dashboard</h1>
        <p>
          See the onchain impact that is beeing generated across the superchain Retro Funding 4 established metrics to
          measure onchain impact. These metrics will be evolve round over round.
        </p>
      </div>
      <main className="leaderboard-content lg:flex">
        <div className="mb-3 border border-gray-300 rounded-lg p-4 grow lg:mr-4 lg:7/12">Graph goes here...</div>
        <div className="mb-3 lg:basis-5/12">
          <Leaderboard projects={testProjects} />
        </div>
      </main>
    </>
  );
};

export default LeaderboardView;
