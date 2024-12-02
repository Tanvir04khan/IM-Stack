import Card from "@/components/Card";
import Header from "@/components/Header";
import InfoDisplay from "@/components/InfoDisplay";
import LeaderBoardCard, {
  LeaderBoardCardPropsType,
} from "@/components/LeaderBoardCard";
import ProjectTitle from "@/components/ProjectTitle";
import Tag from "@/components/Tag";
import Tooltip from "@/components/Tooltip";
import { Card as SCNCard } from "@/components/ui/card";
import { AvatarIcon } from "@radix-ui/react-icons";
import { useNavigate } from "@tanstack/react-router";
import { Edit, Info } from "lucide-react";
import React from "react";
import imstack from "../images/authpageimage.png";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Paths, QueryKeys } from "@/enum";
import { customFetch, getUser } from "@/utilts";
import { ResponseType, RLeaderBoardType, RUserDetails } from "@/type";

const Profile = () => {
  const navigation = useNavigate();
  const { user } = useUser();

  const { data: userData, isFetching: isLoadingUserData } = useQuery({
    queryKey: [QueryKeys.GET_USER, user?.id],
    queryFn: () => getUser(user ? user.id : ""),
    staleTime: 1000 * 5 * 60,
  });

  const { data: userDetails, isFetching: isLoadingUserDetails } = useQuery({
    queryKey: [QueryKeys.GET_USER_DETAILS, userData?.data.userId],
    queryFn: getUserDetails,
  });

  const { data: leaderBoardData, isFetching: isLoadingLeaderBoardData } =
    useQuery({
      queryKey: [QueryKeys.GET_TOP_FIVE_USERS],
      queryFn: getTopFiveUsers,
      staleTime: 1000 * 5 * 60,
    });

  async function getUserDetails(): Promise<ResponseType<RUserDetails>> {
    const data = await customFetch(
      `${Paths.GET_USER_DETAILS}/${userData?.data.userId}`
    );
    return data;
  }

  async function getTopFiveUsers(): Promise<ResponseType<RLeaderBoardType[]>> {
    const data = await customFetch(`${Paths.GET_TOP_FIVE_USERS}`);
    return data;
  }

  const userProject: {
    projectId: string;
    projectName: string;
    image: string;
    imageType: string;
    createdOn: string;
  }[] = userDetails
    ? userDetails.data.UsersRoles.map(({ Projects }) => ({
        projectId: Projects.projectId,
        projectName: Projects.projectName,
        image: Projects.icon,
        imageType: Projects.iconType,
        createdOn: Projects.createdOn,
      }))
    : [];

  const userTech: { technologyId: string; technology: string }[] = userDetails
    ? userDetails.data.UserTechnologies.map(({ Technologies }) => ({
        technologyId: Technologies.technologyId,
        technology: Technologies.technology,
      }))
    : [];

  return (
    <Header
      isLoading={
        isLoadingUserData || isLoadingUserDetails || isLoadingLeaderBoardData
      }
    >
      <div className="w-full max-w-5xl flex flex-col gap-4 lg:flex-row">
        <Card
          className="grow min-h-fit lg:min-h-[35rem]"
          title={
            <div className="flex items-center gap-2">
              {userDetails?.data.image ? (
                <img
                  src={userDetails.data.image}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <AvatarIcon className="w-10 h-10" />
              )}
              <div>
                <h1 className="font-semibold text-sm">{`${userDetails?.data.firstName} ${userDetails?.data.lastName}`}</h1>
                <h2 className="text-muted-foreground text-sm font-normal text-wrap">
                  {"Tanvir.Khan@ingrammicro.com"}
                </h2>
              </div>
            </div>
          }
          content={
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <h1 className="font-semibold text-lg">Projects</h1>
                <div className="flex flex-col items-start justify-center gap-4">
                  {userProject.map(
                    ({ projectId, projectName, image, createdOn }) => (
                      <SCNCard
                        key={projectId}
                        className="p-4 w-full flex items-center justify-between gap-4 hover:hover:shadow-lg duration-100 cursor-pointer"
                      >
                        <ProjectTitle
                          className="font-semibold gap-4"
                          imageClassName="w-10 h-10 rounded-md"
                          imageSrc={image ? image : ""}
                          ProjectName={projectName}
                        />
                        <div>
                          <InfoDisplay
                            lableClassName="text-muted-foreground text-sm"
                            valueClassName="text-sm font-semibold"
                            lable="Created On"
                            value={createdOn.split("T")[0]}
                          />
                        </div>
                      </SCNCard>
                    )
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="font-semibold text-lg">Technologies</h1>
                <div className="flex flex-wrap items-center gap-2">
                  {userTech.map(({ technologyId, technology }) => (
                    <Tag key={technologyId} content={technology} />
                  ))}
                </div>
              </div>
            </div>
          }
          action={
            <></>
            // <Tooltip content="Edit Profile">
            //   <Edit
            //     className="w-4 h-4 text-muted-foreground cursor-pointer"
            //     onClick={() =>
            //       navigation({ to: `/manageusers/${userData?.data.userId}` })
            //     }
            //   />
            // </Tooltip>
          }
        />
        <div className="flex flex-col gap-4">
          <Card
            title="Your score"
            content={
              <LeaderBoardCard
                image={userDetails?.data.image}
                name={`${userDetails?.data.firstName} ${userDetails?.data.lastName}`}
                rewardPoints={userDetails ? userDetails?.data.Rewards.score : 0}
              />
            }
            action={
              <Tooltip
                content={
                  <div>
                    <h1>Reward System:</h1>
                    <h1>100 Points: Creating project documentation.</h1>
                    <h1>
                      5 Points: When your question or answer reaches 100 likes.
                    </h1>
                    <h1>
                      5 Points: When your question or answer reaches 500 likes.
                    </h1>
                    <h1>
                      5 Points: When your answer is marked as the best by the
                      asker.
                    </h1>
                  </div>
                }
              >
                <Info className="w-4 h-4 cursor-pointer" />
              </Tooltip>
            }
          />
          <Card
            className="h-fit lg:max-w-[fit-content]"
            title="Leader Board"
            description="Top 5 users"
            content={
              <div className="flex flex-col items-center justify-center gap-4">
                {leaderBoardData?.data.map(({ Users, score }) => (
                  <LeaderBoardCard
                    key={Users.userId}
                    name={`${Users.firstName} ${Users.lastName}`}
                    rewardPoints={score}
                    image={Users.image}
                  />
                ))}
              </div>
            }
          />
        </div>
      </div>
    </Header>
  );
};

export default Profile;
