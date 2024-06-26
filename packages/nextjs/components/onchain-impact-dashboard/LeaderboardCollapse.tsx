import React from "react";
import Link from "next/link";
import { ShareIcon } from "../assets/ShareIcon";
import CustomButton from "./CustomButton";
import LeaderboardCard from "./LeaderboardCard";
import { LeaderboardProps as LeaderboardCollapseProps } from "~~/types";

const LeaderboardCollapse: React.FC<
  LeaderboardCollapseProps & {
    isActive: boolean;
    setSelectedProject: () => void;
    shareProject: () => void;
  }
> = ({ project, rating, isActive, shareProject, setSelectedProject }) => {
  const { description } = project;

  return (
    <div className={`collapse bg-base-200 border border-gray-300 rounded-lg mb-4`}>
      <input type="checkbox" checked={isActive} onChange={() => setSelectedProject()} />
      <div className="collapse-title text-xl font-medium pe-4">
        <LeaderboardCard project={project} rating={rating}></LeaderboardCard>
      </div>

      <div className="collapse-content">
        {isActive && (
          <>
            <p className="m-0">{description}</p>
            <div className="flex mt-5">
              <Link href={"/project/1"}>
                <CustomButton
                  text={"View more"}
                  customClassName="bg-red-600 mr-3 text-white hover:bg-red-500 border-transparent btn-md"
                />
              </Link>
              <CustomButton text={"Share"} customClassName="border border-gray-200" onClick={() => shareProject()}>
                <ShareIcon />
              </CustomButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderboardCollapse;
