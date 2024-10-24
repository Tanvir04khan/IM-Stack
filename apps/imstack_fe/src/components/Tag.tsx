import React from "react";
import { Badge } from "./ui/badge";

type TagPropsType = {
  content: string | number;
  className?: string;
};

const Tag = ({
  content,
  className = "bg-[#5686f0] text-white",
}: TagPropsType) => {
  return (
    <Badge className={"max-w-max px-2 rounded-full " + className}>
      {content}
    </Badge>
  );
};

export default Tag;

// bg-[#5686f0]
