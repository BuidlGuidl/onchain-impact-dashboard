import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ShareIcon } from "~~/components/assets/ShareIcon";
import CustomButton from "~~/components/onchain-impact-dashboard/CustomButton";
import { ProjectTotalsComponent } from "~~/components/onchain-impact-dashboard/projectTotalsComponent/projectTotalsComponent";
import { ProjectService } from "~~/services/onchainImpactDashboardApi/projectService";

export async function generateStaticParams() {
  const { getProjectIds } = ProjectService();
  const projectIds = await getProjectIds();
  return projectIds.map(id => ({ id }));
}

const ProjectDetail: NextPage<{ params: { id: string } }> = async ({ params }) => {
  const { getProjectById } = ProjectService();
  const data = await getProjectById(params.id);
  return (
    <>
      <section className="px-[5%] mt-6 relative">
        <Link className="absolute bg-white/40 backdrop-blur-sm  rounded-lg py-2 px-4" href="/" passHref>
          <ArrowLeftIcon className=" h-5 w-5 text-black  cursor-pointer" />
        </Link>
        <Image
          width={2000}
          height={440}
          className="mr-0 w-full bg-OPlightgray mb-4 rounded-lg"
          src={data.proejctCoverImageUrl}
          alt="Avatar"
        />

        <div className="flex w-full justify-between mb-4 mt-10 items-center">
          <Image width={54} height={54} className="mr-0" src={data.profileAvatarUrl} alt="Avatar" />
          <div className="flex flex-row flex-1 ml-4  gap-3">
            <h1 className="text-lg m-0">#1 {data?.name}</h1>
            <span className="bg-base-300 p-1 pl-4 pr-4 rounded-xl text-xs" style={{ paddingTop: "6px" }}>
              {data.category}
            </span>
          </div>
          <CustomButton text={"Share"} customClassName="border bg-transparent border-gray-200 bg-base-100">
            <ShareIcon />
          </CustomButton>
        </div>
        <div className="leaderboard-content lg:flex">
          <ProjectTotalsComponent id={params.id} />
        </div>
        <h2 className="font-semibold mt-8 mb-4">Project Description</h2>
        <p>{data?.description}</p>
        <h2 className="font-semibold mt-8 mb-4">Repositories</h2>
        <div className="flex flex-col mb-2">
          {[...data?.github, ...data?.packages].map((item, i) => (
            <div className="flex mb-4" key={i}>
              <a href={`${item}`} className="flex items-center" target="_blank" rel="noreferrer">
                <span className="w-64 truncate lg:w-full">{item}</span>
                <Image
                  className="ml-2"
                  src="/assets/svg/icons/linkArrow.svg"
                  width={14}
                  height={14}
                  alt={`repository link`}
                />
              </a>
            </div>
          ))}
        </div>
        {data?.socialLinks?.website && (
          <>
            <h2 className="font-semibold mt-8 mb-4">Web</h2>
            <div className="flex items-center mb-2">
              <a href={`${data.socialLinks.website}`} className="flex items-center" target="_blank" rel="noreferrer">
                {data.socialLinks.website}
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
          {data?.socialLinks?.farcaster && (
            <>
              <div className="flex items-center mb-2">
                <a href={`${data.socialLinks.farcaster}`} target="_blank" rel="noreferrer">
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
          {data?.socialLinks?.mirror && (
            <>
              <div className="flex items-center mb-2">
                <a href={`${data.socialLinks.mirror}`} target="_blank" rel="noreferrer">
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
          {data?.socialLinks?.twitter && (
            <>
              <div className="flex items-center mb-2">
                <a href={`${data.socialLinks.twitter}`} target="_blank" rel="noreferrer">
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

export default ProjectDetail;
