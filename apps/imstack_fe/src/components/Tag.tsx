import React from "react";

const Tag = ({ content }: { content: string | number }) => {
  return (
    <h2 className="max-w-max px-2 rounded-full bg-[#5686f0] text-white">
      {content}
    </h2>
  );
};

export default Tag;

// bg-[#5686f0]
