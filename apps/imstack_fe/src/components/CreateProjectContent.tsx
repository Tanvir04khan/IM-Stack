import React, { useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import Input from "./Input";
import TextEditor from "./TextEditor";
import CircularImageUpload from "./ImageInput";
import MultiSelectDropdown from "./MultiselectorDropdown";

type CreateProjectContentPropsType = {
  selectedImage: string | ArrayBuffer | null;
  handleImageChange: (value: string | ArrayBuffer | null) => void;
  projectName: string;
  setProjectName: (value: string) => void;
  setProjectSummary: (value: string) => void;
  projectSummary: string;
  textEditorContent: string;
  handleContent: (newContent: string) => void;
};

const CreateProjectContent = ({
  projectName,
  selectedImage,
  textEditorContent,
  projectSummary,
  handleImageChange,
  setProjectName,
  setProjectSummary,
  handleContent,
}: CreateProjectContentPropsType) => {
  return (
    <div className="flex flex-col gap-8">
      <div className=" grid gap-4 ">
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
        <div className="w-full flex flex-col gap-4 md:flex-row">
          <div className="w-full flex flex-col gap-2">
            <Label>Project Summary</Label>
            <Textarea
              className="h-20"
              placeholder="Project Summary..."
              value={projectSummary}
              onChange={(e) => setProjectSummary(e.target.value)}
            />
          </div>
          <MultiSelectDropdown
            label="Technologies"
            placeholder="Select technologies..."
            onSelect={() => {}}
            options={["test", "test"]}
            value={[]}
          />
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
