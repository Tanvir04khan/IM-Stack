import React, { useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import Input from "./Input";
import TextEditor from "./TextEditor";

type CreateProjectContentPropsType = {
  summary: string;
  setSummary: (value: string) => void;
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
  summary,
  textEditorContent,
  handleImageChange,
  setProjectName,
  setSummary,
  handleContent,
}: CreateProjectContentPropsType) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-2 md:grid-cols-2 ">
        <div className="flex flex-col gap-2">
          <Label>Summary</Label>
          <Textarea
            placeholder="summary ..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        <Input
          lable="Project Image"
          placeholder="Project Image...s"
          type="file"
          accept="image/*"
          value={selectedImage ? selectedImage : ""}
          onChange={handleImageChange}
        />

        <Input
          lable="Project Name"
          type="text"
          placeholder="Project Name ..."
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
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
