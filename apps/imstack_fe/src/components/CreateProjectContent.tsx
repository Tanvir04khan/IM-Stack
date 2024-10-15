import React, { useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import Input from "./Input";
import TextEditor from "./TextEditor";

type CreateProjectContentPropsType = {
  selectedImage: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  projectName: string;
  setProjectName: (value: string) => void;
  textEditorContent: string;
  handleContent: (newContent: string) => void;
};

const CreateProjectContent = ({
  projectName,
  selectedImage,
  textEditorContent,
  handleImageChange,
  setProjectName,
  handleContent,
}: CreateProjectContentPropsType) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 ">
        <Input
          lable="Project Name"
          type="text"
          placeholder="Project Name ..."
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <Input
          lable="Project Image"
          placeholder="Project Image...s"
          type="file"
          accept="image/*"
          value={selectedImage ? selectedImage : ""}
          onChange={handleImageChange}
        />
      </div>
      <TextEditor
        placeholder="Type here..."
        value={textEditorContent}
        handleContent={handleContent}
      />
    </div>
  );
};

export default CreateProjectContent;
