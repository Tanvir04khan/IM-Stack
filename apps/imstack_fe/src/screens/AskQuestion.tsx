import AskQuestionAction from "@/components/AskQuestionAction";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Dialog from "@/components/Dialog";
import Header from "@/components/Header";
import InfoDisplay from "@/components/InfoDisplay";
import Input from "@/components/Input";
import MultiSelectDropdown from "@/components/MultiselectorDropdown";
import TextEditor from "@/components/TextEditor";
import { Label } from "@/components/ui/label";
import { Plus, Upload } from "lucide-react";
import React, { useState } from "react";

const AskQuestion = () => {
  const [editorContent, setEditorContent] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const handleContent = (newContent: string) => {
    setEditorContent(newContent);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Header>
      <Card
        title="New Question"
        description="Before asking your question, please use the search feature in questions tab to ensure it hasn't already been answered. This helps us avoid duplicate questions and ensures you get the best possible solution faster."
        content={
          <div className="flex flex-col gap-8">
            <div className="grid gap-4 md:grid-cols-2 ">
              <Input
                lable="Title"
                placeholder="Title..."
                type="text"
                value={title}
                onChange={handleTitle}
              />
              <MultiSelectDropdown
                label="Technology"
                placeholder="Select technology..."
                options={["React JS", "JS", "TS", "Dot Net", "CRM"]}
                value={selectedTech}
                onSelect={setSelectedTech}
              />
              <MultiSelectDropdown
                label="Project"
                placeholder="Select Project..."
                options={["IM stack", "X4A", "X4C", "X4V", "X4S"]}
                value={selectedProject}
                onSelect={setSelectedProject}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Question</Label>
              <TextEditor
                placeholder="Type here..."
                value={editorContent}
                handleContent={handleContent}
              />
            </div>
            <AskQuestionAction
              title={title}
              technology={selectedTech.join(", ")}
              Project={selectedProject.join(", ")}
              editorContent={editorContent}
              isReviewDialogOpen={isReviewDialogOpen}
              setIsReviewDialogOpen={setIsReviewDialogOpen}
              handlePostQuestion={() => {}}
            />
          </div>
        }
      />
    </Header>
  );
};

export default AskQuestion;
