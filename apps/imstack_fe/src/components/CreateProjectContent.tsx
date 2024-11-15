import React, { Dispatch, SetStateAction, useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import Input from "./Input";
import TextEditor from "./TextEditor";
import CircularImageUpload from "./ImageInput";
import MultiSelectDropdown from "./MultiselectorDropdown";
import { useQuery } from "@tanstack/react-query";
import { Paths, QueryKeys } from "@/enum";
import { ResponseType, TechnologiesType } from "@/type";
import { customFetch, getTechnologies } from "@/utilts";

type CreateProjectContentPropsType = {
  selectedImage: string | ArrayBuffer | null;
  handleImageChange: (value: string | ArrayBuffer | null) => void;
  projectName: string;
  setProjectName: (value: string) => void;
  setProjectSummary: (value: string) => void;
  projectSummary: string;
  textEditorContent: string;
  handleContent: (newContent: string) => void;
  handleTechnologies: Dispatch<SetStateAction<{ id: string; value: string }[]>>;
  selectedTechnologies: { id: string; value: string }[];
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
  handleTechnologies,
  selectedTechnologies,
}: CreateProjectContentPropsType) => {
  const { data: technologies, isFetching: isTechnologiesLoading } = useQuery({
    queryKey: [QueryKeys.GET_TECHNOLOGIES],
    queryFn: getTechnologies,
    staleTime: 1000 * 5 * 60,
  });

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
            isMandatory
          />
        </div>
        <div className="w-full flex flex-col gap-4 md:flex-row">
          <div className="w-full flex flex-col gap-2">
            <Label>Project Summary *</Label>
            <Textarea
              className="h-20"
              placeholder="Project Summary..."
              value={projectSummary}
              onChange={(e) => setProjectSummary(e.target.value)}
              required
            />
          </div>
          <MultiSelectDropdown
            isMandatory
            label="Technologies"
            placeholder="Select technologies..."
            onSelect={handleTechnologies}
            options={
              technologies
                ? technologies?.data.map(({ technologyId, technology }) => ({
                    id: technologyId,
                    value: technology,
                  }))
                : []
            }
            values={selectedTechnologies}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Project Docs *</Label>
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
