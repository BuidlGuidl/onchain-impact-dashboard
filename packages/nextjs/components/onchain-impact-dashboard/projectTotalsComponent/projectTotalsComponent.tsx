"use client";

import React, { useEffect, useState } from "react";
import { ProjectTotalsGraph } from "../projectTotalsGraph/projectTotalsGraph";
import { ProjectScoreService } from "~~/services/onchainImpactDashboardApi/projectScoreService";
import { METRICS } from "~~/utils/onchainImpactDashboard/common";

export const ProjectTotalsComponent = ({ id }: { id: string }) => {
  const DEFAULT_FILTER = "30";
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [selectedMetric, setSelectedMetric] = useState<{ label: string; value: string }>(METRICS[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { getProjectScoreById } = ProjectScoreService();
  const [totalsRecord, setTotalsRecord] = useState<any[]>([]);

  const getTotals = async () => {
    const data = await getProjectScoreById(id, filter);
    setTotalsRecord(data as any);
  };
  useEffect(() => {
    setSelectedMetric(METRICS[0]);
    getTotals();
  }, []);

  const onFilter = (value: string) => {
    setFilter(value);
    if (value == "range") {
      return;
    }
    getTotals();
  };
  return (
    <main className="flex flex-col lg:flex-row w-full mt-14">
      <ProjectTotalsGraph
        setSelectedMetric={(item: { label: string; value: string }) => setSelectedMetric(item)}
        metrics={METRICS}
        totalsRecord={totalsRecord}
        selectedMetric={selectedMetric}
        filter={filter}
        onFilter={val => onFilter(val)}
        endDate={endDate}
        startDate={startDate}
        updateStartDate={val => setStartDate(val)}
        updateEndDate={val => setEndDate(val)}
      />
    </main>
  );
};
