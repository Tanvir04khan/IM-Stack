import React from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import QuestionActivity from "@/components/QuestionActivity";
import { Input } from "@/components/ui/input";
import { getQuestions, getUser, questionActivities } from "@/utilts";
import { useNavigate } from "@tanstack/react-router";
import { FilePlus } from "lucide-react";
import Tag from "@/components/Tag";
import { ActivityPropsType } from "@/components/Activity";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/enum";
import { useUser } from "@clerk/clerk-react";
import { ResponseType, RQuestionsType } from "@/type";
import ProfileCard from "@/components/ProfileCard";
import Alert from "@/components/Alert";

// const questions: {
//   id: string;
//   title: string;
//   question: string;
//   activity: ActivityPropsType[];
//   relatedTo: string[];
// }[] = [
//   {
//     id: "test",
//     title:
//       "IM Stack setup and developers onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
//     question:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//     activity: questionActivities,
//     relatedTo: ["IM stack", "React JS", "TS"],
//   },
//   {
//     id: "test",
//     title:
//       "IM Stack setup and developers onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
//     question:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//     activity: questionActivities,
//     relatedTo: ["IM stack", "React JS", "TS"],
//   },
//   {
//     id: "test",
//     title:
//       "IM Stack setup and developers onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
//     question:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//     activity: questionActivities,
//     relatedTo: ["IM stack", "React JS", "TS"],
//   },
//   {
//     id: "test",
//     title:
//       "IM Stack setup and developers onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
//     question:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//     activity: questionActivities,
//     relatedTo: ["IM stack", "React JS", "TS"],
//   },
//   {
//     id: "test",
//     title:
//       "IM Stack setup and developers onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
//     question:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//     activity: questionActivities,
//     relatedTo: ["IM stack", "React JS", "TS"],
//   },
//   {
//     id: "test",
//     title:
//       "IM Stack setup and developers onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
//     question:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//     activity: questionActivities,
//     relatedTo: ["IM stack", "React JS", "TS"],
//   },
//   {
//     id: "test",
//     title:
//       "IM Stack setup and developers onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
//     question:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//     activity: questionActivities,
//     relatedTo: ["IM stack", "React JS", "TS"],
//   },
// ];

const Questions = () => {
  const navigation = useNavigate();
  const { user } = useUser();
  const { data: userData } = useQuery({
    queryKey: [QueryKeys.GET_USER],
    queryFn: () => getUser(user ? user.id : ""),
    staleTime: 1000 * 5 * 60,
  });
  const { data: questionsData, isFetching: isLoadingQuestions } = useQuery<
    ResponseType<RQuestionsType>
  >({
    queryKey: [QueryKeys.GET_QUESTIONS],
    queryFn: () => getQuestions(userData ? userData.data.userId : ""),
  });

  const questions: {
    id: string;
    title: string;
    activity: ActivityPropsType[];
    relatedTo: { tagId: string; tag: string }[];
    hasAcceptedAsBestAnswer: boolean;
    answerCount: number;
    user: { userName: string; image: string };
    askedOn: string;
  }[] = questionsData
    ? questionsData.data.map(
        ({
          title,
          questionId,
          views,
          Answers,
          Votes,
          Tags,
          Users,
          askedOn,
        }) => ({
          id: questionId,
          title,
          activity: questionActivities.map(({ Icon, name, value }) => ({
            Icon,
            name,
            value:
              name === "Answers"
                ? Answers.count
                : name === "Views"
                  ? views
                  : Votes,
          })),
          relatedTo: Tags.projectTags
            .map(({ projectId, projectName }) => ({
              tagId: projectId,
              tag: projectName,
            }))
            .concat(
              Tags.techTags.map(({ technologyId, technology }) => ({
                tagId: technologyId,
                tag: technology,
              }))
            ),
          hasAcceptedAsBestAnswer: Answers.hasAcceptedBestAnswer,
          answerCount: Answers.count,
          user: {
            userName: `${Users.firstName} ${Users.lastName}`,
            image: Users.image ? Users.imageType + "," + Users.image : "",
          },
          askedOn,
        })
      )
    : [];

  return (
    <Header isLoading={isLoadingQuestions}>
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
        <h1 className="text-xs text-muted-foreground">
          {questions.length} Questions
        </h1>
        <div className="w-full flex flex-col gap-4">
          {questions.length ? (
            questions.map(
              ({
                title,
                activity,
                relatedTo,
                id,
                hasAcceptedAsBestAnswer,
                answerCount,
                user,
                askedOn,
              }) => (
                <Card
                  key={title}
                  className="hover:shadow-lg duration-100 cursor-pointer"
                  title={
                    <div className="flex items-center gap-4">
                      <QuestionActivity
                        questionActivities={activity.filter(
                          ({ name }) => name !== "Answers"
                        )}
                        className="flex flex-row gap-4 text-muted-foreground"
                      />
                      <Tag
                        content={`${answerCount} Answers`}
                        className={
                          hasAcceptedAsBestAnswer
                            ? "bg-[#18864b] text-[#fff] border-[1px] border-[#18864b]"
                            : "bg-[#fff] text-[#18864b] border-[1px] border-[#18864b]"
                        }
                        // className="bg-[#18864b] text-[#fff] border-[1px] border-[#18864b]"
                      />
                    </div>
                  }
                  content={
                    <div className="w-full flex flex-col gap-4">
                      <div className="font-semibold text-lg">{title}</div>
                      <div className="w-full flex flex-row gap-1 flex-wrap">
                        {relatedTo.map(({ tagId, tag }) => (
                          <Tag key={tagId} content={tag} />
                        ))}
                      </div>

                      <div>
                        <ProfileCard
                          ProjectName={user.userName}
                          imageSrc={user.image}
                        />
                      </div>
                    </div>
                  }
                  onClick={() =>
                    navigation({ from: "/questions", to: `/questions/${id}` })
                  }
                  action={
                    <div className="w-max-content text-muted-foreground">
                      {askedOn.split("T")[0]}
                    </div>
                  }
                />
              )
            )
          ) : (
            <div className="w-full max-w-5xl text-muted-foreground">
              No data found.
            </div>
          )}
        </div>
      </div>
    </Header>
  );
};

export default Questions;
