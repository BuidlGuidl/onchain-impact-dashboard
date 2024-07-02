"use client";

import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GlobalScoreDTO } from "~~/pages/api/globalScore";

export const LeaderBoardGraph = ({ scores }: { scores: GlobalScoreDTO[] }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-300">
          <p className="m-1 label">{`Date : ${label}`}</p>
          {payload.map((entry: any, index: any) => (
            <p key={`item-${index}`} className="m-1" style={{ color: entry.color }}>
              {`${entry.name} : ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" className={"absolute top-14"}>
      <AreaChart data={scores} margin={{ top: 20, right: -16, bottom: 40, left: 0 }}>
        <Area type="monotone" dataKey="globalScore" stroke="#ef4444" fill="#ef444485" />
        <XAxis tick={false} fontSize={10} hide={false} dataKey="date" />
        <YAxis fontSize={10} type={"category"} hide={false} orientation="right" />
        <Tooltip content={<CustomTooltip />} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
