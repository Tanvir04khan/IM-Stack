import React from "react";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Tooltip from "@/components/Tooltip";
import { useNavigate } from "@tanstack/react-router";
import { Card as SCNCard } from "@/components/ui/card";
import { Award, Coins, CoinsIcon, Edit } from "lucide-react";
import imstack from "../images/authpageimage.png";
import LeaderBoardCard, {
  LeaderBoardCardPropsType,
} from "@/components/LeaderBoardCard";
import { AvatarIcon } from "@radix-ui/react-icons";
import ProjectTitle from "@/components/ProjectTitle";
import Tag from "@/components/Tag";
import InfoDisplay from "@/components/InfoDisplay";

const leaderBoard: LeaderBoardCardPropsType[] = [
  {
    image: imstack,
    emailId: "tanvir.khan@ingrammicro.com",
    name: "Tanvir Khan",
    rewardPoints: 3000,
  },
  {
    image: imstack,
    emailId: "tanvir.khan@ingrammicro.com",
    name: "Tanvir Khan",
    rewardPoints: 3000,
  },
  {
    image: imstack,
    emailId: "tanvir.khan@ingrammicro.com",
    name: "Tanvir Khan",
    rewardPoints: 3000,
  },
  {
    image: "",
    emailId: "tanvir.khan@ingrammicro.com",
    name: "Tanvir Khan",
    rewardPoints: 3000,
  },
  {
    image: imstack,
    emailId: "tanvir.khan@ingrammicro.com",
    name: "Tanvir Khan",
    rewardPoints: 3000,
  },
];

const Profile = () => {
  const navigation = useNavigate();

  return (
    <Header>
      <div className="w-full max-w-5xl flex flex-col gap-4 lg:flex-row">
        <Card
          className="grow min-h-fit lg:min-h-[35rem]"
          title={
            <div className="flex items-center gap-2">
              {imstack ? (
                <img src={imstack} className="w-10 h-10 rounded-full" />
              ) : (
                <AvatarIcon className="w-10 h-10" />
              )}
              <div>
                <h1 className="font-semibold text-sm">{"Tanvir Khan"}</h1>
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
                  {[1, 2, 3, 4, 5].map(() => (
                    <SCNCard className="p-4 w-full flex items-center justify-between gap-4 hover:hover:shadow-lg duration-100 cursor-pointer">
                      <ProjectTitle
                        className="font-semibold gap-4"
                        imageClassName="w-10 h-10 rounded-md"
                        imageSrc={imstack}
                        ProjectName="IM Stact"
                      />
                      <div>
                        <InfoDisplay
                          lableClassName="text-muted-foreground text-sm"
                          valueClassName="text-sm font-semibold"
                          lable="Created On"
                          value="20/11/2024"
                        />
                      </div>
                    </SCNCard>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="font-semibold text-lg">Technologies</h1>
                <div className="flex flex-wrap items-center gap-2">
                  <Tag content={"React JS"} />
                  <Tag content={"React JS"} />
                  <Tag content={"React JS"} />
                  <Tag content={"React JS"} />
                </div>
              </div>
            </div>
          }
          action={
            <Tooltip content="Edit Profile">
              <Edit
                className="w-4 h-4 text-muted-foreground cursor-pointer"
                onClick={() => navigation({ to: "/manageusers/test" })}
              />
            </Tooltip>
          }
        />
        <Card
          className="h-fit lg:max-w-[fit-content]"
          title="Leader Board"
          description="Top 5 users"
          content={
            <div className="flex flex-col items-center justify-center gap-4">
              {leaderBoard.map((item) => (
                <LeaderBoardCard key={item.emailId} {...item} />
              ))}
            </div>
          }
        />
      </div>
    </Header>
  );
};

export default Profile;
