"use client";

import React, { useEffect, useState } from "react";
import Leaderboard from "../Leaderboard";
import { ProjectTotalsGraph } from "../projectTotalsGraph/projectTotalsGraph";
import { IGlobalScore } from "~~/services/mongodb/models/globalScore";
import { IMetric } from "~~/services/mongodb/models/metric";
import { IProject } from "~~/services/mongodb/models/project";
import { GlobalScoreService } from "~~/services/onchainImpactDashboardApi/globalScoreServices";
import { MetricService } from "~~/services/onchainImpactDashboardApi/metricsService";
import { ProjectService } from "~~/services/onchainImpactDashboardApi/projectService";

export const LeaderBoardComponent = () => {
  const DEFAULT_FILTER = "30";
  const [scores, setScores] = useState<IGlobalScore[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [metrics, setMetrics] = useState<IMetric[]>([]);
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { getGlobalScores } = GlobalScoreService();
  const { getProjects: getAllProjects } = ProjectService();
  const { getMetrics: getAllMetrics } = MetricService();
  const [selectedMetric, setSelectedMetric] = useState<number>(0);

  const getProjects = async () => {
    const data = await getAllProjects();
    setProjects(data);
  };
  const getMetrics = async () => {
    const data = await getAllMetrics();
    setMetrics(data);
    setSelectedMetric(0);
  };
  useEffect(() => {
    getProjects();
    getMetrics();
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
    <main className="flex flex-col w-full mt-14">
      <div className="flex flex-col lg:flex-row w-full">
        <ProjectTotalsGraph
          setSelectedMetric={(i: number) => setSelectedMetric(i)}
          metrics={metrics}
          totalsRecord={scores}
          selectedMetric={selectedMetric}
          filter={filter}
          onFilter={val => onFilter(val)}
          endDate={endDate}
          startDate={startDate}
          updateStartDate={val => setStartDate(val)}
          updateEndDate={val => setEndDate(val)}
        />
      </div>
      <Leaderboard projects={projects} />
    </main>
  );
};
