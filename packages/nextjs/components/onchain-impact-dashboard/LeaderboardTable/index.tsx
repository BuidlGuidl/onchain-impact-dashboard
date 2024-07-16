"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "../SearchBar";
import SkeletonTable from "./SkeletonTable";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { IProjectMovement } from "~~/services/mongodb/models/projectMovement";
import "~~/styles/leaderboard.css";

interface Props {
  projects: IProjectMovement[];
  loading: boolean;
  selectedMetricName: string;
}

type ColumnHeader = keyof IProjectMovement;

const formatMovement = (movement: number) => {
  if (movement >= 0) {
    return `+ ${movement}%`;
  }
  return `- ${movement * -1}%`;
};

const HEADERS = [
  ["name", "Project"],
  ["category", "Category"],
  ["7", "7 days"],
  ["30", "30 days"],
  ["90", "90 days"],
];

const LeaderboardTable = ({ projects, loading, selectedMetricName = "impact_index" }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState<ColumnHeader>();
  const [sortDesc, setSortDesc] = useState(false);
  const projectsMatchingSearch = projects.filter((it: any) =>
    it.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
  const sortedProjects = projectsMatchingSearch.sort((a, b) => {
    if (sortValue) {
      if (["7", "30", "90"].includes(sortValue)) {
        const range = sortValue as "7" | "30" | "90";
        const aMovement = a.movementByMetric[selectedMetricName][range];
        const bMovement = b.movementByMetric[selectedMetricName][range];
        if (sortDesc) {
          return aMovement > bMovement ? 1 : -1;
        }
        return aMovement < bMovement ? 1 : -1;
      }

      const nameOrCategory = sortValue as "name" | "category";
      if (sortDesc) {
        return a[nameOrCategory].toLowerCase() > b[nameOrCategory].toLowerCase() ? 1 : -1;
      } else {
        return a[nameOrCategory].toLowerCase() < b[nameOrCategory].toLowerCase() ? 1 : -1;
      }
    }
    return 0;
  });

  const getHeaderClickHandler = (value: ColumnHeader) => () => {
    if (sortValue === value) {
      setSortDesc(!sortDesc);
    } else {
      setSortValue(value);
      setSortDesc(false);
    }
  };

  const getArrowIcon = (value: ColumnHeader) => {
    if (sortValue === value) {
      return sortDesc ? <ArrowUpIcon className="w-3 ml-1" /> : <ArrowDownIcon className="w-3 ml-1" />;
    }
  };

  return (
    <>
      <div className="leaderboard-wrap flex flex-col rounded-lg pt-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold">Leaderboard</div>
          <SearchBar placeholder="Search" onChange={e => setSearchValue(e)} value={searchValue} />
        </div>
        <div className="border-[1px] border-[#E0E2EB] rounded-lg mt-8 relative h-[404px] overflow-scroll">
          <table className="w-full">
            <thead className="sticky top-0">
              <tr>
                {HEADERS.map(([value, label]) => (
                  <th key={value} onClick={getHeaderClickHandler(value)}>
                    <div className="flex w-20">
                      {label} {getArrowIcon(value as ColumnHeader)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <SkeletonTable />
              ) : !sortedProjects.length ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    No projects found
                  </td>
                </tr>
              ) : (
                sortedProjects.map((item: IProjectMovement) => (
                  <tr key={item.projectId}>
                    <td>
                      <Link href={`/project/${item.projectId}`}>
                        <div className="flex items-center font-semibold truncate">
                          <Image
                            width={24}
                            height={24}
                            className="mr-3 rounded"
                            src={item.profileAvatarUrl}
                            alt="Avatar"
                          />
                          {item.name}
                        </div>
                      </Link>
                    </td>
                    <td>{item.category}</td>
                    <td>{formatMovement(item.movementByMetric[selectedMetricName]["7"])}</td>
                    <td>{formatMovement(item.movementByMetric[selectedMetricName]["30"])}</td>
                    <td>{formatMovement(item.movementByMetric[selectedMetricName]["90"])}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LeaderboardTable;
