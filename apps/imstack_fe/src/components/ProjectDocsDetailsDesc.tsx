import React, { ReactNode } from "react";
import Tooltip from "./ToolTip";
import { AvatarWithTooltip } from "@/type";

type ProjectDocsDetailsDescPrpsType = {
  users: AvatarWithTooltip[];
};

const ProjectDocsDetailsDesc = ({ users }: ProjectDocsDetailsDescPrpsType) => {
  return (
    <div className="w-full flex items-center justify-left gap-2">
      {users.map(({ avatar, name }) => (
        <Tooltip key={name} content={name}>
          {avatar}
        </Tooltip>
      ))}
    </div>
  );
};

export default ProjectDocsDetailsDesc;
