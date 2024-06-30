"use client";

import React from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { GlobalScoreDTO } from "~~/pages/api/stub/globalScore";

export const LeaderBoardGraph = ({ scores }: { scores: GlobalScoreDTO[] }) => {
  const keys = scores.length > 0 ? Object.keys(scores[0]) : [];

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
    <ResponsiveContainer width="100%" height={"100%"}>
      <LineChart data={scores} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        {keys.map((key, i) => {
          if (key == "date") {
            return <></>;
          }
          return (
            <Line
              key={i}
              type="monotone"
              dataKey={key}
              stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            />
          );
        })}
        <XAxis hide={true} dataKey="date" />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};
