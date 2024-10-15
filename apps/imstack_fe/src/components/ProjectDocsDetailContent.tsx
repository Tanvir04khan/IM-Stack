import React from "react";
import InfoDisplay, { InfoDisplayPropsType } from "./InfoDisplay";
import CreateProjectContent from "./CreateProjectContent";

type ProjectDocsDetailContentPropsType = {
  createUpdateDetails: InfoDisplayPropsType[];
  projectName: string;
  selectedImage: string | null;
  editorContent: string;
  setProjectName: (value: string) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleContent: (newContent: string) => void;
  isEditable: boolean;
};

const ProjectDocsDetailContent = ({
  projectName,
  selectedImage,
  editorContent,
  createUpdateDetails,
  handleContent,
  handleImageChange,
  setProjectName,
  isEditable,
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
          />
        ) : (
          <div className="w-full flex items-center justify-center mt-8">
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
