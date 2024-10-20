import Button from "@/components/Button";
import Card from "@/components/Card";
import CreateProjectContent from "@/components/CreateProjectContent";
import Header from "@/components/Header";
import { FilePlus } from "lucide-react";
import React, { useState } from "react";

const CreateProjects = () => {
  const [content, setContent] = useState("");
  const [projectName, setProjectName] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleContent = (newContent: string) => {
    setContent(newContent);
  };

  const handleImageChange = (value: string | null) => {
    setSelectedImage(value);
  };

  return (
    <Header>
      <Card
        title="Create new project"
        content={
          <CreateProjectContent
            projectName={projectName}
            textEditorContent={content}
            selectedImage={selectedImage}
            handleImageChange={handleImageChange}
            handleContent={handleContent}
            setProjectName={setProjectName}
          />
        }
        action={
          <Button content="Create" onClick={() => console.log()}>
            <FilePlus className="w-4 h-4" />
          </Button>
        }
      />
    </Header>
  );
};

export default CreateProjects;
