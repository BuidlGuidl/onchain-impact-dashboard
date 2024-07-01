"use client";

import { useState } from "react";
import OnchainInfoModal from "../OnchainInfoModal";
import LeaderboardCollapse from "./LeaderboardCollapse";
import { SearchBar } from "./SearchBar";
import { Project } from "~~/services/database/schema";

const Leaderboard = ({ projects }: { projects: Project[] }) => {
  const rating = 10;
  const [selectedProject, setSelectedProject] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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
          <SearchBar placeholder="Search" onChange={e => setSearchValue(e)} value={searchValue} />
        </div>
        <div className="projects-container ">
          {projects
            .filter((it: any) => it.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((item: Project) => (
              <LeaderboardCollapse
                isActive={item.id == selectedProject}
                setSelectedProject={() => changeSelectedProject(item.id)}
                shareProject={() => setIsModalOpen(true)}
                key={item.id}
                id={item.id}
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
