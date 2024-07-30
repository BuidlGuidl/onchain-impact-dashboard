"use client";

import React, { useRef } from "react";
import { FilterButton } from "../filterButton/filterButton";
import { Skeleton } from "../skeleton/skeleton";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { DatePicker } from "~~/components/impact-vector/inputs/datePicker";
import { useDarkMode } from "~~/hooks/scaffold-eth/useDarkMode";
import { IMetric } from "~~/services/mongodb/models/metric";
import { hexStringToRGBA, stringToColor } from "~~/utils/onchainImpactDashboard/common";

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
  const intFilter = parseInt(filter) >= 60 ? 30 : parseInt(filter) > 7 ? 7 : 1;
  const tickInterval = 24 * 3600 * 1000;
  const { isDarkMode } = useDarkMode();
  const options = {
    chart: {
      type: "area",
      height: 360,
      backgroundColor: isDarkMode ? "#1a1e23" : "transparent",
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
    tooltip: {
      backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.85)" : "#FFF",
      style: {
        color: isDarkMode ? "#F0F0F0" : "#333333",
      },
    },

    xAxis: {
      type: "datetime",
      tickInterval: intFilter * tickInterval,
      labels: {
        style: {
          color: isDarkMode ? "#E0E0E3" : "#333333",
        },
      },
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
          <p className="font-light text-neutral-content pr-2">{metricToWork.description}</p>
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
          <div className="mb-3 w-full min-h-[50vh] rounded-lg grow min-h-[300px] lg:mr-4 lg:7/12 relative border p-1">
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
            <div className="mt-2">
              {isEmpty ? (
                <div className="flex justify-center items-center w-full h-[300px] text-neutral-content">
                  No data found
                </div>
              ) : (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    ...options,
                    plotOptions: {
                      area: {
                        fillColor: {
                          linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1,
                          },
                          stops: [
                            [0, hexStringToRGBA(stringToColor(metricToWork.label || ""), 0.4)],
                            [1, hexStringToRGBA(stringToColor(metricToWork.label || ""), 0)],
                          ],
                        },
                        marker: {
                          enabled: false,
                        },
                        lineWidth: 3,
                        states: {
                          hover: {
                            lineWidth: 3,
                          },
                        },
                        threshold: null,
                      },
                    },
                    yAxis: {
                      title: {
                        text: null,
                      },
                      gridLineColor: isDarkMode ? "#696a6c" : "#333333",
                      labels: {
                        style: {
                          color: isDarkMode ? "#d3d2d2" : "#333333",
                        },
                      },
                      min: minValue - buffer,
                      max: maxValue + buffer,
                    },
                    tooltip: {
                      xDateFormat: "%b %e, %Y",
                      backgroundColor: isDarkMode ? "#333333" : "#FFFFFF",
                      style: {
                        color: !isDarkMode ? "#333333" : "#FFFFFF",
                      },
                      pointFormatter: function (this: Highcharts.TooltipFormatterContextObject) {
                        const formattedNumber = Highcharts.numberFormat(this.y as number, 0, "", ",");
                        return (
                          '<span style="color:' +
                          this.color +
                          '">\u25CF</span> ' +
                          this.series.name +
                          ": <b>" +
                          formattedNumber +
                          "</b><br/>"
                        );
                      },
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
