"use client";

import React from "react";
import { FilterButton } from "../filterButton/filterButton";
import { Skeleton } from "../skeleton/skeleton";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DatePicker } from "~~/components/impact-vector/inputs/datePicker";
import { IMetric } from "~~/services/mongodb/models/metric";
import { formatDate, stringToColor } from "~~/utils/onchainImpactDashboard/common";

interface IProps {
  totalsRecord: any[];
  filter: string;
  onFilter: (arg: string) => void;
  endDate: string;
  selectedMetric: number;
  startDate: string;
  updateStartDate: (arg: string) => void;
  updateEndDate: (arg: string) => void;
  metrics: IMetric[];
  setSelectedMetric: (arg: number) => void;
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

  const metricToWork = metrics[selectedMetric];
  return (
    <>
      <div className="flex flex-col lg:w-[40%]">
        <h2 className="font-bold text-xl">
          {metricToWork?.label ?? (
            <div className="w-[200px]">
              <Skeleton height="h-8" />
            </div>
          )}
        </h2>
        {metricToWork?.label ? (
          <p className="font-light text-neutral-content pr-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis
            tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum. Maecenas
            eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia
            nostra, per inceptos himenaeos.{" "}
          </p>
        ) : (
          <div className="font-light text-neutral-content mt-2 pr-4">
            <Skeleton height={"h-[200px]"} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full mt-10 lg:mt-0">
        {metrics.length == 0 ? (
          <div>
            <Skeleton height="h-8" />
          </div>
        ) : (
          <></>
        )}
        <div className="flex gap-6 flex-wrap mb-4">
          {metrics.map((item, i) => (
            <span
              key={item.name}
              className={`${
                selectedMetric == i ? "font-bold text-secondary-content" : "font-medium"
              } cursor-pointer text-neutral-content`}
              onClick={() => setSelectedMetric(i)}
            >
              {item.label || ""}
            </span>
          ))}
        </div>
        {metrics.length > 0 ? (
          <div className="mb-3 w-full h-[50vh] rounded-lg grow min-h-[300px] lg:mr-4 lg:7/12 relative border">
            <div className="flex flex-col lg:flex-row mb-4">
              <div className="flex  flex-col xl:flex-row items-center bg-base-300 rounded-lg p-2 pr-2 w-full xl:w-auto m-1">
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
                        onChange={(value: string) => updateStartDate(value)}
                        name={"startDate"}
                      />
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
                <Area
                  key={metricToWork.name}
                  type="monotone"
                  dataKey={metricToWork.name}
                  stroke={stringToColor(metricToWork.label ?? "")}
                  fill={stringToColor(metricToWork.label ?? "")}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis tick={false} fontSize={10} hide={false} dataKey="date" />
                <YAxis fontSize={10} type={"category"} hide={false} orientation="right" />
                <Tooltip content={<CustomTooltip />} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="mb-4">
            <Skeleton height="h-[460px]" />
          </div>
        )}
      </div>
    </>
  );
};
