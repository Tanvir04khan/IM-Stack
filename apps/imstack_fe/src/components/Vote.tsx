import React, { ReactNode } from "react";
import Tooltip from "./Tooltip";
import { ChevronDown, ChevronUp } from "lucide-react";

type VotePropsType = {
  voteCount: ReactNode;
  handlePositiveVote: () => void;
  handleNegativeVote: () => void;
};

const Vote = ({
  voteCount,
  handlePositiveVote,
  handleNegativeVote,
}: VotePropsType) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Tooltip content="This question shows research effort; it is useful and clear">
        <ChevronUp
          className="w-8 h-8 text-muted-foreground hover:cursor-pointer hover:text-black"
          onClick={handlePositiveVote}
        />
      </Tooltip>
      <div className="text-sm">{voteCount}</div>
      <Tooltip content="This question does not show any research effort; it is unclear or not useful">
        <ChevronDown
          className="w-8 h-8 text-muted-foreground hover:cursor-pointer hover:text-black"
          onClick={handleNegativeVote}
        />
      </Tooltip>
    </div>
  );
};

export default Vote;
