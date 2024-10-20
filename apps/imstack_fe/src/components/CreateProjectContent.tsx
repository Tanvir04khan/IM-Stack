import React, { useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import Input from "./Input";
import TextEditor from "./TextEditor";
import CircularImageUpload from "./ImageInput";

type CreateProjectContentPropsType = {
  selectedImage: string | null;
  handleImageChange: (value: string | null) => void;
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
      <div className="grid gap-4 ">
        <div className="flex flex-col items-center justify-start gap-4 sm:flex-row ">
          <CircularImageUpload
            lable="Project Image"
            value={selectedImage}
            setImage={handleImageChange}
          />
          <Input
            className="w-full grow sm:w-auto"
            lable="Project Name"
            type="text"
            placeholder="Project Name ..."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Project Summary</Label>
          <Textarea className="h-20" placeholder="Project Summary..." />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Project Docs</Label>
        <TextEditor
          placeholder="Type here..."
          value={textEditorContent}
          handleContent={handleContent}
        />
      </div>
    </div>
  );
};

export default CreateProjectContent;
