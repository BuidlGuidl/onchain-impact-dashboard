import Image from "next/image";
import type { NextPage } from "next";
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
      <section className="px-4">
        <Image
          width={2000}
          height={440}
          className="mr-0 w-full bg-OPlightgray mb-4 rounded-lg"
          src={data.proejctCoverImageUrl}
          alt="Avatar"
        />

        <div className="flex w-full justify-between mb-4 items-center">
          <Image width={54} height={54} className="mr-0" src={data.profileAvatarUrl} alt="Avatar" />
          <div className="flex flex-col flex-1 ml-4 justify-center">
            <h1 className="text-lg m-0">#1 {data?.name}</h1>
          </div>
          <CustomButton text={"Share"} customClassName="border bg-transparent border-gray-200 bg-base-100">
            <ShareIcon />
          </CustomButton>
        </div>
        <main className="leaderboard-content lg:flex">
          <ProjectTotalsComponent id={params.id} />
        </main>
        <h2 className="font-semibold mt-8 mb-4">Description</h2>
        <p>{data?.description}</p>
        <h2 className="font-semibold mt-8 mb-4">Repositories</h2>
        {[...data?.github, ...data?.packages].map((item, i) => (
          <div key={i} className="flex items-center mb-2">
            <a href={`${item}`} className="flex items-center" target="_blank" rel="noreferrer">
              {item}
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
