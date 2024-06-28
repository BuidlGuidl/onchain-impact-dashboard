import React from "react";
import Image from "next/image";
import { LeaderboardProps as LeaderboardCardProps } from "~~/types";

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ project, rating }) => {
  const { name, avatarUrl } = project;

  return (
    <div className="w-full">
      <div className="flex justify-between ">
        <div className="flex items-center">
          <Image width={40} height={40} className="mr-2" src={avatarUrl} alt="Avatar" />
          <p className="font-bold text-lg">{name}</p>
        </div>
        <p className="flex items-center font-bold text-lg m-0">{rating}%</p>
      </div>
    </div>
  );
};

export default LeaderboardCard;
