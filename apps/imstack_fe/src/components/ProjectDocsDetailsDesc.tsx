import React from "react";
import Tooltip from "./Tooltip";
import { AvatarWithTooltip } from "@/type";

type ProjectDocsDetailsDescPrpsType = {
  users: AvatarWithTooltip[];
};

const ProjectDocsDetailsDesc = ({ users }: ProjectDocsDetailsDescPrpsType) => {
  return (
    <div className="w-full flex items-center justify-left gap-1">
      {users.map(({ avatar, name }) => (
        <Tooltip key={name} content={name}>
          {avatar}
        </Tooltip>
      ))}
    </div>
  );
};

export default ProjectDocsDetailsDesc;
