import React from "react";
import { ShareIcon } from "../assets/ShareIcon";
import CustomButton from "./CustomButton";
import LeaderboardCard from "./LeaderboardCard";
import { LeaderboardProps as LeaderboardCollapseProps } from "~~/types";

const LeaderboardCollapse: React.FC<LeaderboardCollapseProps> = ({ project, rating }) => {
  const { description } = project;

  return (
    <div className="collapse bg-base-200 border border-gray-300 rounded-lg">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium pe-4">
        <LeaderboardCard project={project} rating={rating}></LeaderboardCard>
      </div>
      <div className="collapse-content">
        <p className="m-0">{description}</p>
        <div className="collapse-action flex mt-5">
          <CustomButton
            text={"View more"}
            customClassName="bg-red-600 mr-3 text-white hover:bg-red-500 border-transparent btn-md"
          />
          <CustomButton text={"Share"} customClassName="border border-gray-200">
            <ShareIcon />
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCollapse;
