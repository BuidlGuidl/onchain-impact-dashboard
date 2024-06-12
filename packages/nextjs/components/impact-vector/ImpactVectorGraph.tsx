"use client";

import React, { useState } from "react";
import CustomXAxis from "./CustomXAxis";
import { scaleLog } from "d3-scale";
import { Area, Bar, CartesianGrid, ComposedChart, ResponsiveContainer, Text, Tooltip, XAxis, YAxis } from "recharts";
import { formatEther } from "viem";
import { DataSet, ImpactVectors } from "~~/app/types/data";
import { abbreviateNumber } from "~~/utils/onchainImpactDashboard/common";

const logScale = scaleLog();

const NON_VECTOR_KEYS = ["image", "name", "profile", "opAllocation"];

const COLOR_CLASS_BY_VECTOR: { [key in keyof ImpactVectors]: string } = {
  "# GitHub Repos": "text-[#ff0000]",
  "Date First Commit": "text-[#00ff00]",
  "Total Stars": "text-[#FA5300]",
  "Total Forks": "text-[#5A9E00]",
  "Total Contributors": "text-[#FF0420]",
  "Contributors Last 6 Months": "text-[#3374DB]",
  "Avg Monthly Active Devs Last 6 Months": "text-[#ff8000]",
  "# OP Contracts": "text-[#8000ff]",
  "Date First Txn": "text-[#00ff80]",
  "Total Onchain Users": "text-[#8D33DB]",
  "Onchain Users Last 6 Months": "text-[#008F8F]",
  "Total Txns": "text-[#0080ff]",
  "Total Txn Fees (ETH)": "text-[#ff0080]",
  "Txn Fees Last 6 Months (ETH)": "text-[#ff80ff]",
  "# NPM Packages": "text-[#027A48]",
  "Date First Download": "text-[#8080ff]",
  "Total Downloads": "text-[#147C49]",
  "Downloads Last 6 Months": "text-[#B42318]",
};
const shouldRenderAsVector = (key: string) =>
  !key.includes("_actual") && !key.includes("_normalized") && !NON_VECTOR_KEYS.includes(key);

const transformData = (impactData: DataSet[]): any[] => {
  return impactData.map(vectorDataSet => {
    const dataKeys = Object.keys(vectorDataSet.data) as (keyof ImpactVectors)[];
    const transformedItem: any = {
      image: vectorDataSet.metadata["project_image"],
      name: vectorDataSet.metadata["project_name"],
      profile: `${vectorDataSet.metadata["project_name"]}===${vectorDataSet.metadata["project_image"]}`,
      opAllocation: Math.floor(vectorDataSet.opAllocation),
    };

    // calculate each vectors portion of total OP allocated
    const totalNormalized = dataKeys.reduce((total, key) => total + (vectorDataSet.data[key]?.normalized || 0), 0);

    dataKeys.forEach(key => {
      const normalizedValue = vectorDataSet.data[key]?.normalized || 0;
      const percentageOfOp = normalizedValue / totalNormalized;
      const amountOPDueToVector = vectorDataSet.opAllocation * percentageOfOp;

      transformedItem[`${key}_normalized`] = normalizedValue;
      transformedItem[`${key}_actual`] = vectorDataSet.data[key]?.actual;
      transformedItem[`${key}`] = amountOPDueToVector;
    });

    return transformedItem;
  });
};

// Function to sort array in descending order based on opAllocation
const sortByTotalDescending = (dataSetArray: any[]) => {
  return dataSetArray.slice().sort((a, b) => a.opAllocation - b.opAllocation);
};

export default function ImpactVectorGraph({ data, projectsShown }: { data: DataSet[]; projectsShown: number }) {
  const [showVectors, setShowVectors] = useState(false);
  const [isLogarithmic, setIsLogarithmic] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const transformedData = transformData(sortByTotalDescending(data));

  const handleMouseMove = (e: any) => {
    const { value } = e;
    if (hoveredProject !== value) {
      setHoveredProject(value);
    }
  };
  const maxProjects = transformedData.length > projectsShown ? projectsShown : transformedData.length;
  return (
    <div className="flex flex-col w-full">
      {transformedData.length > 0 && (
        <div className="items-center text-xs justify-end flex">
          <span className=" pl-8 flex-grow">
            Total Projects:{maxProjects}/{transformedData.length}
          </span>
          <button onClick={() => setShowVectors(!showVectors)}>{showVectors ? "Hide Vectors" : "Show Vectors"}</button>
          <button className="px-3" onClick={() => setIsLogarithmic(!isLogarithmic)}>
            {isLogarithmic ? "Linear" : "Logarithmic"}
          </button>
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={300}
          data={transformedData.slice(-projectsShown)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 40,
          }}
          onMouseMove={e => {
            const { activePayload } = e;
            if (activePayload && activePayload.length > 0) {
              const hoveredProjectName = activePayload[0].payload.name;
              if (hoveredProject !== hoveredProjectName) {
                setHoveredProject(hoveredProjectName);
              }
            } else {
              setHoveredProject(null);
            }
          }}
        >
          <YAxis
            axisLine={false}
            tickLine={false}
            className="text-xs opacity-50"
            tickMargin={10}
            width={55}
            scale={isLogarithmic ? logScale : "linear"}
            domain={[1, "auto"]}
            tickFormatter={abbreviateNumber}
            allowDataOverflow
            label={
              <Text x={0} y={0} dx={20} dy={150} offset={0} angle={-90} className="text-sm">
                OP Allocation
              </Text>
            }
          />
          <XAxis
            dataKey="profile"
            onMouseMove={handleMouseMove}
            axisLine={false}
            height={0}
            tickLine={false}
            tick={<CustomXAxis x={0} y={0} hovered={hoveredProject} />}
            interval={0}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="w-fit h-fit space-y-2 p-4 pt-1 text-sm bg-base-100 shadow shadow-xl p-6 mb-6 bg-white rounded-xl">
                    <p className="font-semibold">{`${data.name}`}</p>
                    <p>
                      <span className=" text-red-500 font-semibold">OP Allocation:</span> {data.opAllocation}
                    </p>
                    {Object.keys(data)
                      .filter(key => key.endsWith("_actual"))
                      .map(key => {
                        const value = data[key];
                        let formattedValue;
                        if (key.includes("(ETH)")) {
                          formattedValue = value && value !== "none" ? formatEther(value, "gwei") : "none";
                        } else {
                          formattedValue = !isNaN(value || "string")
                            ? Math.floor(parseFloat(value)) || "none"
                            : value || "none";
                        }
                        const label = key.replace("_actual", "");
                        return (
                          <p key={key}>
                            <span className={COLOR_CLASS_BY_VECTOR[key.replace("_actual", "") as keyof ImpactVectors]}>
                              {label}:{" "}
                            </span>
                            {`${formattedValue}`}
                          </p>
                        );
                      })}
                  </div>
                );
              }
              return null;
            }}
          />

          {showVectors &&
            transformedData[0] &&
            Object.keys(transformedData[0])
              .filter(shouldRenderAsVector)
              .map(key => {
                return (
                  <Bar
                    key={key}
                    dataKey={key}
                    fill={COLOR_CLASS_BY_VECTOR[key as keyof ImpactVectors]?.match(/#[0-9A-Fa-f]{6}/)?.[0]}
                    stackId={1}
                  />
                );
              })}
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="1" x2="0" y2="0">
              <stop offset="5%" stopColor="rgba(20, 124, 73, 0.1)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FBDD5D" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid y={3000000} strokeDasharray="2" />
          <Area
            type="monotone"
            dataKey="opAllocation"
            stroke="#F00420"
            fillOpacity={1}
            fill="url(#colorTotal)"
            name="OP Allocation"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
