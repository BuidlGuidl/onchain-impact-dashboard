"use client";

import React, { useEffect, useState } from "react";
import Leaderboard from "../Leaderboard";
import { FilterButton } from "../filterButton/filterButton";
import { LeaderBoardGraph } from "../leaderboardGraph/leaderBoardGraph";
import { DatePicker } from "~~/components/impact-vector/inputs/datePicker";
import { IGlobalScore } from "~~/services/mongodb/models/globalScore";
import { IProject } from "~~/services/mongodb/models/project";
import { GlobalScoreService } from "~~/services/onchainImpactDashboardApi/globalScoreServices";
import { ProjectService } from "~~/services/onchainImpactDashboardApi/projectService";

export const LeaderBoardComponent = () => {
  const DEFAULT_FILTER = "230";
  const [scores, setScores] = useState<IGlobalScore[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { getGlobalScores } = GlobalScoreService();
  const { getProjects: getAllProjects } = ProjectService();

  const getProjects = async () => {
    const data = await getAllProjects();
    setProjects(data);
  };
  useEffect(() => {
    getProjects();
    getScores(DEFAULT_FILTER);
  }, []);
  useEffect(() => {
    setEndDate("");
  }, [startDate]);
  useEffect(() => {
    const val = startDate.replaceAll("-", "");
    const valEnd = endDate.replaceAll("-", "");
    if (val > valEnd) {
      setEndDate("");
      return;
    }
    if (val != "" && valEnd != "") {
      getScores(`${val},${valEnd}`);
    }
  }, [startDate, endDate]);

  const getScores = async (value?: string) => {
    const data: IGlobalScore[] = await getGlobalScores(value);
    setScores(data);
  };

  const onFilter = (value: string) => {
    setFilter(value);
    if (value == "range") {
      return;
    }
    getScores(value);
  };

  return (
    <main>
      <div className="leaderboard-content lg:flex">
        <div className="mb-3 border border-gray-300 w-full h-[50vh] rounded-lg p-2 grow min-h-[300px] lg:mr-4 lg:7/12 relative">
          <div className="flex flex-col lg:flex-row mb-4">
            <div className="flex  flex-col xl:flex-row items-center bg-base-300 rounded-lg p-2 pr-2 w-full xl:w-auto">
              <div className="flex items-center">
                <FilterButton filter={filter} value="30" label="1m" onClick={onFilter} />
                <FilterButton filter={filter} value="90" label="3m" onClick={onFilter} />
                <FilterButton filter={filter} value="270" label="6m" onClick={onFilter} />
                <FilterButton filter={filter} value="365" label="1y" onClick={onFilter} />
                <FilterButton filter={filter} value="range" label="Range" onClick={onFilter} />
              </div>
              {filter == "range" && (
                <div className="flex flex-col mt-2 xl:mt-0 lg:flex-row date-container">
                  <div className="lg:ml-2 mt-2 lg:mt-0">
                    <DatePicker
                      value={startDate}
                      onChange={(value: string) => setStartDate(value)}
                      name={"startDate"}
                    />
                  </div>
                  <div className="lg:ml-2 mt-2 lg:mt-0">
                    <DatePicker
                      disabled={startDate == ""}
                      value={endDate}
                      onChange={(value: string) => setEndDate(value)}
                      name={"startDate"}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <LeaderBoardGraph scores={scores} />
        </div>
        <div className="mb-3 lg:basis-5/12">
          <Leaderboard projects={projects} />
        </div>
      </div>
    </main>
  );
};
