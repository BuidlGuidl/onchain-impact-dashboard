"use client";

import React, { useRef } from "react";
import { FilterButton } from "../filterButton/filterButton";
import { Skeleton } from "../skeleton/skeleton";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { DatePicker } from "~~/components/impact-vector/inputs/datePicker";
import { IMetric } from "~~/services/mongodb/models/metric";
import { stringToColor } from "~~/utils/onchainImpactDashboard/common";

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
  const options = {
    chart: {
      type: "line",
      height: 360,
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      type: "datetime",
      title: {
        text: "",
      },
      dateTimeLabelFormats: {
        day: "%e %b",
      },
    },
    legend: {
      enabled: false,
    },
  };

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const metricToWork = metrics[selectedMetric];
  const values = totalsRecord.map(d => d[metricToWork?.name]);
  const newValues = totalsRecord.map(d => {
    const date = new Date(d["date"]);
    return [Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()), d[metricToWork?.name]];
  });

  let minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const isEmpty = maxValue == 0 && minValue == 0;
  const buffer = minValue * 0.03 + 5;
  minValue = minValue - buffer > 0 ? minValue : minValue + buffer;

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
      <div className="flex flex-col w-full mt-10 lg:mt-0 parent__metric-container">
        {metrics.length == 0 ? (
          <div>
            <Skeleton height="h-8" />
          </div>
        ) : (
          <></>
        )}
        <div className="flex gap-4 flex-wrap mb-4">
          {metrics
            .sort((a, b) => a.order - b.order)
            .map((item, i) => (
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
          <div className="mb-3 w-full h-[50vh] rounded-lg grow min-h-[300px] lg:mr-4 lg:7/12 relative border p-1">
            <div className="flex px-1 relative  w-full rounded-t-md child__container bg-base-300 ">
              <div className="flex items-center p-1">
                <FilterButton filter={filter} value="7" label="1w" onClick={onFilter} />
                <FilterButton filter={filter} value="30" label="1m" onClick={onFilter} />
                <FilterButton filter={filter} value="90" label="3m" onClick={onFilter} />
                <FilterButton filter={filter} value="270" label="6m" onClick={onFilter} />
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
            <div>
              {isEmpty ? (
                <div className="flex justify-center items-center w-full h-[300px] text-neutral-content">
                  No data found
                </div>
              ) : (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    ...options,
                    yAxis: {
                      title: {
                        text: null,
                      },
                      min: minValue - buffer,
                      max: maxValue + buffer,
                    },
                    tooltip: {
                      xDateFormat: "%b %e, %Y",
                      pointFormat:
                        '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
                    },

                    series: [
                      {
                        name: metricToWork.label,
                        data: newValues,
                        color: stringToColor(metricToWork.label || ""),
                      },
                    ],
                  }}
                  ref={chartComponentRef}
                />
              )}
            </div>
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
