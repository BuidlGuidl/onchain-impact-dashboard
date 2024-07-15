"use client";

import React, { useEffect, useState } from "react";
import { ProjectTotalsGraph } from "../projectTotalsGraph/projectTotalsGraph";
import { IMetric } from "~~/services/mongodb/models/metric";
import { MetricService } from "~~/services/onchainImpactDashboardApi/metricsService";
import { ProjectScoreService } from "~~/services/onchainImpactDashboardApi/projectScoreService";

export const ProjectTotalsComponent = ({ id }: { id: string }) => {
  const DEFAULT_FILTER = "30";
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [metrics, setMetrics] = useState<IMetric[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { getProjectScoreById } = ProjectScoreService();
  const [totalsRecord, setTotalsRecord] = useState<any[]>([]);
  const { getMetrics: getAllMetrics } = MetricService();
  const [selectedMetric, setSelectedMetric] = useState<number>(0);

  const getTotals = async () => {
    const data = await getProjectScoreById(id, filter);
    setTotalsRecord(data as any);
  };
  const getMetrics = async () => {
    const data = await getAllMetrics();
    setMetrics(data);
    setSelectedMetric(0);
  };

  useEffect(() => {
    getMetrics();
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
        setSelectedMetric={(i: number) => setSelectedMetric(i)}
        metrics={metrics}
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
