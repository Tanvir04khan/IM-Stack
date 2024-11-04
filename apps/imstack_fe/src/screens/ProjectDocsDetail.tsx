import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import Header from "@/components/Header";
import ProjectTitle from "@/components/ProjectTitle";
import { useParams } from "@tanstack/react-router";
import IMStackLogo from "../images/IMSTACKLOGO.png";
import { Edit } from "lucide-react";
import Button from "@/components/Button";
import { AvatarIcon, UpdateIcon } from "@radix-ui/react-icons";
import { InfoDisplayPropsType } from "@/components/InfoDisplay";
import {
  AvatarWithTooltip,
  ResponseType,
  RProjectDocDetailsType,
} from "@/type";
import ProjectDocsDetailsDesc from "@/components/ProjectDocsDetailsDesc";
import ProjectDocsDetailContent from "@/components/ProjectDocsDetailContent";
import { useQuery } from "@tanstack/react-query";
import { Paths, QueryKeys } from "@/enum";
import { customFetch } from "@/utilts";

const createUpdateDetails: InfoDisplayPropsType[] = [
  {
    lable: "Created By",
    value: "Tanvir Khan",
  },
  {
    lable: "Created On",
    value: "20/04/2024",
  },
  {
    lable: "Updated By",
    value: "Tanvir Khan",
  },
  {
    lable: "Updated On",
    value: "20/04/2024",
  },
];

const liveUsers: AvatarWithTooltip[] = [
  {
    name: "Tanvir Khan",
    avatar: <AvatarIcon className="h-8 w-8" />,
  },
  {
    name: "Tanvir Khan",
    avatar: <AvatarIcon className="h-8 w-8" />,
  },
  {
    name: "Tanvir Khan",
    avatar: <AvatarIcon className="h-8 w-8" />,
  },
];

const ProjectDocsDetail = () => {
  const { data: projectDocDetails, isLoading: isLoadingProjcetDocDetails } =
    useQuery<ResponseType<RProjectDocDetailsType>>({
      queryKey: [QueryKeys.GET_PROJECT_DOC_DETAILS],
      queryFn: getProjectDocDetails,
    });
  const { projectdocsId } = useParams({ strict: false });
  const [formProjectName, setFormProjectName] = useState("");
  const [formSummary, setFormSummary] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >("");

  const handleContent = (content: string) => {
    setEditorContent(content);
  };

  const handleEditButton = () => {
    setIsEditable((ps) => !ps);
  };
  const handleUpdateButton = () => {
    setIsEditable((ps) => !ps);
  };

  const handleProjectName = (value: string) => {
    setFormProjectName(value);
  };
  const handleImageChange = (value: string | ArrayBuffer | null) => {
    setSelectedImage(value);
  };

  async function getProjectDocDetails(): Promise<
    ResponseType<RProjectDocDetailsType>
  > {
    const data = await customFetch(
      `${Paths.GET_PROJECT_DOC_DETAILS}/${projectdocsId}`
    );
    return data;
  }

  const createUpdateDetails: InfoDisplayPropsType[] = [
    {
      lable: "Created By",
      value: `${projectDocDetails?.data.createdBy.firstName} ${projectDocDetails?.data.createdBy.lastName}`,
    },
    {
      lable: "Created On",
      value: projectDocDetails?.data.createdOn.split("T")[0],
    },
    {
      lable: "Updated By",
      value: `${projectDocDetails?.data.modifiedBy.firstName} ${projectDocDetails?.data.modifiedBy.lastName}`,
    },
    {
      lable: "Updated On",
      value: projectDocDetails?.data.modifiedOn.split("T")[0],
    },
  ];

  useEffect(() => {
    handleProjectName(
      projectDocDetails ? projectDocDetails.data.projectName : ""
    );
    handleImageChange(projectDocDetails ? projectDocDetails.data.icon : "");
    setFormSummary(projectDocDetails ? projectDocDetails.data.summary : "");
    handleContent(projectDocDetails ? projectDocDetails.data.document : "");
  }, [projectDocDetails?.data]);

  return (
    <Header isLoading={false}>
      {
        <Card
          title={
            <ProjectTitle
              imageSrc={projectDocDetails ? projectDocDetails.data.icon : ""}
              ProjectName={
                projectDocDetails ? projectDocDetails.data.projectName : ""
              }
            />
          }
          description={
            isEditable && <ProjectDocsDetailsDesc users={liveUsers} />
          }
          action={
            isEditable ? (
              <Button content="Update" onClick={handleUpdateButton}>
                <UpdateIcon className="h-4 w-4" />
              </Button>
            ) : (
              <Button content="Edit" onClick={handleEditButton}>
                <Edit className="h-4 w-4" />
              </Button>
            )
          }
          content={
            <ProjectDocsDetailContent
              projectName={formProjectName}
              editorContent={editorContent}
              createUpdateDetails={createUpdateDetails}
              selectedImage={selectedImage}
              isEditable={isEditable}
              handleContent={handleContent}
              handleImageChange={handleImageChange}
              setProjectName={handleProjectName}
              projectSummary={formSummary}
              setProjectSummary={setFormProjectName}
              tags={
                projectDocDetails
                  ? projectDocDetails.data.Tags.map(({ Technologies }) => ({
                      technologyId: Technologies.technologyId,
                      technology: Technologies.technology,
                    }))
                  : []
              }
            />
          }
        />
      }
    </Header>
  );
};

export default ProjectDocsDetail;
