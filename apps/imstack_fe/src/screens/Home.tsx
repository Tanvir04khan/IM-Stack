import React, { useState } from "react";

import { useUser } from "@clerk/clerk-react";
import Header from "@/components/Header";

import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ProductsColumn, QuestionsColumn, TotalActivities } from "@/enum";
import { questionActivities, totalActivities } from "@/utilts";
import ActivityCard from "@/components/ActivityCard";
import {
  TableColumnsType,
  ProjectsRowstype,
  TotalActivitiesType,
  QuestionsRowsType,
} from "@/type";
import imstackLogo from "../images/IMSTACKLOGO.png";
import Table from "@/components/Table";
import Card from "@/components/Card";
import QuestionActivity from "@/components/QuestionActivity";
import Question from "@/components/Question";
import ProjectTitle from "@/components/ProjectTitle";

type ActivitiesType = {
  [TotalActivities.TOTALPROJECTS]: number;
  [TotalActivities.TOTALQUESTIONS]: number;
  [TotalActivities.TOTALANSWERS]: number;
  [TotalActivities.TOTALVOTES]: number;
};

const activitiesInitialValues: ActivitiesType = {
  [TotalActivities.TOTALPROJECTS]: 10,
  [TotalActivities.TOTALQUESTIONS]: 200,
  [TotalActivities.TOTALANSWERS]: 20,
  [TotalActivities.TOTALVOTES]: 40,
};
const projectRows: ProjectsRowstype[] = [
  {
    name: <ProjectTitle imageSrc={imstackLogo} ProjectName="IM Stack" />,
    createdBy: "Tanvir Khan",
    createdOn: "20-08-24",
    updatedBy: "Tanvir Khan",
    updatedOn: "20-08-24",
  },
  {
    name: <ProjectTitle imageSrc={imstackLogo} ProjectName="IM Stack" />,
    createdBy: "Tanvir Khan",
    createdOn: "20-08-24",
    updatedBy: "Tanvir Khan",
    updatedOn: "20-08-24",
  },
  {
    name: <ProjectTitle imageSrc={imstackLogo} ProjectName="IM Stack" />,
    createdBy: "Tanvir Khan",
    createdOn: "20-08-24",
    updatedBy: "Tanvir Khan",
    updatedOn: "20-08-24",
  },
  {
    name: <ProjectTitle imageSrc={imstackLogo} ProjectName="IM Stack" />,
    createdBy: "Tanvir Khan",
    createdOn: "20-08-24",
    updatedBy: "Tanvir Khan",
    updatedOn: "20-08-24",
  },
  {
    name: <ProjectTitle imageSrc={imstackLogo} ProjectName="IM Stack" />,
    createdBy: "Tanvir Khan",
    createdOn: "20-08-24",
    updatedBy: "Tanvir Khan",
    updatedOn: "20-08-24",
  },
];

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

export const questionRows: QuestionsRowsType[] = [
  {
    title: (
      <Question
        title="IM Stack setup and developers."
        description=" how can we set up IM Stack and who are the developers?"
      />
    ),
    askedBy: "Tanvir Khan",
    askedOn: "12/10/2024",
    activity: <QuestionActivity questionActivities={questionActivities} />,
  },
  {
    title: (
      <Question
        title="IM Stack setup and developers."
        description=" how can we set up IM Stack and who are the developers?"
      />
    ),
    askedBy: "Tanvir Khan",
    askedOn: "12/10/2024",
    activity: <QuestionActivity questionActivities={questionActivities} />,
  },
  {
    title: (
      <Question
        title="IM Stack setup and developers."
        description=" how can we set up IM Stack and who are the developers?"
      />
    ),
    askedBy: "Tanvir Khan",
    askedOn: "12/10/2024",
    activity: <QuestionActivity questionActivities={questionActivities} />,
  },
  {
    title: (
      <Question
        title="IM Stack setup and developers."
        description=" how can we set up IM Stack and who are the developers?"
      />
    ),
    askedBy: "Tanvir Khan",
    askedOn: "12/10/2024",
    activity: <QuestionActivity questionActivities={questionActivities} />,
  },
  {
    title: (
      <Question
        title="IM Stack setup and developers."
        description=" how can we set up IM Stack and who are the developers?"
      />
    ),
    askedBy: "Tanvir Khan",
    askedOn: "12/10/2024",
    activity: <QuestionActivity questionActivities={questionActivities} />,
  },
];

const Home = () => {
  const [activities, setActivities] = useState<ActivitiesType>(
    activitiesInitialValues
  );
  const { user } = useUser();

  return (
    <Header>
      <section className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {totalActivities.map((activity: TotalActivitiesType) => (
            <ActivityCard content={activities[activity.title]} {...activity} />
          ))}
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 ">
          <Card
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
            content={<Table columns={projectColumns} rows={projectRows} />}
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
    </Header>
  );
};

export default Home;
