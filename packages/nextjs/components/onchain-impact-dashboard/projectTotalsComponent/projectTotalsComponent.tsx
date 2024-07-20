"use client";

import React, { useEffect, useState } from "react";
import { ProjectTotalsGraph } from "../projectTotalsGraph/projectTotalsGraph";
import { IMetric } from "~~/services/mongodb/models/metric";
import { IProjectScore } from "~~/services/mongodb/models/projectScore";
import { MetricService } from "~~/services/onchainImpactDashboardApi/metricsService";
import { ProjectScoreService } from "~~/services/onchainImpactDashboardApi/projectScoreService";

export const ProjectTotalsComponent = ({ id }: { id: string }) => {
  const DEFAULT_FILTER = "30";
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [metrics, setMetrics] = useState<IMetric[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { getProjectScoreById } = ProjectScoreService();
  const [totalsRecord, setTotalsRecord] = useState<IProjectScore[]>([]);
  const [baseData, setBaseData] = useState<IProjectScore[]>([]);

  const { getMetrics: getAllMetrics } = MetricService();
  const [selectedMetric, setSelectedMetric] = useState<number>(0);
  const getTotals = async (currentFil?: string, sDate?: string, eDate?: string) => {
    if (baseData.length > 0) {
      // Defaults to 90 days
      let start = new Date();
      start.setDate(start.getDate() - parseInt(currentFil || "7"));
      let end = new Date();
      if (!!sDate) {
        start = new Date(sDate);
        start.setDate(start.getDate() - 1);
      }

      if (!!eDate) {
        end = new Date(eDate);
        end.setDate(end.getDate() + 1);
      }
      setTotalsRecord(
        baseData.filter(
          it => new Date(it.date).getTime() > start.getTime() && new Date(it.date).getTime() < end.getTime(),
        ),
      );
      return;
    }
    const data = await getProjectScoreById(id);
    setBaseData(data);
    setTotalsRecord(data);
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
    setStartDate("");
    setEndDate("");
    if (value == "range") {
      return;
    }
    getTotals(value);
  };
  const onStartDateChange = (value: string) => {
    setStartDate(value);
    if (!!endDate && new Date(value).getTime() >= new Date(endDate).getTime()) {
      return;
    }
    getTotals(filter, value, endDate);
  };
  const onEndDateChange = (value: string) => {
    setEndDate(value);
    if (!!startDate && new Date(startDate).getTime() >= new Date(value).getTime()) {
      return;
    }
    getTotals(filter, startDate, value);
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
        updateStartDate={val => onStartDateChange(val)}
        updateEndDate={val => onEndDateChange(val)}
      />
    </main>
  );
};
