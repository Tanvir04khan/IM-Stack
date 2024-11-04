import Button from "@/components/Button";
import Card from "@/components/Card";
import CreateProjectContent from "@/components/CreateProjectContent";
import Header from "@/components/Header";
import { FilePlus } from "lucide-react";
import React, { useState } from "react";

const CreateProjects = () => {
  const [content, setContent] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectSummary, setProjectSummary] = useState("");
  const [projectImage, setProjectImage] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleContent = (newContent: string) => {
    setContent(newContent);
  };

  const handleImageChange = (value: string | ArrayBuffer | null) => {
    setProjectImage(value);
  };

  const handleCreateProjectButton = async () => {
    const response = await fetch(
      "http://localhost:5001/create-projectdoc/9013abd1-630d-44fc-8916-ed1ff5d8db81",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName,
          projectIcon: projectImage,
          summary: projectSummary,
          document: content,
        }),
      }
    );
    console.log(response);
  };

  return (
    <Header isLoading={false}>
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
            projectSummary={projectSummary}
          />
        }
        action={
          <Button content="Create" onClick={handleCreateProjectButton}>
            <FilePlus className="w-4 h-4" />
          </Button>
        }
      />
    </Header>
  );
};

export default CreateProjects;
