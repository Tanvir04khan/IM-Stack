import { AvatarIcon } from "@radix-ui/react-icons";
import React from "react";

type ProfileCardPropsType = {
  imageSrc: string;
  ProjectName: string;
  className?: string;
  imageClassName?: string;
};

const ProfileCard = ({
  ProjectName,
  imageSrc,
  className,
  imageClassName = "h-12 w-12 rounded-full",
}: ProfileCardPropsType) => {
  return (
    <div className={"flex items-center gap-2 w-max-content " + className}>
      {imageSrc ? (
        <img className={imageClassName} src={imageSrc} alt="Icon" />
      ) : (
        <AvatarIcon className={imageClassName} />
      )}
      <h1 className="font-medium">{ProjectName}</h1>
    </div>
  );
};

export default ProfileCard;
