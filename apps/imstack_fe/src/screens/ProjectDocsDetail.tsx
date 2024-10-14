import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import Header from "@/components/Header";
import ProjectTitle from "@/components/ProjectTitle";
import { Link, useParams } from "@tanstack/react-router";
import IMStackLogo from "../images/IMSTACKLOGO.png";
import { Edit } from "lucide-react";
import TextEditor from "@/components/TextEditor";
import Button from "@/components/Button";

const ProjectDocsDetail = () => {
  const { projectdocsId } = useParams({ strict: false });
  const [isEditable, setIsEditable] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  const handleContent = (content: string) => {
    setEditorContent(content);
  };

  const handleUpdateButton = () => {
    setIsEditable((ps) => !ps);
  };

  return (
    <Header>
      <Card
        title={<ProjectTitle imageSrc={IMStackLogo} ProjectName="IM Stack" />}
        description={`Project details`}
        action={
          <Button content="Update" onClick={handleUpdateButton}>
            <Edit className="h-4 w-4" />
          </Button>
        }
        content={
          <div>
            <h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              delectus minima dignissimos iste iure amet nihil ullam libero quam
              quos nemo, sint veritatis distinctio earum ea mollitia a, at
              minus.
            </h1>
            {isEditable ? (
              <TextEditor
                placeholder="Type here ..."
                value={editorContent}
                handleContent={handleContent}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: editorContent }} />
            )}
          </div>
        }
      />
    </Header>
  );
};

export default ProjectDocsDetail;
