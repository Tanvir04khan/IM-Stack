import React from "react";
import { Card } from "./ui/card";
import { AvatarIcon } from "@radix-ui/react-icons";

const CommentCard = () => {
  return (
    <Card className="w-full p-4">
      <div className="flex items-center gap-2">
        <AvatarIcon className="h-8 w-8" />
        <div>
          <p className="text-lg font-medium">TanvirKhan</p>
          <p>can you provide more details. as it is not undertandable</p>
        </div>
      </div>
      <p className="text-right">20/11/2024</p>
    </Card>
  );
};

export default CommentCard;
