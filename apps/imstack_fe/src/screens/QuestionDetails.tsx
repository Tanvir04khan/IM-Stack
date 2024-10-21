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

const content = `
1914 translation by H. Rackham
"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."`;
const questionDetails: any = {
  title: "",
  content: "",
  votes: 50,
  comments: [
    {
      userName: "Tanvir Khan",
      imageSrc: "",
      comment:
        "project that has the compiler settings other project (release it; deploy it to your Maven repo, etc",
      commentedOn: "20/11/2024",
    },
    {
      userName: "Tanvir Khan",
      imageSrc: "",
      comment:
        "project that has the compiler settings other project (release it; deploy it to your Maven repo, etc",
      commentedOn: "20/11/2024",
    },
    {
      userName: "Tanvir Khan",
      imageSrc: "",
      comment:
        "project that has the compiler settings other project (release it; deploy it to your Maven repo, etc",
      commentedOn: "20/11/2024",
    },
    {
      userName: "Tanvir Khan",
      imageSrc: "",
      comment:
        "project that has the compiler settings other project (release it; deploy it to your Maven repo, etc",
      commentedOn: "20/11/2024",
    },
    {
      userName: "Tanvir Khan",
      imageSrc: "",
      comment:
        "project that has the compiler settings other project (release it; deploy it to your Maven repo, etc",
      commentedOn: "20/11/2024",
    },
  ],
  askedBy: {
    useId: "",
    userName: "",
    imageSrc: "",
  },
  askedOn: "20/11/2024",
  modifiedOn: "20/11/2024",
  views: 100,
  answers: [
    {
      asnswerId: "1",
      answer: content,
      votes: 4,
      comments: [
        {
          userName: "Tanvir Khan",
          imageSrc: "",
          comment:
            "project that has the compiler settings other project (release it; deploy it to your Maven repo, etc",
          commentedOn: "20/11/2024",
        },
        {
          userName: "Tanvir Khan",
          imageSrc: "",
          comment:
            "project that has the compiler settings other project (release it; deploy it to your Maven repo, etc",
          commentedOn: "20/11/2024",
        },
      ],
      answeredOn: "20/11/2024",
      acceptedAsBestAnswer: true,
    },
    {
      asnswerId: "2",
      answer: content,
      votes: 3,
      comments: [
        {
          userName: "Tanvir Khan",
          imageSrc: "",
          comment:
            "project that has the compiler settings other project (release it; deploy it to your Maven repo, etc",
          commentedOn: "20/11/2024",
        },
        {
          userName: "Tanvir Khan",
          imageSrc: "",
          comment:
            "project that has the compiler settings other project (release it; deploy it to your Maven repo, etc",
          commentedOn: "20/11/2024",
        },
      ],
      answeredOn: "20/11/2024",
      acceptedAsBestAnswer: false,
    },
    {
      asnswerId: "3",
      answer: content,
      votes: 0,
      comments: [
        {
          userName: "Tanvir Khan",
          imageSrc: "",
          comment:
            "project that has the compiler settings other project (release it; deploy it to your Maven repo, etc",
          commentedOn: "20/11/2024",
        },
        {
          userName: "Tanvir Khan",
          imageSrc: "",
          comment:
            "project that has the compiler settings other project (release it; deploy it to your Maven repo, etc",
          commentedOn: "20/11/2024",
        },
      ],
      answeredOn: "20/11/2024",
      acceptedAsBestAnswer: false,
    },
  ],
};

const QuestionDetails = () => {
  const [question, setQuestion] = useState(content);
  const [myAnswer, setMyanswer] = useState(content);
  const [answer, setAnswer] = useState("");
  const [isEditQuestionClicked, setIsEditQuestionClicked] = useState(false);
  const [isEditAnswerClicked, setIsEditAnswerClicked] = useState(false);

  const handleQuestion = (newValue: string) => {
    setQuestion(newValue);
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

  return (
    <Header>
      <div className="w-full flex flex-col items-center justify-center gap-8">
        {/* Question Card */}

        <Card
          title={
            <div className="flex items-center gap-2">
              <p className="text-xl">IM Stack setup and developers.</p>
              {!isEditQuestionClicked ? (
                <Tooltip content="Modify question">
                  <Edit
                    className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-black"
                    onClick={() => setIsEditQuestionClicked((ps) => !ps)}
                  />
                </Tooltip>
              ) : (
                <Tooltip content="Update question">
                  <Upload
                    className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-black"
                    onClick={handleUpdateQuestion}
                  />
                </Tooltip>
              )}
            </div>
          }
          action={
            <Vote
              voteCount="10"
              handlePositiveVote={() => {}}
              handleNegativeVote={() => {}}
            />
          }
          content={
            <div className="w-full flex flex-col items-center justify-center gap-4">
              {!isEditQuestionClicked ? (
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{ __html: content }}
                ></div>
              ) : (
                <TextEditor
                  handleContent={handleQuestion}
                  placeholder="type here..."
                  value={question}
                />
              )}
              <div className="w-full flex items-center justify-between ">
                <ProjectTitle
                  ProjectName="Tanvir Khan"
                  imageSrc={imstackImage}
                />
                <Comment
                  comments={questionDetails.comments}
                  onPostComment={() => {}}
                />
              </div>
            </div>
          }
          description={
            <QuestionActivities
              askedOn={questionDetails.askedOn}
              ModifiedOn={questionDetails.modifiedOn}
              views={questionDetails.views}
            />
          }
        />
        <h1 className="w-full max-w-5xl text-left text-lg text-muted-foreground font-semibold">
          {questionDetails.answers.length} Answers
        </h1>

        {/* Answers Card */}

        {questionDetails.answers.map((answer: any, i: number) => (
          <Card
            key={answer.answerId}
            title={
              <p className="text-lg text-muted-foreground">Answer {i + 1}</p>
            }
            action={
              !isEditAnswerClicked ? (
                <Tooltip content="Modify answer">
                  <Edit
                    className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-black"
                    onClick={() => setIsEditAnswerClicked((ps) => !ps)}
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
            }
            content={
              <div className="w-full flex flex-col items-center justify-center gap-4">
                <div className="flex items-center justify-between gap-4">
                  {!isEditAnswerClicked ? (
                    <div
                      className="w-full"
                      dangerouslySetInnerHTML={{ __html: answer.answer }}
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
                      voteCount={answer.votes}
                      handlePositiveVote={() => {}}
                      handleNegativeVote={() => {}}
                    />
                    {answer.acceptedAsBestAnswer && (
                      <Tooltip content="The question owner accepted this as the best answer">
                        <Check className="w-8 h-8 cursor-pointer text-[#2563eb]" />
                      </Tooltip>
                    )}
                  </div>
                </div>
                <div className="w-full flex items-center justify-between ">
                  <ProjectTitle
                    ProjectName="Tanvir Khan"
                    imageSrc={imstackImage}
                  />
                  <Comment
                    comments={questionDetails.comments}
                    onPostComment={() => {}}
                  />
                </div>
              </div>
            }
          />
        ))}

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
    </Header>
  );
};

export default QuestionDetails;
