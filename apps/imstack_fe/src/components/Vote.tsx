import React, { ReactNode } from "react";
import Tooltip from "./Tooltip";
import { ChevronDown, ChevronUp } from "lucide-react";

type VotePropsType = {
  voteCount: ReactNode;
  positiveVoteContent: string;
  negtiveVoteContent: string;
  handlePositiveVote: () => void;
  handleNegativeVote: () => void;
};

const Vote = ({
  voteCount,
  handlePositiveVote,
  handleNegativeVote,
  positiveVoteContent,
  negtiveVoteContent,
}: VotePropsType) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Tooltip content={positiveVoteContent}>
        <ChevronUp
          className="w-8 h-8 text-muted-foreground hover:cursor-pointer hover:text-black"
          onClick={handlePositiveVote}
        />
      </Tooltip>
      <div className="text-sm">{voteCount}</div>
      <Tooltip content={negtiveVoteContent}>
        <ChevronDown
          className="w-8 h-8 text-muted-foreground hover:cursor-pointer hover:text-black"
          onClick={handleNegativeVote}
        />
      </Tooltip>
    </div>
  );
};

export default Vote;
