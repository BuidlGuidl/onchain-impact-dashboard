"use client";

import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { IGlobalScore } from "~~/services/mongodb/models/globalScore";
import { formatDate } from "~~/utils/onchainImpactDashboard/common";

export const LeaderBoardGraph = ({ scores }: { scores: IGlobalScore[] }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-300 p-4 rounded-lg shadow">
          <p className="m-0 p-0 label font-bold">Date</p>
          <p className="m-0 p-0 label">{formatDate(label)}</p>
          {payload.map((entry: any, index: any) => (
            <div key={`item-${index}`} style={{ color: entry.color }}>
              <p className="m-0 mt-4 p-0 label font-bold">Impact Index</p>
              <p className="m-0 p-0 label">{entry.value}</p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" className={"absolute top-14"}>
      <AreaChart data={scores} margin={{ top: 20, right: -16, bottom: 40, left: 0 }}>
        <Area type="monotone" dataKey="impact_index" stroke="#ef4444" fill="#ef444485" />
        <XAxis tick={false} fontSize={10} hide={false} dataKey="date" />
        <YAxis fontSize={10} type={"category"} hide={false} orientation="right" />
        <Tooltip content={<CustomTooltip />} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
