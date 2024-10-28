import React, { ReactNode } from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { FilePlus } from "lucide-react";
import imstackLogo from "../images/IMSTACKLOGO.png";
import ProjectCard from "@/components/ProjectCard";
import { useNavigate } from "@tanstack/react-router";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ProjectTitle from "@/components/ProjectTitle";
import Tag from "@/components/Tag";

const projects: {
  image: string;
  name: string;
  id: string;
  summary: string;
  technologies: string[];
}[] = [
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "0d00c078-afba-4825-bbab-c9499817c25c",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim...",
    technologies: ["React JS", "Java Script", "CRM", "Dot Net"],
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim...",
    technologies: ["React JS", "Java Script", "CRM", "Dot Net"],
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim...",
    technologies: ["React JS", "Java Script", "CRM", "Dot Net"],
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim...",
    technologies: ["React JS", "Java Script", "CRM", "Dot Net"],
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim...",
    technologies: ["React JS", "Java Script", "CRM", "Dot Net"],
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim...",
    technologies: ["React JS", "Java Script", "CRM", "Dot Net"],
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim...",
    technologies: ["React JS", "Java Script", "CRM", "Dot Net"],
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim...",
    technologies: ["React JS", "Java Script", "CRM", "Dot Net"],
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim...",
    technologies: ["React JS", "Java Script", "CRM", "Dot Net"],
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim...",
    technologies: ["React JS", "Java Script", "CRM", "Dot Net"],
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim...",
    technologies: ["React JS", "Java Script", "CRM", "Dot Net"],
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim...",
    technologies: ["React JS", "Java Script", "CRM", "Dot Net"],
  },
  {
    image: imstackLogo,
    name: " IM Stack",
    id: "test",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim...",
    technologies: ["React JS", "Java Script", "CRM", "Dot Net"],
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
        <div className="w-full flex flex-col gap-4">
          {projects.map(({ image, name, summary, id, technologies }) => (
            // <ProjectCard key={name} image={image} name={name} id={id} />
            <Card
              onClick={() =>
                navigation({ from: "/projectdocs", to: `/projectdocs/${id}` })
              }
              className="hover:shadow-lg duration-100 cursor-pointer"
              key={name}
              title={
                <ProjectTitle
                  className="text-2xl"
                  ProjectName={name}
                  imageSrc={image}
                />
              }
              content={
                <div className="w-full flex flex-col gap-4">
                  <div>
                    {summary.length > 200
                      ? `${summary.slice(0, 140)}...`
                      : summary}
                  </div>
                  <div className="w-full flex flex-row gap-1">
                    {technologies.map((i) => (
                      <Tag key={i} content={i} />
                    ))}
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </Header>
  );
};

export default ProjectDocs;
