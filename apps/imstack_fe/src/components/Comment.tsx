import React, { useEffect, useState } from "react";
import Dialog from "./Dialog";
import CommentCard, { CommentCardPropsType } from "./CommentCard";
import Input from "./Input";
import Button from "./Button";
import { MessageCircle, SendHorizontal } from "lucide-react";
import Tooltip from "./Tooltip";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Paths, QueryKeys, VoteType } from "@/enum";
import { customFetch, getUser } from "@/utilts";
import { useUser } from "@clerk/clerk-react";
import { RCommentsType, ResponseType } from "@/type";

type CommentPropsType = {
  commentCount: number;
  questionId?: string;
  answerId?: string;
};

const Comment = ({ questionId, answerId, commentCount }: CommentPropsType) => {
  const [userComment, setUserComment] = useState("");
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);

  const { user } = useUser();

  const { data: userData, isFetching: isLoadingUserData } = useQuery({
    queryKey: [QueryKeys.GET_USER, user?.id],
    queryFn: () => getUser(user ? user.id : ""),
    staleTime: 1000 * 5 * 60,
  });

  const {
    data: commentsData,
    isFetching: isLoading,
    refetch: refetchComments,
  } = useQuery({
    queryKey: [QueryKeys.GET_COMMENTS, questionId, answerId],
    queryFn: getComments,
    enabled: isCommentDialogOpen,
  });

  const { mutate: postCommentMutate, isPending: isLoadingPostComment } =
    useMutation({
      mutationFn: (payload: {
        type: VoteType;
        comment: string;
        answerId?: string;
        questionId?: string;
      }) =>
        postComment(
          payload.type,
          payload.comment,
          payload.answerId,
          payload.questionId
        ),
      onSuccess: () => {
        refetchComments();
        setUserComment("");
      },
      onError: () => {},
    });

  const handleUserCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserComment(e.target.value);
  };

  async function postComment(
    type: VoteType,
    comment: string,
    answerId?: string,
    questionId?: string
  ) {
    const body: { comment?: string; questionId?: string; answerId?: string } =
      {};
    if (type === VoteType.ANSWER) {
      body.answerId = answerId;
      body.comment = comment;
    }
    if (type === VoteType.QUESTION) {
      body.questionId = questionId;
      body.comment = comment;
    }
    const res = await customFetch(
      `${Paths.POST_COMMENT}/${userData?.data.userId}`,
      body,
      "POST"
    );
    return res;
  }

  async function getComments(): Promise<ResponseType<RCommentsType[]>> {
    const data = customFetch(
      `${Paths.GET_COMMENTS}?${questionId ? `questionId=${questionId}` : `answerId=${answerId}`}`
    );
    return data;
  }

  return (
    <Dialog
      isOpen={isCommentDialogOpen}
      setIsOpen={(val) => setIsCommentDialogOpen(val)}
      title="Comments"
      content={
        <div className="w-full max-h-[85vh] overflow-y-scroll hide-scrollbar flex flex-col items-center gap-2 ">
          {commentsData?.data.map(
            ({ User, commentId, comment, commentedOn }) => (
              <CommentCard
                key={commentId}
                commentId={commentId}
                comment={comment}
                commentedOn={commentedOn.split("T")[0]}
                userName={`${User.firstName} ${User.lastName}`}
              />
            )
          )}
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
              postCommentMutate({
                type: questionId ? VoteType.QUESTION : VoteType.ANSWER,
                comment: userComment,
                answerId,
                questionId,
              });
            }}
          >
            <SendHorizontal />
          </Button>
        </div>
      }
    >
      <div className="flex items-center gap-2 cursor-pointer">
        <Tooltip content="Comments">
          <MessageCircle
            className="w-8 h-8"
            onClick={() => setIsCommentDialogOpen(true)}
          />
        </Tooltip>
        <p>{commentCount}</p>
      </div>
    </Dialog>
  );
};

export default Comment;
