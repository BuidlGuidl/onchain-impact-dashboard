import Image from "next/image";
import type { NextPage } from "next";
import { ShareIcon } from "~~/components/assets/ShareIcon";
import CustomButton from "~~/components/onchain-impact-dashboard/CustomButton";
import { Project } from "~~/services/database/schema";

const ProjectDetail: NextPage<{ params: { id: string } }> = async ({ params }) => {
  const response = await fetch(`http://localhost:3000/api/stub/projects?id=${params.id}`);
  const data: Project = await response.json();
  return (
    <>
      <section className="px-4">
        <div className="w-full h-[200px] bg-OPlightgray mb-4 rounded-lg"></div>
        <div className="flex w-full justify-between mb-4 items-center">
          <img width={54} height={54} className="mr-2" src={data.avatarUrl} alt="Avatar" />
          <div className="flex flex-col flex-1 ml-4 justify-center">
            <h1 className="text-lg m-0">#1 {data?.name}</h1>
            <span>{data?.description}</span>
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
        <p>{data?.description}</p>
        {data?.socialLinks.website && (
          <>
            <h2 className="font-semibold mt-8 mb-4">Web</h2>
            <div className="flex items-center mb-2">
              <a href={`${data?.socialLinks.website}`} className="flex items-center" target="_blank" rel="noreferrer">
                {data?.socialLinks.website}
                <Image
                  className="ml-2"
                  src="/assets/svg/icons/linkArrow.svg"
                  width={14}
                  height={14}
                  alt={`${data.name} website`}
                />
              </a>
            </div>
          </>
        )}

        <h2 className="font-semibold mt-8 mb-4">Social Media Links</h2>
        <div className="flex">
          {data?.socialLinks.farcaster && (
            <>
              <div className="flex items-center mb-2">
                <a href={`${data?.socialLinks.farcaster}`} target="_blank" rel="noreferrer">
                  <Image
                    className="ml-2"
                    src="/assets/svg/icons/farcaster.svg"
                    width={28}
                    height={28}
                    alt={`${data.name} farcaster link`}
                  />
                </a>
              </div>
            </>
          )}
          {data?.socialLinks.mirror && (
            <>
              <div className="flex items-center mb-2">
                <a href={`${data?.socialLinks.mirror}`} target="_blank" rel="noreferrer">
                  <Image
                    className="ml-2"
                    src="/assets/svg/icons/twitter.svg"
                    width={28}
                    height={28}
                    alt={`${data.name} mirror link`}
                  />
                </a>
              </div>
            </>
          )}
          {data?.socialLinks.twitter && (
            <>
              <div className="flex items-center mb-2">
                <a href={`${data?.socialLinks.twitter}`} target="_blank" rel="noreferrer">
                  <Image
                    className="ml-2"
                    src="/assets/svg/icons/twitter.svg"
                    width={28}
                    height={28}
                    alt={`${data.name} twitter link`}
                  />
                </a>
              </div>
            </>
          )}
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
