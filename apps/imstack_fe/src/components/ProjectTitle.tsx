import { PanelsTopLeft } from "lucide-react";
import React from "react";

type ProjectTitleType = {
  imageSrc: string;
  ProjectName: string;
  className?: string;
  imageClassName?: string;
};

const ProjectTitle = ({
  imageSrc,
  ProjectName,
  className,
  imageClassName = "h-12 w-12 rounded-md",
}: ProjectTitleType) => {
  return (
    <div className={"flex items-center gap-2 w-max-content " + className}>
      {imageSrc ? (
        <img className={imageClassName} src={imageSrc} alt="Icon" />
      ) : (
        <PanelsTopLeft className={imageClassName} />
      )}
      <h1>{ProjectName}</h1>
    </div>
  );
};

export default ProjectTitle;
