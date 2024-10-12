import React from "react";
import Header from "@/components/Header";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilePlus } from "lucide-react";
import ProjectTitle from "@/components/ProjectTitle";
import { ProjectsRowstype, TableColumnsType } from "@/type";
import { ProductsColumn } from "@/enum";
import imstackLogo from "../images/IMSTACKLOGO.png";

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

const ProjectDocs = () => {
  return (
    <Header>
      <div className="w-full">
        <div className="sticky top-0 z-10">
          <div className=" flex items-center py-4 justify-between gap-2">
            <Input
              placeholder="Filter projects by name..."
              onChange={(event) => {}}
              className="max-w-sm"
            />

            <Button className="w-40 flex items-center gap-2 ">
              <FilePlus className="w-4 h-4" />
              <p>Create Project</p>
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table columns={projectColumns} rows={projectRows} />
        </div>
      </div>
    </Header>
  );
};

export default ProjectDocs;
