import React, { useEffect, useState } from "react";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { ResponseType, RQuestionDetails, RUserType } from "@/type";
import { Paths, QueryKeys, VoteType } from "@/enum";
import { customFetch, getUser } from "@/utilts";
import { useParams } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";
import Tag from "@/components/Tag";
import Alert from "@/components/Alert";
import { comment } from "postcss";

const QuestionDetails = () => {
  const [myQuestion, setMyQuestion] = useState("");
  const [myAnswer, setMyanswer] = useState("");
  const [answer, setAnswer] = useState("");
  const [isEditQuestionClicked, setIsEditQuestionClicked] = useState(false);
  const [isEditAnswerClicked, setIsEditAnswerClicked] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"Success" | "Error" | "Warning">(
    "Success"
  );
  const { questionId } = useParams({ strict: false });
  const { user } = useUser();

  const { data: userData, isFetching: isLoadingUserData } = useQuery({
    queryKey: [QueryKeys.GET_USER, user?.id],
    queryFn: () => getUser(user ? user.id : ""),
    staleTime: 1000 * 5 * 60,
  });

  const {
    data: questionDetails,
    isFetching: isQuestionDetailsLoading,
    refetch: refetchQuestionDetails,
  } = useQuery<ResponseType<RQuestionDetails>>({
    queryKey: [QueryKeys.GET_QUESTION_DETAILS],
    queryFn: getQuestionDetails,
  });

  const { mutate: updateQuestionMutate, isPending: isLoadingUpdateQuestion } =
    useMutation({
      mutationFn: updateQuestion,
      onSuccess: () => {
        setAlertType("Success");
        setAlertMessage("Question updated succesfully!");
        refetchQuestionDetails();
      },
      onError: () => {
        setAlertType("Error");
        setAlertMessage("Error while updating question!");
      },
    });

  const { mutate: updateViewsMutate } = useMutation({
    mutationFn: updateViews,
  });

  const { mutate: postAnswerMutate, isPending: isLoadingPostAnswer } =
    useMutation({
      mutationFn: postAnswer,
      onSuccess: () => {
        setAlertType("Success");
        setAlertMessage("Answer posted succesfully!");
        refetchQuestionDetails();
        setAnswer("");
      },
      onError: () => {
        setAlertType("Error");
        setAlertMessage("Error while posting answer!");
      },
    });

  const { mutate: addVoteMutate } = useMutation({
    mutationFn: (payload: {
      type: VoteType;
      vote: boolean;
      answerId?: string;
    }) => addVote(payload.type, payload.vote, payload.answerId),
    mutationKey: [QueryKeys.ADD_VOTE],
    onSuccess: () => {
      setAlertType("Success");
      setAlertMessage("Vote added succesfully!");
      refetchQuestionDetails();
    },
    onError: () => {
      setAlertType("Error");
      setAlertMessage("Error while adding vote!");
    },
  });

  const { mutate: updateAnswerMutate, isPending: isLoadongUpdateAnswer } =
    useMutation({
      mutationFn: (payload: { answerId: string }) =>
        updateAnswer(payload.answerId),
      onSuccess: () => {
        setAlertType("Success");
        setAlertMessage("Answer updated succesfully!");
        refetchQuestionDetails();
      },
      onError: () => {
        setAlertType("Error");
        setAlertMessage("Error while updating answer!");
      },
    });

  const {
    mutate: acceptAsBestAnswerMutate,
    isPending: isLoadingAcceptAsBestAnswer,
  } = useMutation({
    mutationFn: (payload: { answerId: string; acceptAsBestAnswer: boolean }) =>
      acceptAsBestAnswer(payload.answerId, payload.acceptAsBestAnswer),
    onSuccess: () => {
      setAlertType("Success");
      setAlertMessage("Answer updated succesfully!");
      refetchQuestionDetails();
    },
    onError: () => {
      setAlertType("Error");
      setAlertMessage("Error while updating answer!");
    },
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

  const handlePostAnswer = () => {
    setAlertType("Warning");
    if (!answer) {
      setAlertMessage("Answer can't be empty!");
    }
    postAnswerMutate();
  };

  const handleUpdateQuestion = () => {
    setAlertType("Warning");
    if (!myQuestion) {
      setAlertMessage("Question can't be empty!");
    }
    updateQuestionMutate();
    setIsEditQuestionClicked((ps) => !ps);
  };

  const handleUpdateAnswer = (answerId: string) => {
    setAlertType("Warning");
    if (!myAnswer) {
      setAlertMessage("Answer an't be empty!");
    }
    updateAnswerMutate({ answerId });
    setIsEditAnswerClicked((ps) => !ps);
  };

  async function getQuestionDetails(): Promise<ResponseType<RQuestionDetails>> {
    const data = await customFetch(
      `${Paths.GET_QUESTION_DETAILS}/${questionId}`
    );
    return data;
  }

  async function updateQuestion() {
    const res = await customFetch(
      `${Paths.UPDATE_QUESTION}/${userData?.data.userId}`,
      { questionId, question: myQuestion },
      "PUT"
    );
    return res;
  }

  async function updateAnswer(answerId: string) {
    const res = await customFetch(
      `${Paths.UPDATE_ANSWER}/${userData?.data.userId}`,
      { answerId, answer: myAnswer },
      "PUT"
    );

    return res;
  }

  async function acceptAsBestAnswer(
    answerId: string,
    acceptAsBestAnswer: boolean
  ) {
    const res = await customFetch(
      `${Paths.ACCEP_AS_BEST_ANSWER}/${userData?.data.userId}`,
      {
        answerId,
        acceptAsBestAnswer,
      },
      "PUT"
    );
    return res;
  }

  async function updateViews() {
    const res = await customFetch(
      `${Paths.UPDATE_VIEWS}/${userData?.data.userId}`,
      {
        questionId,
        views: 1,
      },
      "PUT"
    );

    return res;
  }

  async function addVote(type: VoteType, vote: boolean, answerId?: string) {
    const body: { vote?: boolean; questionId?: string; answerId?: string } = {};
    if (type === VoteType.ANSWER) {
      body.answerId = answerId;
      body.vote = vote;
    }
    if (type === VoteType.QUESTION) {
      body.questionId = questionId;
      body.vote = vote;
    }
    const res = await customFetch(
      `${Paths.ADD_VOTE}/${userData?.data.userId}`,
      body,
      "POST"
    );
    return res;
  }

  async function postAnswer() {
    const res = await customFetch(
      `${Paths.POST_ANSWER}/${userData?.data.userId}`,
      {
        questionId,
        answer,
      },
      "POST"
    );
    return res;
  }

  async function postComment(
    type: VoteType,
    comment: string,
    answerId?: string
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

  useEffect(() => {
    const timer = setTimeout(() => updateViewsMutate(), 10000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Header
      isLoading={
        isQuestionDetailsLoading ||
        isLoadingUserData ||
        isLoadingUpdateQuestion ||
        isLoadingPostAnswer ||
        isLoadongUpdateAnswer ||
        isLoadingAcceptAsBestAnswer
      }
    >
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
                handlePositiveVote={() => {
                  addVoteMutate({ type: VoteType.QUESTION, vote: true });
                }}
                handleNegativeVote={() => {
                  addVoteMutate({ type: VoteType.QUESTION, vote: false });
                }}
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
                <div className="w-full flex flex-row gap-1 flex-wrap">
                  {questionDetails?.data.Tags.techTags.map(
                    ({ technologyId, technology }) => (
                      <Tag key={technologyId} content={technology} />
                    )
                  )}
                  {questionDetails?.data.Tags.projectTags.map(
                    ({ projectId, projectName }) => (
                      <Tag key={projectId} content={projectName} />
                    )
                  )}
                </div>
                <div className="w-full flex items-center justify-between ">
                  <Comment
                    commentCount={
                      questionDetails
                        ? questionDetails?.data.Comments.length
                        : 0
                    }
                    questionId={questionId}
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
                            onClick={() => handleUpdateAnswer(answerId)}
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
                          onClick={() => {
                            acceptAsBestAnswerMutate({
                              answerId,
                              acceptAsBestAnswer: !acceptedAsBest,
                            });
                          }}
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
                          className="w-full "
                          dangerouslySetInnerHTML={{ __html: answer }}
                        ></div>
                      ) : (
                        <TextEditor
                          handleContent={handleMyAnswer}
                          placeholder="type here..."
                          value={myAnswer}
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
                          handlePositiveVote={() => {
                            addVoteMutate({
                              type: VoteType.ANSWER,
                              vote: true,
                              answerId,
                            });
                          }}
                          handleNegativeVote={() => {
                            addVoteMutate({
                              type: VoteType.ANSWER,
                              vote: false,
                              answerId,
                            });
                          }}
                        />
                        {acceptedAsBest && (
                          <Tooltip content="The question owner accepted this as the best answer">
                            <Check className="w-8 h-8 cursor-pointer text-[#18864b]" />
                          </Tooltip>
                        )}
                      </div>
                    </div>

                    <Comment
                      commentCount={Comments.length}
                      answerId={answerId}
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
          {alertMessage && (
            <Alert
              title={alertType}
              type={alertType}
              description={alertMessage}
              variant="default"
              setAlertMessage={setAlertMessage}
            />
          )}
        </div>
      ) : (
        <Skeleton className="max-w-5xl w-full h-[50vh]" />
      )}
    </Header>
  );
};

export default QuestionDetails;
