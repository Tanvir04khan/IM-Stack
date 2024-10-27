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
    const response = await fetch("http://localhost:5001/create-projectdoc", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectName,
        projectIcon: projectImage,
        summary: projectSummary,
        document: content,
        createdBy: "1b764a45-b28a-4c38-b9d2-2c76c274fde2",
        modifiedBy: "1b764a45-b28a-4c38-b9d2-2c76c274fde2",
      }),
    });
    console.log(response);
  };

  return (
    <Header>
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
