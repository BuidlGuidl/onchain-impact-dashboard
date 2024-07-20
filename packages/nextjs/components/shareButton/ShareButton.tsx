"use client";

import React, { useState } from "react";
import OnchainInfoModal from "../OnchainInfoModal";
import { ShareIcon } from "../assets/ShareIcon";
import CustomButton from "../onchain-impact-dashboard/CustomButton";
import { IProject } from "~~/services/mongodb/models/project";

interface IProps {
  project: IProject;
}
export const ShareButton = ({ project }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <OnchainInfoModal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} project={project} />
      <CustomButton
        text={"Share"}
        customClassName="bg-OPred rounded-md p-2 flex gap-2 text-white font-medium text-xs sm:text-sm"
        onClick={() => setIsModalOpen(true)}
      >
        <ShareIcon />
      </CustomButton>
    </>
  );
};
