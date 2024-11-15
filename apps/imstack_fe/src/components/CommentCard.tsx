import React from "react";
import { Card } from "./ui/card";
import { AvatarIcon } from "@radix-ui/react-icons";

export type CommentCardPropsType = {
  userName: string;
  imageSrc?: string;
  comment: string;
  commentId: string;
  commentedOn: string;
};

const CommentCard = ({
  userName,
  imageSrc,
  comment,
  commentedOn,
}: CommentCardPropsType) => {
  return (
    <Card className="w-full p-4">
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          {imageSrc ? (
            <img src={imageSrc} className="h-8 w-8 rounded-full" />
          ) : (
            <AvatarIcon className="h-8 w-8" />
          )}
          <p className="text-lg font-medium">{userName}</p>
        </div>
        <p>{comment}</p>
      </div>
      <p className="text-right">{commentedOn}</p>
    </Card>
  );
};

export default CommentCard;
