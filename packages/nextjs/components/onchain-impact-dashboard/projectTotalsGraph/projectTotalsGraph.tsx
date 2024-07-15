"use client";

import React from "react";
import { FilterButton } from "../filterButton/filterButton";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DatePicker } from "~~/components/impact-vector/inputs/datePicker";
import { formatDate, stringToColor } from "~~/utils/onchainImpactDashboard/common";

interface IProps {
  totalsRecord: any[];
  filter: string;
  onFilter: (arg: string) => void;
  endDate: string;
  selectedMetric: { label: string; value: string };
  startDate: string;
  updateStartDate: (arg: string) => void;
  updateEndDate: (arg: string) => void;
  metrics: { label: string; value: string }[];
  setSelectedMetric: (arg: { label: string; value: string }) => void;
}
export const ProjectTotalsGraph = ({
  updateStartDate,
  updateEndDate,
  startDate,
  setSelectedMetric,
  onFilter,
  endDate,
  selectedMetric,
  metrics,
  totalsRecord,
  filter,
}: IProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-300 p-4 rounded-lg shadow">
          <p className="m-0 p-0 label font-bold">{formatDate(label)}</p>
          {payload.map((entry: any, index: any) => (
            <div key={`item-${index}`}>
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
    <>
      <div className="flex flex-col lg:w-[40%]">
        <h2 className="font-bold text-xl">{selectedMetric.label}</h2>
        <p className="font-light text-neutral-content pr-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis
          tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum. Maecenas eget
          condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos.{" "}
        </p>
      </div>
      <div className="flex flex-col w-full mt-10 lg:mt-0 parent__metric-container">
        <div className="flex gap-6 flex-wrap mb-4">
          {metrics.map(item => (
            <span
              key={item.value}
              className={`${
                selectedMetric.value == item.value ? "font-bold text-secondary-content" : "font-medium"
              } cursor-pointer text-neutral-content`}
              onClick={() => setSelectedMetric(item)}
            >
              {item.label}
            </span>
          ))}
        </div>

        <div className="mb-3 w-full h-[50vh] rounded-lg grow min-h-[300px] lg:mr-4 lg:7/12 relative border p-1">
          <div className="flex px-1 relative  w-full rounded-t-md child__container bg-base-300 ">
            <div className="flex items-center p-1">
              <FilterButton filter={filter} value="30" label="1m" onClick={onFilter} />
              <FilterButton filter={filter} value="90" label="3m" onClick={onFilter} />
              <FilterButton filter={filter} value="270" label="6m" onClick={onFilter} />
              <FilterButton filter={filter} value="365" label="1y" onClick={onFilter} />
              <FilterButton filter={filter} value="range" label="Range" onClick={onFilter} />
            </div>
            {filter == "range" && (
              <div className="bg-base-300 child__filter-data-picker  gap-1 rounded-lg  flex  date-container">
                <div className="">
                  <DatePicker
                    value={startDate}
                    onChange={(value: string) => updateStartDate(value)}
                    name={"startDate"}
                  />
                </div>
                <div className="">
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

          <ResponsiveContainer width="100%" className={"absolute top-14"}>
            <AreaChart data={totalsRecord} margin={{ top: 20, right: -16, bottom: 45, left: 0 }}>
              {metrics
                .filter(key => selectedMetric == key)
                .map(item => (
                  <Area
                    key={item.value}
                    type="monotone"
                    dataKey={item.value}
                    stroke={stringToColor(item.value)}
                    fill={stringToColor(item.value)}
                  />
                ))}
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis tick={false} fontSize={10} hide={false} dataKey="date" />
              <YAxis fontSize={10} type={"category"} hide={false} orientation="right" />
              <Tooltip content={<CustomTooltip />} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};
