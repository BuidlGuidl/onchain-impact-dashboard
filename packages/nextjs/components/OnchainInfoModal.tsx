"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LinkIcon } from "@heroicons/react/24/outline";
import { IProject } from "~~/services/mongodb/models/project";

interface Props {
  isModalOpen: boolean;
  project: IProject | null;
  closeModal: () => void;
}
const OnchainInfoModal: React.FC<Props> = ({ isModalOpen, closeModal, project }) => {
  const [plainURL, setPlainURL] = useState("");
  const [text, setText] = useState("");
  const BASE_COPY = `Check out this amazing project on the Retro Funding Leaderboard from Optimism! ${project?.name} is doing great. Support and follow their progress!\n #OPleaderboard #${project?.name}`;
  const encodedText = encodeURIComponent(plainURL);

  const getTextToShare = (type: "twitter" | "farcaster") => {
    let account = "";
    let splittedUrl: string[] = [];
    if (type == "twitter") {
      splittedUrl = project?.socialLinks.twitter?.split("/") || [];
    } else {
      const hasFarcasterUrls = !!project?.socialLinks.farcaster.length;
      if (hasFarcasterUrls) {
        splittedUrl = project?.socialLinks.farcaster[0].split("/") || [];
      }
    }
    account = splittedUrl.length > 0 ? "@" + `${splittedUrl[splittedUrl.length - 1]}` : project?.name ?? "";
    const BASE = `Check out this amazing project on the Retro Funding Leaderboard from @optimism! ${account} is doing great. Support and follow their progress!\n #OPleaderboard `;
    let textToShare = text != "" ? encodeURIComponent(text) : encodeURIComponent(BASE);
    textToShare += "\n";
    const twitterIntentUrl = `https://x.com/intent/tweet?text=${textToShare}&url=${encodedText}`;
    const farcasterIntentUrl = `https://warpcast.com/~/compose?text=${textToShare}&embeds[]=${encodedText}`;
    return type == "twitter" ? twitterIntentUrl : farcasterIntentUrl;
  };

  useEffect(() => {
    if (!window) {
      return;
    }
    const url = `${window.location.toString()}`;
    setPlainURL(url);
  }, [project]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(plainURL);
  };
  return (
    <>
      {isModalOpen && (
        <dialog id="my_modal_1" className="modal   bg-black/10 backdrop-blur-sm " open>
          <div className="modal-box max-w-md w-full px-6 pt-11">
            <div className="text-center">
              <h3 className="font-bold  sm:text-lg m-0">{`Help ${project?.name} grow!`}</h3>
              <p className="m-0 text-sm sm:text-base text-center ">
                Share this project with your network to increase its visibility. Every share counts!
              </p>
              <div>
                <textarea
                  className="mt-4 pb-2 input-info input-bordered bg-secondary focus:outline-none border pl-2 border-neutral hover:border-gray-400 rounded-xl w-full pt-2 text-neutral-500 leading-tight"
                  name=""
                  rows={5}
                  id=""
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder={BASE_COPY}
                ></textarea>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6">
              <Link
                href={getTextToShare("farcaster")}
                className="cursor-pointer py-1 max-w-[72px] w-full px-4 border  border-neutral-400/30 rounded-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/assets/svg/icons/farcaster.svg" width={40} height={40} alt="farcaster" />
              </Link>
              <Link
                href={getTextToShare("twitter")}
                className="cursor-pointer py-1 max-w-[72px] w-full px-4 border  border-neutral-400/30 rounded-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/assets/svg/icons/twitter.svg" width={40} height={40} alt="farcaster" />
              </Link>
              <div
                onClick={() => copyToClipboard()}
                className=" cursor-pointer py-1 max-w-[72px] w-full px-4 border  border-neutral-400/30 rounded-xl"
              >
                <div className="ml-1">
                  <LinkIcon className="" height={40} width={30} />
                </div>
              </div>
            </div>
            <div className="modal-action">
              <button className="bg-OPred w-full py-3 font-medium text-white rounded-md" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default OnchainInfoModal;
