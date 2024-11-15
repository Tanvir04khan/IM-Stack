import React, { useState } from "react";
import Activity from "@/components/Activity";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Comment from "@/components/Comment";
import CommentCard from "@/components/CommentCard";
import Dialog from "@/components/Dialog";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProjectCard from "@/components/ProjectCard";
import QuestionActivities from "@/components/QuestionActivities";
import TextEditor from "@/components/TextEditor";
import Tooltip from "@/components/Tooltip";
import Vote from "@/components/Vote";
import { AvatarIcon } from "@radix-ui/react-icons";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Edit,
  Eye,
  MessageCircle,
  SendHorizontal,
  Upload,
} from "lucide-react";
import imstackImage from "../images/authpageimage.png";
import ProjectTitle from "@/components/ProjectTitle";
import ProfileCard from "@/components/ProfileCard";
import { useQuery } from "@tanstack/react-query";
import { ResponseType, RQuestionDetails, RUserType } from "@/type";
import { Paths, QueryKeys } from "@/enum";
import { customFetch } from "@/utilts";
import { useParams } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";

const QuestionDetails = () => {
  const [myQuestion, setMyQuestion] = useState("");
  const [myAnswer, setMyanswer] = useState("");
  const [answer, setAnswer] = useState("");
  const [isEditQuestionClicked, setIsEditQuestionClicked] = useState(false);
  const [isEditAnswerClicked, setIsEditAnswerClicked] = useState(false);
  const { questionId } = useParams({ strict: false });
  const { user } = useUser();

  const { data: questionDetails, isFetching: isQuestionDetailsLoading } =
    useQuery<ResponseType<RQuestionDetails>>({
      queryKey: [QueryKeys.GET_QUESTION_DETAILS],
      queryFn: getQuestionDetails,
    });

  const handleQuestion = (newValue: string) => {
    setMyQuestion(newValue);
  };

  const handleMyAnswer = (newValue: string) => {
    setMyanswer(newValue);
  };

  const handleAnswer = (newValue: string) => {
    setAnswer(newValue);
  };

  const handlePostAnswer = () => {};

  const handleUpdateQuestion = () => {
    setIsEditQuestionClicked((ps) => !ps);
  };

  const handleUpdateAnswer = () => {
    setIsEditAnswerClicked((ps) => !ps);
  };

  async function getQuestionDetails(): Promise<ResponseType<RQuestionDetails>> {
    const data = await customFetch(
      `${Paths.GET_QUESTION_DETAILS}/${questionId}`
    );
    return data;
  }

  return (
    <Header isLoading={isQuestionDetailsLoading}>
      {!isQuestionDetailsLoading ? (
        <div className="w-full flex flex-col items-center justify-center gap-8">
          {/* Question Card */}

          <Card
            title={
              <div className="flex items-center gap-2">
                <p className="text-xl">{questionDetails?.data.title}</p>
                {questionDetails &&
                user &&
                questionDetails?.data.Users.clerkUserID === user.id ? (
                  !isEditQuestionClicked ? (
                    <Tooltip content="Modify question">
                      <Edit
                        className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-black"
                        onClick={() => {
                          setMyQuestion(
                            questionDetails ? questionDetails.data.question : ""
                          );
                          setIsEditQuestionClicked((ps) => !ps);
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip content="Update question">
                      <Upload
                        className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-black"
                        onClick={handleUpdateQuestion}
                      />
                    </Tooltip>
                  )
                ) : (
                  <></>
                )}
              </div>
            }
            action={
              <Vote
                voteCount={questionDetails?.data.Votes.map(
                  ({ vote }) => vote
                ).reduce((prev, curr) => prev + curr, 0)}
                positiveVoteContent="This question shows research effort; it is useful and clear"
                negtiveVoteContent="This question does not show any research effort; it is unclear or not useful"
                handlePositiveVote={() => {}}
                handleNegativeVote={() => {}}
              />
            }
            content={
              <div className="w-full flex flex-col items-start justify-center gap-4">
                <ProfileCard
                  ProjectName={`${questionDetails?.data.Users.firstName} ${questionDetails?.data.Users.lastName}`}
                  imageSrc={
                    questionDetails && questionDetails.data.Users.imageType
                      ? questionDetails.data.Users.imageType +
                        "," +
                        questionDetails.data.Users.image
                      : ""
                  }
                />
                {!isEditQuestionClicked ? (
                  <div
                    className="w-full"
                    dangerouslySetInnerHTML={{
                      __html: questionDetails
                        ? questionDetails.data.question
                        : "",
                    }}
                  ></div>
                ) : (
                  <TextEditor
                    handleContent={handleQuestion}
                    placeholder="type here..."
                    value={myQuestion}
                  />
                )}
                <div className="w-full flex items-center justify-between ">
                  <Comment
                    comments={
                      questionDetails
                        ? questionDetails?.data.Comments.map(
                            ({ comment, User, commentedOn, commentId }) => ({
                              comment,
                              commentedOn: commentedOn.split("T")[0],
                              userName: `${User.firstName} ${User.lastName}`,
                              imageSrc: User.image
                                ? User.imageType + "," + User.image
                                : "",
                              commentId,
                            })
                          )
                        : []
                    }
                    onPostComment={() => {}}
                  />
                </div>
              </div>
            }
            description={
              <QuestionActivities
                askedOn={
                  questionDetails
                    ? questionDetails?.data.askedOn.split("T")[0]
                    : ""
                }
                ModifiedOn={
                  questionDetails
                    ? questionDetails?.data.modifiedOn.split("T")[0]
                    : ""
                }
                views={questionDetails ? questionDetails?.data.views : 0}
              />
            }
          />
          <h1 className="w-full max-w-5xl text-left text-lg text-muted-foreground font-semibold">
            {questionDetails?.data.Answers.length} Answers
          </h1>

          {/* Answers Card */}

          {questionDetails?.data.Answers.map(
            (
              { answerId, Users, answer, Votes, acceptedAsBest, Comments },
              i
            ) => (
              <Card
                key={answerId}
                title={
                  <p className="text-lg text-muted-foreground">
                    Answer {i + 1}
                  </p>
                }
                action={
                  <div className="flex items-center gap-2">
                    {Users.clerkUserID === user?.id ? (
                      !isEditAnswerClicked ? (
                        <Tooltip content="Modify answer">
                          <Edit
                            className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-black"
                            onClick={() => {
                              setMyanswer(answer);
                              setIsEditAnswerClicked((ps) => !ps);
                            }}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip content="Update question">
                          <Upload
                            className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-black"
                            onClick={handleUpdateAnswer}
                          />
                        </Tooltip>
                      )
                    ) : (
                      <></>
                    )}
                    {questionDetails.data.Users.clerkUserID === user?.id ? (
                      <Tooltip content="Accept as best answer">
                        <Check
                          className={cn(
                            "h-5 w-5 font-extrabold cursor-pointer hover:text-black",
                            {
                              "text-[#18864b]": acceptedAsBest,
                              "text-muted-foreground": !acceptedAsBest,
                            }
                          )}
                          onClick={() => {}}
                        />
                      </Tooltip>
                    ) : (
                      <></>
                    )}
                  </div>
                }
                content={
                  <div className="w-full flex flex-col items-start justify-center gap-4">
                    <ProfileCard
                      ProjectName={`${Users.firstName} ${Users.lastName}`}
                      imageSrc={
                        Users.image ? Users.imageType + "," + Users.image : ""
                      }
                    />

                    <div className="w-full flex items-center justify-between  gap-4">
                      {!isEditAnswerClicked ? (
                        <div
                          className="w-full basis-1"
                          dangerouslySetInnerHTML={{ __html: answer }}
                        ></div>
                      ) : (
                        <TextEditor
                          handleContent={handleMyAnswer}
                          placeholder="type here..."
                          value={myAnswer}
                          className="basis-1"
                        />
                      )}
                      <div className="flex flex-col justify-center items-center gap-4">
                        <Vote
                          voteCount={Votes.map(({ vote }) => vote).reduce(
                            (prev, curr) => prev + curr,
                            0
                          )}
                          positiveVoteContent="This answer shows research effort; it is useful and clear"
                          negtiveVoteContent="This answer does not show any research effort; it is unclear or not useful"
                          handlePositiveVote={() => {}}
                          handleNegativeVote={() => {}}
                        />
                        {acceptedAsBest && (
                          <Tooltip content="The question owner accepted this as the best answer">
                            <Check className="w-8 h-8 cursor-pointer text-[#18864b]" />
                          </Tooltip>
                        )}
                      </div>
                    </div>

                    <Comment
                      comments={Comments.map(
                        ({ comment, commentId, commentedOn, User }) => ({
                          comment,
                          commentId,
                          commentedOn: commentedOn.split("T")[0],
                          userName: `${User.firstName} ${User.lastName}`,
                          imageSrc: User.image
                            ? User.imageType + "," + User.image
                            : "",
                        })
                      )}
                      onPostComment={() => {}}
                    />
                  </div>
                }
              />
            )
          )}

          {/* Type Your Answer */}

          <Card
            title="Your Answer"
            content={
              <div className="w-full flex flex-col gap-4">
                <TextEditor
                  placeholder="Type here..."
                  value={answer}
                  handleContent={handleAnswer}
                />
                <Button
                  className="w-48"
                  content="Post Your Answer"
                  onClick={handlePostAnswer}
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            }
          />
        </div>
      ) : (
        <Skeleton className="max-w-5xl w-full h-[50vh]" />
      )}
    </Header>
  );
};

export default QuestionDetails;
