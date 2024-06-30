"use client";

import React, { useEffect, useState } from "react";
import Leaderboard from "../Leaderboard";
import { LeaderBoardGraph } from "../leaderboardGraph/leaderBoardGraph";
import { DatePicker } from "~~/components/impact-vector/inputs/datePicker";
import { SelectInput } from "~~/components/impact-vector/inputs/select";
import { GlobalScoreDTO } from "~~/pages/api/stub/globalScore";
import { Project } from "~~/services/database/schema";

export const LeaderBoardComponent = () => {
  const [scores, setScores] = useState<any[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getProjects = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/stub/projects`;
    const response = await fetch(url);
    const data: Project[] = await response.json();
    setProjects(data);
  };
  useEffect(() => {
    getProjects();
    getScores();
  }, []);
  useEffect(() => {
    const val = startDate.replace("_", "");
    const valEnd = endDate.replace("_", "");
    if (val > valEnd) {
      setEndDate("");
    }
  }, [startDate, endDate]);

  const getScores = async (value?: string) => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/stub/globalScore`;
    if (value == "last-week") {
      url += `?filter=${value}`;
    }
    const response = await fetch(url);
    const data: GlobalScoreDTO[] = await response.json();
    setScores(data);
  };

  return (
    <main>
      <div className="flex flex-col lg:flex-row mb-4">
        <SelectInput
          value={filter}
          onChange={(value: string) => {
            setFilter(value);
            getScores(value);
          }}
          name={"action"}
          placeholder={"Action"}
          options={[
            {
              value: "today",
              label: "Today",
            },
            {
              value: "last-week",
              label: "Last Week",
            },
            {
              value: "last-month",
              label: "Last Month",
            },
            {
              value: "last-year",
              label: "Last Year",
            },
            {
              value: "range",
              label: "Day Range",
            },
          ]}
        />
        {filter == "range" && (
          <div className="flex flex-col lg:flex-row date-container">
            <div className="lg:ml-2 mt-2 lg:mt-0">
              <DatePicker value={startDate} onChange={(value: string) => setStartDate(value)} name={"startDate"} />
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
      <div className="leaderboard-content lg:flex">
        <div className="mb-3 border border-gray-300 w-full h-[50vh] rounded-lg p-4 grow min-h-[300px] lg:mr-4 lg:7/12">
          <LeaderBoardGraph scores={scores} />
        </div>
        <div className="mb-3 lg:basis-5/12">
          <Leaderboard projects={projects} />
        </div>
      </div>
    </main>
  );
};
