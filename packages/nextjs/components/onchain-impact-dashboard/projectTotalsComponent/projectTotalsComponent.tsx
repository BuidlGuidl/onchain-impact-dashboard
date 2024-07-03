"use client";

import React, { useEffect, useState } from "react";
import { ProjectTotalsGraph } from "../projectTotalsGraph/projectTotalsGraph";
import { CheckboxItem } from "~~/components/checkbox/checkbox";
import { ProjectTotalsService } from "~~/services/onchainImpactDashboardApi/projectTotalsService";

export const ProjectTotalsComponent = ({ id }: { id: string }) => {
  const DEFAULT_FILTER = "30";
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { getProjectTotalsByIdAndFilters } = ProjectTotalsService();
  const [totalsRecord, setTotalsRecord] = useState<any[]>([]);

  const getTotals = async () => {
    const data = await getProjectTotalsByIdAndFilters(id, filter);
    const graphData = data.timeSeries.map(item => {
      const val: any = { date: item.createdAt };
      Object.keys(item.metrics).forEach(key => {
        val[key] = item.metrics[key].score;
      });
      return val;
    });
    if (selectedMetrics.length == 0) {
      setSelectedMetrics(["onchain-users"]);
    }
    setTotalsRecord(graphData);
  };
  useEffect(() => {
    getTotals();
  }, []);

  const onFilter = (value: string) => {
    setFilter(value);
    if (value == "range") {
      return;
    }
    getTotals();
  };
  const keys = totalsRecord?.length > 0 ? Object.keys(totalsRecord[0]).filter(it => it != "date") : [];

  return (
    <>
      <div className="mb-3 border border-gray-300 w-full h-[50vh] rounded-lg p-2 grow min-h-[300px] lg:mr-4 lg:7/12 relative">
        <ProjectTotalsGraph
          keys={keys}
          id={id}
          totalsRecord={totalsRecord}
          selectedMetrics={selectedMetrics}
          filter={filter}
          onFilter={val => onFilter(val)}
          endDate={endDate}
          startDate={startDate}
          updateStartDate={val => setStartDate(val)}
          updateEndDate={val => setEndDate(val)}
        />
      </div>
      <div className="mb-3 border border-gray-300 rounded-lg pl-4 pt-4 pr-4 lg:basis-5/12 lg:max-h-[426px] overflow-auto">
        {keys.map(key => (
          <CheckboxItem
            key={key}
            name={key}
            onChange={(arg: boolean) => {
              if (arg) {
                setSelectedMetrics(elems => [...elems, key]);
              } else {
                setSelectedMetrics(ellems => ellems.filter(it => it != key));
              }
            }}
            value={selectedMetrics.includes(key)}
          />
        ))}
      </div>
    </>
  );
};
