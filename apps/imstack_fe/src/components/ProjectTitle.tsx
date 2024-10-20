import React from "react";

type ProjectTitleType = {
  imageSrc: string;
  ProjectName: string;
  className?: string;
};

const ProjectTitle = ({
  imageSrc,
  ProjectName,
  className,
}: ProjectTitleType) => {
  return (
    <div className={"flex items-center gap-2 w-max-content " + className}>
      <img className="h-12 w-12 rounded-md" src={imageSrc} />
      <h1>{ProjectName}</h1>
    </div>
  );
};

export default ProjectTitle;
