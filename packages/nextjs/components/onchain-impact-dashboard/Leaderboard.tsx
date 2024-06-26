"use client";

import { useState } from "react";
import OnchainInfoModal from "../OnchainInfoModal";
import LeaderboardCollapse from "./LeaderboardCollapse";
import { SearchBar } from "./SearchBar";

const Leaderboard = ({ projects }: any) => {
  const rating = 10;
  const [selectedProject, setSelectedProject] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeSelectedProject = (newValue: string) => {
    if (selectedProject == newValue) {
      newValue = "";
    }
    setSelectedProject(newValue);
  };

  return (
    <>
      <div className="leaderboard-wrap flex flex-col border border-gray-300 rounded-lg pl-4 pr-4 pt-4">
        <div className="search-container mb-3">
          <SearchBar placeholder="Search" onChange={() => ""} value={""} />
        </div>
        <div className="projects-container ">
          {projects.map((item: any) => (
            <LeaderboardCollapse
              isActive={item.id == selectedProject}
              setSelectedProject={() => changeSelectedProject(item.id)}
              shareProject={() => setIsModalOpen(item.id)}
              key={item.id}
              project={item}
              rating={rating}
            ></LeaderboardCollapse>
          ))}
        </div>
        <OnchainInfoModal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
      </div>
    </>
  );
};

export default Leaderboard;
