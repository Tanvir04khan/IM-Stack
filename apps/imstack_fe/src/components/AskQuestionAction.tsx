import React, { ReactNode } from "react";
import Dialog from "./Dialog";
import InfoDisplay from "./InfoDisplay";
import Button from "./Button";
import { Plus, Upload } from "lucide-react";

type AskQuestionActionPropsType = {
  title: ReactNode;
  technology: ReactNode;
  Project: ReactNode;
  editorContent: string;
  setIsReviewDialogOpen: (value: boolean) => void;
  isReviewDialogOpen: boolean;
  handlePostQuestion: () => void;
};

const AskQuestionAction = ({
  title,
  technology,
  Project,
  editorContent,
  isReviewDialogOpen,
  handlePostQuestion,
  setIsReviewDialogOpen,
}: AskQuestionActionPropsType) => {
  return (
    <Dialog
      title="Review Question"
      description="Please review the question before post."
      content={
        <div className="flex flex-col items-left justify-left gap-2">
          <InfoDisplay lable="Title" value={title} />
          <InfoDisplay lable="Technology" value={technology} />
          <InfoDisplay lable="Project" value={Project} />
          <InfoDisplay
            lable="Question"
            value={<div dangerouslySetInnerHTML={{ __html: editorContent }} />}
          />
        </div>
      }
      action={
        <Button
          onClick={() => {
            handlePostQuestion();
            setIsReviewDialogOpen(false);
          }}
          content="Post your question"
        >
          <Upload className="h-4 w-4" />
        </Button>
      }
      isOpen={isReviewDialogOpen}
      setIsOpen={(value: boolean) => setIsReviewDialogOpen(value)}
    >
      <Button content="Add" onClick={() => {}}>
        <Plus className="w-4 h-4" />
      </Button>
    </Dialog>
  );
};

export default AskQuestionAction;
