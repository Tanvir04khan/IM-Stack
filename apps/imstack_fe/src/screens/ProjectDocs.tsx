import React, { ReactNode, useEffect } from "react";
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
import {
  ProjectsType,
  ResponseType,
  RProjectDocsType,
  RUserType,
} from "@/type";
import { useQuery } from "@tanstack/react-query";
import { Paths, QueryKeys } from "@/enum";
import { customFetch } from "@/utilts";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileCard from "@/components/ProfileCard";

const ProjectDocs = () => {
  const navigation = useNavigate();

  //User
  const { data: userData } = useQuery<ResponseType<RUserType>>({
    queryKey: [QueryKeys.GET_USER],
  });

  //ProjectDocs
  const { data: projectData, isLoading: isLoadingProjectData } = useQuery<
    ResponseType<RProjectDocsType>
  >({
    queryKey: [QueryKeys.GET_PROJECT_DOCS, userData?.data.userId],
    queryFn: getProjectDocs,
    enabled: !!userData,
  });

  async function getProjectDocs(): Promise<ResponseType<RProjectDocsType>> {
    const data = await customFetch(
      `${Paths.GET_PROJECT_DOCS}/${userData?.data.userId}`
    );
    return data;
  }

  const projectDocs: ProjectsType[] = projectData
    ? projectData?.data.map(
        ({ projectId, projectName, icon, summary, Tags, modifiedOn }) => ({
          projectId,
          projectName,
          icon,
          summary,

          technologies: Tags.map(({ Technologies }) => Technologies),
          modifiedOn: modifiedOn.split("T")[0],
        })
      )
    : [];

  return (
    <Header isLoading={isLoadingProjectData}>
      {
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
            {!isLoadingProjectData ? (
              projectDocs.length ? (
                projectDocs.map(
                  ({
                    projectId,
                    projectName,
                    icon,
                    summary,
                    technologies,
                    modifiedOn,
                  }) => (
                    // <ProjectCard key={name} image={image} name={name} id={id} />
                    <Card
                      onClick={() =>
                        navigation({
                          from: "/projectdocs",
                          to: `/projectdocs/${projectId}`,
                        })
                      }
                      className="hover:shadow-lg duration-100 cursor-pointer"
                      key={projectId}
                      title={
                        <ProjectTitle
                          className="text-2xl"
                          ProjectName={projectName}
                          imageSrc={icon}
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
                            {technologies.map(
                              ({ technology, technologyId }) => (
                                <Tag key={technologyId} content={technology} />
                              )
                            )}
                          </div>
                        </div>
                      }
                      action={
                        <div className="w-max-content text-muted-foreground">
                          {modifiedOn}
                        </div>
                      }
                    />
                  )
                )
              ) : (
                <div className="w-full max-w-5xl text-muted-foreground">
                  No data found.
                </div>
              )
            ) : (
              <>
                <Skeleton className="w-[1024px] h-32" />
                <Skeleton className="w-[1024px] h-32" />
                <Skeleton className="w-[1024px] h-32" />
                <Skeleton className="w-[1024px] h-32" />
              </>
            )}
          </div>
        </div>
      }
    </Header>
  );
};

export default ProjectDocs;
