"use client";

import { useState } from "react";
import OnchainInfoModal from "../OnchainInfoModal";
import LeaderboardCollapse from "./LeaderboardCollapse";
import { SearchBar } from "./SearchBar";
import { useEffectOnce } from "usehooks-ts";
import { Project } from "~~/services/database/schema";

const Leaderboard = () => {
  const rating = 10;
  const [selectedProject, setSelectedProject] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);

  const getProjects = async () => {
    const response = await fetch(`http://localhost:3000/api/stub/projects`);
    const data: Project[] = await response.json();
    setProjects(data);
  };
  useEffectOnce(() => {
    getProjects();
  });

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
                isActive={item.attestationUid == selectedProject}
                setSelectedProject={() => changeSelectedProject(item.attestationUid)}
                shareProject={() => setIsModalOpen(true)}
                key={item.attestationUid}
                id={item.attestationUid}
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
