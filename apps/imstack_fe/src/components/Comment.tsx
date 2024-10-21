import React, { useState } from "react";
import Dialog from "./Dialog";
import CommentCard, { CommentCardPropsType } from "./CommentCard";
import Input from "./Input";
import Button from "./Button";
import { MessageCircle, SendHorizontal } from "lucide-react";
import Tooltip from "./Tooltip";

type CommentPropsType = {
  comments: CommentCardPropsType[];
  onPostComment: (commentValue: string) => void;
};

const Comment = ({ comments, onPostComment }: CommentPropsType) => {
  const [userComment, setUserComment] = useState("");

  const handleUserCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserComment(e.target.value);
  };

  return (
    <Dialog
      title="Comments"
      content={
        <div className="w-full max-h-[85vh] overflow-y-scroll hide-scrollbar flex flex-col items-center gap-2 ">
          {comments.map((comment, i) => (
            <CommentCard key={i} {...comment} />
          ))}
        </div>
      }
      action={
        <div className="w-full max-h-[15vh] flex items-end flex-row gap-2 ">
          <Input
            className="grow"
            placeholder="Add a comment..."
            type="text"
            onChange={handleUserCommentChange}
          />
          <Button
            onClick={() => {
              onPostComment(userComment);
            }}
          >
            <SendHorizontal />
          </Button>
        </div>
      }
    >
      <div className="flex items-center gap-2 cursor-pointer">
        <Tooltip content="Comments">
          <MessageCircle className="w-8 h-8" />
        </Tooltip>
        <p>{comments.length}</p>
      </div>
    </Dialog>
  );
};

export default Comment;
