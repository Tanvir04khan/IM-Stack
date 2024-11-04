import React from "react";
import InfoDisplay, { InfoDisplayPropsType } from "./InfoDisplay";
import CreateProjectContent from "./CreateProjectContent";
import Tag from "./Tag";

type ProjectDocsDetailContentPropsType = {
  createUpdateDetails: InfoDisplayPropsType[];
  projectName: string;
  selectedImage: string | ArrayBuffer | null;
  editorContent: string;
  setProjectName: (value: string) => void;
  handleImageChange: (val: string | ArrayBuffer | null) => void;
  handleContent: (newContent: string) => void;
  setProjectSummary: (value: string) => void;
  projectSummary: string;
  isEditable: boolean;
  tags: { technologyId: string; technology: string }[];
};

const ProjectDocsDetailContent = ({
  projectName,
  selectedImage,
  editorContent,
  createUpdateDetails,
  handleContent,
  handleImageChange,
  setProjectName,
  setProjectSummary,
  projectSummary,
  isEditable,
  tags,
}: ProjectDocsDetailContentPropsType) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 items-left justify-left gap-2 md:grid-cols-4 md:flex-row md:gap-16 lg:gap-32 ">
          {createUpdateDetails.map(({ lable, value }) => (
            <InfoDisplay key={lable} lable={lable} value={value} />
          ))}
        </div>
        {isEditable ? (
          <CreateProjectContent
            projectName={projectName}
            selectedImage={selectedImage}
            setProjectName={setProjectName}
            handleImageChange={handleImageChange}
            handleContent={handleContent}
            textEditorContent={editorContent}
            projectSummary={projectSummary}
            setProjectSummary={setProjectSummary}
          />
        ) : (
          <div className="w-full flex flex-col items-center justify-center gap-4 mt-8">
            <div>
              <h1 className="flex flex-col gap-2 text-sm text-muted-foreground">
                Summary
              </h1>
              <h1>{projectSummary}</h1>
            </div>
            <div className="w-full flex flex-col gap-2">
              <h1 className="flex flex-col gap-2 text-sm text-muted-foreground">
                Technologies
              </h1>
              <div className="w-full flex flex-row flex-wrap gap-1">
                {tags.map(({ technology, technologyId }) => (
                  <Tag key={technologyId} content={technology} />
                ))}
              </div>
            </div>
            <div
              className="w-full"
              dangerouslySetInnerHTML={{ __html: editorContent }}
            ></div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectDocsDetailContent;
