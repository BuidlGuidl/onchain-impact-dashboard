"use client";

import React from "react";
import { FilterButton } from "../filterButton/filterButton";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DatePicker } from "~~/components/impact-vector/inputs/datePicker";
import { formatDate, stringToColor } from "~~/utils/onchainImpactDashboard/common";

interface IProps {
  id: string;
  totalsRecord: any[];
  filter: string;
  onFilter: (arg: string) => void;
  endDate: string;
  selectedMetrics: string[];
  startDate: string;
  updateStartDate: (arg: string) => void;
  updateEndDate: (arg: string) => void;
  keys: string[];
}
export const ProjectTotalsGraph = ({
  updateStartDate,
  updateEndDate,
  startDate,
  onFilter,
  endDate,
  selectedMetrics,
  keys,
  totalsRecord,
  filter,
}: IProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-300 p-4 rounded-lg shadow">
          <p className="m-0 p-0 label font-bold">Date</p>
          <p className="m-0 p-0 label">{formatDate(label)}</p>
          {payload.map((entry: any, index: any) => (
            <div key={`item-${index}`}>
              <p style={{ color: entry.color }} className="m-0 mt-4 p-0 label font-bold">
                {entry.name}
              </p>
              <p style={{ color: entry.color }} className="m-0 p-0 label">
                {entry.value}
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mb-3 w-full h-[50vh] rounded-lg grow min-h-[300px] lg:mr-4 lg:7/12 relative">
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
                <DatePicker value={startDate} onChange={(value: string) => updateStartDate(value)} name={"startDate"} />
              </div>
              <div className="lg:ml-2 mt-2 lg:mt-0">
                <DatePicker
                  disabled={startDate == ""}
                  value={endDate}
                  onChange={(value: string) => updateEndDate(value)}
                  name={"startDate"}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <ResponsiveContainer width="100%" className={"absolute top-14"}>
        <AreaChart data={totalsRecord} margin={{ top: 20, right: -16, bottom: 45, left: 0 }}>
          {keys
            .filter(key => selectedMetrics.includes(key))
            .map(item => (
              <Area key={item} type="monotone" dataKey={item} stroke={stringToColor(item)} fill={stringToColor(item)} />
            ))}
          <XAxis tick={false} fontSize={10} hide={false} dataKey="date" />
          <YAxis fontSize={10} type={"category"} hide={false} orientation="right" />
          <Tooltip content={<CustomTooltip />} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
