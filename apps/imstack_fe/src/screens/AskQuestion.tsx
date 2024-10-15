import Button from "@/components/Button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Input from "@/components/Input";
import MultiSelectDropdown from "@/components/MultiselectorDropdown";
import TextEditor from "@/components/TextEditor";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const AskQuestion = () => {
  const [editorContent, setEditorContent] = useState("");

  const handleContent = (newContent: string) => {
    setEditorContent(newContent);
  };

  return (
    <Header>
      <Card
        title="New Question"
        action={
          <Button content="Add" onClick={() => {}}>
            <Plus className="w-4 h-4" />
          </Button>
        }
        content={
          <div>
            <div>
              <Input
                lable="Title"
                placeholder="Title..."
                type="text"
                value={""}
                onChange={() => {}}
              />
              <MultiSelectDropdown
                label="Technologies"
                options={["React JS", "JS", "TS", "Dot Net", "CRM"]}
                onSelect={() => {}}
              />
            </div>
            <TextEditor
              placeholder="Type here..."
              value={editorContent}
              handleContent={handleContent}
            />
          </div>
        }
      />
    </Header>
  );
};

export default AskQuestion;
