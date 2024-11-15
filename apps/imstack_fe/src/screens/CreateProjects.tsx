import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Card from "@/components/Card";
import CreateProjectContent from "@/components/CreateProjectContent";
import Header from "@/components/Header";
import { Paths, QueryKeys } from "@/enum";
import { customFetch, getUser } from "@/utilts";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { FilePlus } from "lucide-react";
import React, { useEffect, useState } from "react";

const CreateProjects = () => {
  const { user } = useUser();
  const navigation = useNavigate();
  const [content, setContent] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectSummary, setProjectSummary] = useState("");
  const [projectImage, setProjectImage] = useState<string | ArrayBuffer | null>(
    null
  );
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

  const { data: userData, isFetching: isLoadingUserData } = useQuery({
    queryKey: [QueryKeys.GET_USER, user?.id],
    queryFn: () => getUser(user ? user?.id : ""),
    staleTime: 1000 * 5 * 60,
  });

  const { mutate, isPending: isLoadingCreateProject } = useMutation({
    mutationFn: createProjectDoc,
    onSuccess: (data) => {
      setAlertType("Success");
      setAlertMessage("Project document created sucessfully.");
      console.log("...p", data);
      navigation({ to: `/projectdocs/${data.data.projectDocId}` });
    },
    onError: () => {
      setAlertType("Error");
      setAlertMessage("Error while creating project document.");
    },
  });

  const handleContent = (newContent: string) => {
    setContent(newContent);
  };

  const handleImageChange = (value: string | ArrayBuffer | null) => {
    setProjectImage(value);
  };

  function handleCreateProjectButton() {
    setAlertType("Warning");
    if (!content) {
      return setAlertMessage("Project Docs can't be empty!");
    }
    if (!projectImage) {
      return setAlertMessage("Project Image can't be empty!");
    }
    if (!projectName) {
      return setAlertMessage("Project Name can't be empty!");
    }
    if (!projectSummary) {
      return setAlertMessage("Project Summary can't be empty!");
    }
    if (!projectName) {
      return setAlertMessage("Project Name can't be empty!");
    }
    if (!technologies.length) {
      return setAlertMessage("Technologies can't be empty.");
    }
    mutate();
  }

  async function createProjectDoc() {
    const res = await customFetch(
      `${Paths.CREATE_PROJECT_DOC}/${userData?.data.userId}`,
      {
        projectName,
        summary: projectSummary,
        projectIcon: projectImage,
        document: content,
        tags: technologies,
      },
      "POST"
    );
    return res;
  }

  return (
    <Header isLoading={isLoadingCreateProject || isLoadingUserData}>
      <Card
        title="Create new project"
        content={
          <CreateProjectContent
            projectName={projectName}
            textEditorContent={content}
            selectedImage={projectImage}
            handleImageChange={handleImageChange}
            handleContent={handleContent}
            setProjectName={setProjectName}
            setProjectSummary={setProjectSummary}
            handleTechnologies={setTechnologies}
            projectSummary={projectSummary}
            selectedTechnologies={technologies}
          />
        }
        action={
          <Button content="Create" onClick={handleCreateProjectButton}>
            <FilePlus className="w-4 h-4" />
          </Button>
        }
      />
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

export default CreateProjects;
