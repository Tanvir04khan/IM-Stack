import React, { useEffect, useState } from "react";

import { useUser } from "@clerk/clerk-react";
import Header from "@/components/Header";

import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Paths,
  ProductsColumn,
  QueryKeys,
  QuestionsColumn,
  TotalActivities,
} from "@/enum";
import {
  customFetch,
  getQuestions,
  getUser,
  questionActivities,
  totalActivities,
} from "@/utilts";
import ActivityCard from "@/components/ActivityCard";
import {
  TableColumnsType,
  ProjectsRowstype,
  TotalActivitiesType,
  QuestionsRowsType,
  ResponseType,
  RUserType,
  RActivitiesType,
  RProjectDocsType,
  RQuestionsType,
} from "@/type";
import imstackLogo from "../images/IMSTACKLOGO.png";
import Table from "@/components/Table";
import Card from "@/components/Card";
import QuestionActivity from "@/components/QuestionActivity";
import Question from "@/components/Question";
import ProjectTitle from "@/components/ProjectTitle";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

type ActivitiesType = {
  [TotalActivities.TOTALPROJECTS]: number | undefined;
  [TotalActivities.TOTALQUESTIONS]: number | undefined;
  [TotalActivities.TOTALANSWERS]: number | undefined;
  [TotalActivities.TOTALVOTES]: number | undefined;
};

const projectColumns: TableColumnsType[] = [
  { field: ProductsColumn.NAME, title: "Name", textAlignment: "left" },
  {
    field: ProductsColumn.CREATEDBY,
    title: "Created By",
    textAlignment: "left",
  },
  {
    field: ProductsColumn.CREATEDON,
    title: "Created On",
    textAlignment: "left",
  },
  {
    field: ProductsColumn.UPDATEDBY,
    title: "Updated By",
    textAlignment: "left",
  },
  {
    field: ProductsColumn.UPDATEDON,
    title: "Updated On",
    textAlignment: "left",
  },
];

export const questionColumns: TableColumnsType[] = [
  { field: QuestionsColumn.TITLE, title: "Title", textAlignment: "left" },
  { field: QuestionsColumn.ASKEDBY, title: "Asked By", textAlignment: "left" },
  { field: QuestionsColumn.ASKEDON, title: "Asked On", textAlignment: "left" },
  { field: QuestionsColumn.ACTIVITY, title: "Activity", textAlignment: "left" },
];

// export const questionRows: QuestionsRowsType[] = [
//   {
//     title: (
//       <Question
//         title="IM Stack setup and developers."
//         description=" how can we set up IM Stack and who are the developers?"
//       />
//     ),
//     askedBy: "Tanvir Khan",
//     askedOn: "12/10/2024",
//     activity: <QuestionActivity questionActivities={questionActivities} />,
//   },
//   {
//     title: (
//       <Question
//         title="IM Stack setup and developers."
//         description=" how can we set up IM Stack and who are the developers?"
//       />
//     ),
//     askedBy: "Tanvir Khan",
//     askedOn: "12/10/2024",
//     activity: <QuestionActivity questionActivities={questionActivities} />,
//   },
//   {
//     title: (
//       <Question
//         title="IM Stack setup and developers."
//         description=" how can we set up IM Stack and who are the developers?"
//       />
//     ),
//     askedBy: "Tanvir Khan",
//     askedOn: "12/10/2024",
//     activity: <QuestionActivity questionActivities={questionActivities} />,
//   },
//   {
//     title: (
//       <Question
//         title="IM Stack setup and developers."
//         description=" how can we set up IM Stack and who are the developers?"
//       />
//     ),
//     askedBy: "Tanvir Khan",
//     askedOn: "12/10/2024",
//     activity: <QuestionActivity questionActivities={questionActivities} />,
//   },
//   {
//     title: (
//       <Question
//         title="IM Stack setup and developers."
//         description=" how can we set up IM Stack and who are the developers?"
//       />
//     ),
//     askedBy: "Tanvir Khan",
//     askedOn: "12/10/2024",
//     activity: <QuestionActivity questionActivities={questionActivities} />,
//   },
// ];

const Home = () => {
  const { user } = useUser();
  const navigation = useNavigate();

  //User
  const { data: userdetails, isLoading } = useQuery<ResponseType<RUserType>>({
    queryKey: [QueryKeys.GET_USER],
    queryFn: () => getUser(user ? user?.id : ""),
    staleTime: 1000 * 5 * 60,
  });

  //Activities
  const {
    data: activitiesdata,
    isLoading: isLoadingActivities,
    refetch: refetchUser,
  } = useQuery<ResponseType<RActivitiesType>>({
    queryKey: [QueryKeys.GET_ACTIVITIES, userdetails?.data.userId],
    queryFn: getActivities,
    enabled: !!userdetails,
  });

  //ProjectDocs
  const { data: projectDocs, isLoading: isLoadingProjectDocs } = useQuery<
    ResponseType<RProjectDocsType>
  >({
    queryKey: [QueryKeys.GET_PROJECT_DOCS, userdetails?.data.userId],
    queryFn: getProjectDocs,
    enabled: !!userdetails,
  });

  //Questions
  const { data: questions, isLoading: isLoadingQuestions } = useQuery<
    ResponseType<RQuestionsType>
  >({
    queryKey: [QueryKeys.GET_QUESTIONS, userdetails?.data.userId],
    queryFn: () => getQuestions(userdetails ? userdetails?.data.userId : "", 5),
    enabled: !!userdetails,
  });

  const { mutate: addUserMutate } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      refetchUser();
    },
    onError: () => {
      refetchUser();
    },
  });

  async function getActivities(): Promise<ResponseType<RActivitiesType>> {
    const data = await customFetch(
      `${Paths.GET_ACTIVITIES}/${userdetails?.data.userId}`
    );
    return data;
  }

  async function getProjectDocs(): Promise<ResponseType<RProjectDocsType>> {
    const data = await customFetch(
      `${Paths.GET_PROJECT_DOCS}/${userdetails?.data.userId}?limit=5`
    );
    return data;
  }

  async function addUser() {
    const res = await customFetch(
      `${Paths.ADD_USER}`,
      {
        firstName: user?.firstName,
        lastName: user?.lastName,
        emailId: user?.emailAddresses[0].emailAddress,
        clerkUserId: user?.id,
      },
      "POST"
    );
    return res;
  }

  useEffect(() => {
    addUserMutate();
  }, [user]);

  const activitiesValues: ActivitiesType = {
    [TotalActivities.TOTALPROJECTS]: activitiesdata?.data.totalProjects,
    [TotalActivities.TOTALQUESTIONS]: activitiesdata?.data.totalQuestions,
    [TotalActivities.TOTALANSWERS]: activitiesdata?.data.totalAnswers,
    [TotalActivities.TOTALVOTES]: activitiesdata?.data.totalVotes,
  };

  const projectDocsRows: ProjectsRowstype[] = projectDocs
    ? projectDocs.data.map(
        ({
          projectId,
          icon,
          projectName,
          createdBy,
          createdOn,
          modifiedBy,
          modifiedOn,
        }) => ({
          name: <ProjectTitle imageSrc={icon} ProjectName={projectName} />,
          projectId,
          createdBy: createdBy.userName,
          createdOn: createdOn.split("T")[0],
          updatedBy: modifiedBy.userName,
          updatedOn: modifiedOn.split("T")[0],
          onClick: () => navigation({ to: `/projectdocs/${projectId}` }),
        })
      )
    : [];

  const questionRows: QuestionsRowsType[] = questions
    ? questions?.data.map(
        ({ Answers, title, askedOn, views, Users, Votes, questionId }) => ({
          title: (
            <Question
              title={
                title.length > 30 ? title.substring(0, 30) + "...." : title
              }
            />
          ),
          askedOn: askedOn.split("T")[0],
          askedBy: `${Users.firstName} ${Users.lastName}`,
          activity: (
            <QuestionActivity
              questionActivities={questionActivities.map((item) => ({
                ...item,
                value:
                  item.name === "Answers"
                    ? Answers.count
                    : item.name === "Views"
                      ? views
                      : Votes,
              }))}
            />
          ),
          onClick: () => navigation({ to: `/questions/${questionId}` }),
        })
      )
    : [];

  return (
    <Header
      isLoading={
        isLoading ||
        isLoadingActivities ||
        isLoadingProjectDocs ||
        isLoadingQuestions
      }
    >
      {!isLoading &&
      !isLoadingActivities &&
      !isLoadingProjectDocs &&
      !isLoadingQuestions ? (
        <section className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {totalActivities.map((activity: TotalActivitiesType) => (
              <ActivityCard
                key={activity.title}
                content={activitiesValues[activity.title]}
                {...activity}
              />
            ))}
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 ">
            <Card
              className="min-h-96"
              title="Projects"
              description="Recently created/updated projects."
              action={
                <Button asChild className="ml-auto gap-1">
                  <Link to="/projectdocs">
                    View All
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
              }
              content={
                <Table columns={projectColumns} rows={projectDocsRows} />
              }
            />
            <Card
              title="Questions"
              description="Recently asked questions."
              action={
                <Button asChild className="ml-auto gap-1">
                  <Link to="/questions">
                    View All
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
              }
              content={<Table columns={questionColumns} rows={questionRows} />}
            />
          </div>
        </section>
      ) : (
        <section className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Skeleton className="w-[18rem] h-[7.75rem]" />
            <Skeleton className="w-[18rem] h-[7.75rem]" />
            <Skeleton className="w-[18rem] h-[7.75rem]" />
            <Skeleton className="w-[18rem] h-[7.75rem]" />
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 ">
            <Skeleton className="w-[38.125rem] h-[33.75rem]" />
            <Skeleton className="w-[38.125rem] h-[33.75rem]" />
          </div>
        </section>
      )}
    </Header>
  );
};

export default Home;
