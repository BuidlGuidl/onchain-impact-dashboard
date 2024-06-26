"use client";

import LeaderboardCollapse from "./LeaderboardCollapse";
import { SearchBar } from "./SearchBar";

const Leaderboard = ({ projects }: any) => {
  const rating = 10;

  return (
    <>
      <div className="leaderboard-wrap flex flex-col border border-gray-300 rounded-lg p-4">
        <div className="search-container mb-3">
          <SearchBar placeholder="Search" onChange={() => ""} value={""} />
        </div>
        <div className="projects-container ">
          <LeaderboardCollapse project={projects[0]} rating={rating}></LeaderboardCollapse>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
