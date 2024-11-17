import React from "react";
import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";
import { AvatarIcon } from "@radix-ui/react-icons";

export type LeaderBoardCardPropsType = {
  image?: string;
  name: string;
  emailId?: string;
  rewardPoints: number;
};

const LeaderBoardCard = ({
  image,
  name,
  emailId,
  rewardPoints,
}: LeaderBoardCardPropsType) => {
  return (
    <Card className="w-full flex items-center justify-between gap-4 p-2 hover:hover:shadow-lg duration-100 cursor-pointer">
      <div className="flex items-center gap-2">
        {image ? (
          <img src={image} className="w-10 h-10 rounded-full" />
        ) : (
          <AvatarIcon className="w-10 h-10" />
        )}

        <h1 className="font-semibold text-sm text-nowrap">{name}</h1>
      </div>
      <div className="flex items-center text-sm  font-bold">
        <Award className="w-5 h-5" />
        <h1>{rewardPoints}</h1>
      </div>
    </Card>
  );
};

export default LeaderBoardCard;
