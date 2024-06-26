import Image from "next/image";
import type { NextPage } from "next";
import { ShareIcon } from "~~/components/assets/ShareIcon";
import CustomButton from "~~/components/onchain-impact-dashboard/CustomButton";
import { IMAGE_URL } from "~~/utils/onchainImpactDashboard/initialMockData";

const ProjectDetail: NextPage = () => {
  return (
    <>
      <section className="px-4">
        <img className="w-full mb-4 rounded-lg" src="https://placehold.co/1064x200" alt="placeholder"></img>
        <div className="flex w-full justify-between mb-4 items-center">
          <Image width={54} height={54} className="mr-2" src={IMAGE_URL} alt="Avatar" />
          <div className="flex flex-col flex-1 ml-4 justify-center">
            <h1 className="text-lg m-0">#1 Project Detail Page</h1>
            <span>Lorem ipsum dolor sit amet, consectetur.</span>
          </div>
          <CustomButton text={"Share"} customClassName="border bg-transparent border-gray-200">
            <ShareIcon />
          </CustomButton>
        </div>
        <main className="leaderboard-content lg:flex">
          <div className="mb-3 border border-gray-300 rounded-lg p-4 grow lg:mr-4 lg:7/12 min-h-[300px]">
            Graph goes here...
          </div>
          <div className="mb-3 border border-gray-300 rounded-lg pl-4 pt-4 pr-4 lg:basis-5/12">
            <CheckboxItem name="check1" />
            <CheckboxItem name="check2" />
            <CheckboxItem name="check3" />
          </div>
        </main>
        <h2 className="font-semibold mt-8 mb-4">Description</h2>
        <p>
          See the onchain impact that is beeing generated across the superchain Retro Funding 4 established metrics to
          measure onchain impact. These metrics will be evolve round over round.
        </p>
        <h2 className="font-semibold mt-8 mb-4">Web</h2>
        <div className="flex items-center mb-2">
          <a href="">Lorem ipsum dolor sit amet</a>
          <Image className="ml-2" src="/assets/svg/icons/linkArrow.svg" width={14} height={14} alt="farcaster" />
        </div>
        <div className="flex items-center mb-2">
          <a href="">Lorem ipsum dolor sit amet</a>
          <Image className="ml-2" src="/assets/svg/icons/linkArrow.svg" width={14} height={14} alt="farcaster" />
        </div>
        <h2 className="font-semibold mt-8 mb-4">Farcaster</h2>
        <div className="flex items-center mb-2">
          <a href="">Lorem ipsum dolor sit amet</a>
          <Image className="ml-2" src="/assets/svg/icons/linkArrow.svg" width={14} height={14} alt="farcaster" />
        </div>
        <div className="flex items-center mb-2">
          <a href="">Lorem ipsum dolor sit amet</a>
          <Image className="ml-2" src="/assets/svg/icons/linkArrow.svg" width={14} height={14} alt="farcaster" />
        </div>
      </section>
    </>
  );
};
interface ICheckboxItem {
  name: string;
}
const CheckboxItem = ({ name }: ICheckboxItem) => {
  return (
    <div className="border border-gray-300 bg-base-200 rounded-lg p-4  mb-4">
      <label className="flex justify-center gap-4" htmlFor={name}>
        <div className="">
          <input id={name} type="checkbox" className=" w-[18px] h-[18px]  accent-blue-600" />
        </div>
        <div>
          <h3 className="">Title</h3>
          <span className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </span>
        </div>
      </label>
    </div>
  );
};

export default ProjectDetail;
