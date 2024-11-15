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
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { Paths, QueryKeys } from "@/enum";
import { customFetch, getUser } from "@/utilts";
import { Skeleton } from "@/components/ui/skeleton";
import Alert from "@/components/Alert";
import { useUser } from "@clerk/clerk-react";

// const liveUsers: AvatarWithTooltip[] = [
//   {
//     name: "Tanvir Khan",
//     avatar: <AvatarIcon className="h-8 w-8" />,
//   },
//   {
//     name: "Tanvir Khan",
//     avatar: <AvatarIcon className="h-8 w-8" />,
//   },
//   {
//     name: "Tanvir Khan",
//     avatar: <AvatarIcon className="h-8 w-8" />,
//   },
// ];

const ProjectDocsDetail = () => {
  const { user } = useUser();
  const {
    data: projectDocDetails,
    isFetching: isLoadingProjcetDocDetails,
    refetch: refetchProjectDetails,
  } = useQuery<ResponseType<RProjectDocDetailsType>>({
    queryKey: [QueryKeys.GET_PROJECT_DOC_DETAILS],
    queryFn: getProjectDocDetails,
  });

  const { data: userData, isFetching: isLoadingUserData } = useQuery({
    queryKey: [QueryKeys.GET_USER, user?.id],
    queryFn: () => getUser(user ? user.id : ""),
    staleTime: 1000 * 5 * 60,
  });

  const { mutate, isPending: isLoadingUpdateDoc } = useMutation({
    mutationFn: updateProjectDoc,
    onSuccess: () => {
      setAlertType("Success");
      setAlertMessage("Project document updated sucessfully.");
      refetchProjectDetails();
    },
    onError: () => {
      setAlertType("Error");
      setAlertMessage("Error while updating project document.");
    },
  });

  const { projectdocsId } = useParams({ strict: false });
  const [formProjectName, setFormProjectName] = useState("");
  const [formSummary, setFormSummary] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >("");
  const [technologies, setTechnologies] = useState<
    {
      id: string;
      value: string;
    }[]
  >([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"Success" | "Error" | "Warning">(
    "Success"
  );

  const handleContent = (content: string) => {
    setEditorContent(content);
  };

  const handleEditButton = () => {
    setIsEditable((ps) => !ps);
  };
  const handleUpdateButton = () => {
    setAlertType("Warning");
    if (!editorContent) {
      return setAlertMessage("Project Docs can't be empty!");
    }
    if (!selectedImage) {
      return setAlertMessage("Project Image can't be empty!");
    }
    if (!formProjectName) {
      return setAlertMessage("Project Name can't be empty!");
    }
    if (!formSummary) {
      return setAlertMessage("Project Summary can't be empty!");
    }
    if (!technologies.length) {
      return setAlertMessage("Technologies can't be empty.");
    }
    mutate();
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

  async function updateProjectDoc() {
    const res = await customFetch(
      `${Paths.UPDATE_PROJECT_DOC}/${userData?.data.userId}`,
      {
        projectId: projectdocsId,
        projectName: formProjectName,
        summary: formSummary,
        projectIcon: selectedImage,
        document: editorContent,
        tags: technologies,
      },
      "PUT"
    );
    return res;
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
    setTechnologies(
      projectDocDetails
        ? projectDocDetails.data.Tags.map(({ Technologies }) => ({
            id: Technologies.technologyId,
            value: Technologies.technology,
          }))
        : []
    );
  }, [projectDocDetails?.data]);

  return (
    <Header
      isLoading={
        isLoadingProjcetDocDetails || isLoadingUserData || isLoadingUpdateDoc
      }
    >
      {!isLoadingProjcetDocDetails ? (
        <Card
          title={
            <ProjectTitle
              imageSrc={projectDocDetails ? projectDocDetails.data.icon : ""}
              ProjectName={
                projectDocDetails ? projectDocDetails.data.projectName : ""
              }
            />
          }
          description={isEditable && <ProjectDocsDetailsDesc users={[]} />}
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
              handleTechnologies={setTechnologies}
              selectedTechnologies={technologies}
            />
          }
        />
      ) : (
        <Skeleton className="max-w-5xl w-full h-[50vh]" />
      )}
      {alertMessage && (
        <Alert
          title={alertType}
          type={alertType}
          description={alertMessage}
          variant="default"
          setAlertMessage={setAlertMessage}
        />
      )}
    </Header>
  );
};

export default ProjectDocsDetail;
