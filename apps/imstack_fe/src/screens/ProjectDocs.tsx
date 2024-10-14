import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Table from "@/components/Table";
import { Input } from "@/components/ui/input";
import { FilePlus } from "lucide-react";
import ProjectTitle from "@/components/ProjectTitle";
import { ProjectsRowstype, TableColumnsType } from "@/type";
import { ProductsColumn } from "@/enum";
import imstackLogo from "../images/IMSTACKLOGO.png";
import ProjectCard from "@/components/ProjectCard";
import { useNavigate } from "@tanstack/react-router";
import Button from "@/components/Button";

const projects: { image: string; name: string; id: string }[] = [
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
  },
];

const ProjectDocs = () => {
  const navigation = useNavigate();

  return (
    <Header>
      <div className="w-full grid items-center justify-center gap-6">
        <div className="sticky top-0 z-10">
          <div className=" flex items-center py-4 justify-between gap-2">
            <Input
              placeholder="Filter projects by name..."
              onChange={(event) => {}}
              className="max-w-sm"
            />

            <Button
              content="Create Project"
              onClick={() =>
                navigation({
                  from: "/projectdocs",
                  to: `/projectdocs/createprojects`,
                })
              }
            >
              <FilePlus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="grid gap-4  grid-cols-1  max-w-screen-lg items-center justify-center md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {projects.map(({ image, name, id }) => (
            <ProjectCard key={name} image={image} name={name} id={id} />
          ))}
        </div>
      </div>
    </Header>
  );
};

export default ProjectDocs;
