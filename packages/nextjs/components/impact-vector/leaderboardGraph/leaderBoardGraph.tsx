"use client";

import React, { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export const LeaderBoardGraph = () => {
  const [scores, setScores] = useState<any[]>([]);

  const getScores = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stub/globalScore`);
    const data: any[] = await response.json();
    setScores(data);
  };

  useEffect(() => {
    getScores();
  }, []);

  const keys = scores.length > 0 ? Object.keys(scores[0]) : [];
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
        <XAxis dataKey="date" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
