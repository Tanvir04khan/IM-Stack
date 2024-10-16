import React from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import QuestionActivity from "@/components/QuestionActivity";
import { Input } from "@/components/ui/input";
import { questionActivities } from "@/utilts";
import { useNavigate } from "@tanstack/react-router";
import { FilePlus } from "lucide-react";
import Tag from "@/components/Tag";
import { ActivityPropsType } from "@/components/Activity";

const questions: {
  id: string;
  title: string;
  question: string;
  activity: ActivityPropsType[];
  relatedTo: string[];
}[] = [
  {
    id: "test",
    title:
      "IM Stack setup and developers onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    activity: questionActivities,
    relatedTo: ["IM stack", "React JS", "TS"],
  },
  {
    id: "test",
    title:
      "IM Stack setup and developers onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    activity: questionActivities,
    relatedTo: ["IM stack", "React JS", "TS"],
  },
  {
    id: "test",
    title:
      "IM Stack setup and developers onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    activity: questionActivities,
    relatedTo: ["IM stack", "React JS", "TS"],
  },
  {
    id: "test",
    title:
      "IM Stack setup and developers onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    activity: questionActivities,
    relatedTo: ["IM stack", "React JS", "TS"],
  },
  {
    id: "test",
    title:
      "IM Stack setup and developers onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    activity: questionActivities,
    relatedTo: ["IM stack", "React JS", "TS"],
  },
  {
    id: "test",
    title:
      "IM Stack setup and developers onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    activity: questionActivities,
    relatedTo: ["IM stack", "React JS", "TS"],
  },
  {
    id: "test",
    title:
      "IM Stack setup and developers onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    activity: questionActivities,
    relatedTo: ["IM stack", "React JS", "TS"],
  },
];

const Questions = () => {
  const navigation = useNavigate();

  return (
    <Header>
      <div className="w-full max-w-5xl grid gap-4">
        <div className="w-full flex flex-row items-center justify-between">
          <Input
            placeholder="Filter projects by name..."
            onChange={(event) => {}}
            className="max-w-sm"
          />
          <Button
            content="Ask Questions"
            onClick={() =>
              navigation({
                from: "/questions",
                to: `/askquestions`,
              })
            }
          >
            <FilePlus className="w-4 h-4" />
          </Button>
        </div>
        <h1 className="text-xs text-muted-foreground">800 Questions</h1>
        <div className="w-full flex flex-col gap-4">
          {questions.map(({ title, question, activity, relatedTo, id }) => (
            <Card
              key={title}
              className="hover:shadow-lg duration-100 cursor-pointer"
              title={title.length > 200 ? `${title.slice(0, 200)}...` : title}
              content={
                question.length > 200
                  ? `${question.slice(0, 140)}...`
                  : question
              }
              action={<QuestionActivity questionActivities={activity} />}
              description={
                <div className="w-full flex flex-row gap-1">
                  {relatedTo.map((i) => (
                    <Tag key={i} content={i} />
                  ))}
                </div>
              }
              titleReverse
              onClick={() =>
                navigation({ from: "/questions", to: `/questions/${id}` })
              }
            />
          ))}
        </div>
      </div>
    </Header>
  );
};

export default Questions;
