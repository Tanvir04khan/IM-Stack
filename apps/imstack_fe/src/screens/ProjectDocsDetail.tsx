import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import Header from "@/components/Header";
import ProjectTitle from "@/components/ProjectTitle";
import { useParams } from "@tanstack/react-router";
import IMStackLogo from "../images/IMSTACKLOGO.png";
import { Edit } from "lucide-react";
import Button from "@/components/Button";
import { AvatarIcon, UpdateIcon } from "@radix-ui/react-icons";
import { InfoDisplayPropsType } from "@/components/InfoDisplay";
import { AvatarWithTooltip } from "@/type";
import ProjectDocsDetailsDesc from "@/components/ProjectDocsDetailsDesc";
import ProjectDocsDetailContent from "@/components/ProjectDocsDetailContent";

const createUpdateDetails: InfoDisplayPropsType[] = [
  {
    lable: "Created By",
    value: "Tanvir Khan",
  },
  {
    lable: "Created On",
    value: "20/04/2024",
  },
  {
    lable: "Updated By",
    value: "Tanvir Khan",
  },
  {
    lable: "Updated On",
    value: "20/04/2024",
  },
];

const liveUsers: AvatarWithTooltip[] = [
  {
    name: "Tanvir Khan",
    avatar: <AvatarIcon className="h-8 w-8" />,
  },
  {
    name: "Tanvir Khan",
    avatar: <AvatarIcon className="h-8 w-8" />,
  },
  {
    name: "Tanvir Khan",
    avatar: <AvatarIcon className="h-8 w-8" />,
  },
];

const ProjectDocsDetail = () => {
  const { projectdocsId } = useParams({ strict: false });
  const [isEditable, setIsEditable] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectSummary, setProjectSummary] = useState("");
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >("");

  const handleContent = (content: string) => {
    setEditorContent(content);
  };

  const handleEditButton = () => {
    setIsEditable((ps) => !ps);
  };
  const handleUpdateButton = () => {
    setIsEditable((ps) => !ps);
  };

  const handleProjectName = (value: string) => {
    setProjectName(value);
  };
  const handleImageChange = (value: string | ArrayBuffer | null) => {
    setSelectedImage(value);
  };

  const getProjectDocDetails = async () => {
    const resultJSON = await fetch(
      `http://localhost:5001/get-projectdocdetails/${projectdocsId}`
    );
    const result = await resultJSON.json();

    const buffer = result.data[0].document;
    const iconBuffer = result.data[0].icon;
    // Step 2: Convert the buffer to a UTF-8 string
    const htmlString = buffer.data
      .map((data: number) => String.fromCharCode(data))
      .join("");
    const icon = iconBuffer.data
      .map((data: number) => String.fromCharCode(data))
      .join("");
    setSelectedImage(icon);
    console.log(setEditorContent(htmlString));
  };

  useEffect(() => {
    getProjectDocDetails();
  }, []);

  return (
    <Header>
      <Card
        title={<ProjectTitle imageSrc={IMStackLogo} ProjectName="IM Stack" />}
        description={isEditable && <ProjectDocsDetailsDesc users={liveUsers} />}
        action={
          isEditable ? (
            <Button content="Update" onClick={handleUpdateButton}>
              <UpdateIcon className="h-4 w-4" />
            </Button>
          ) : (
            <Button content="Edit" onClick={handleEditButton}>
              <Edit className="h-4 w-4" />
            </Button>
          )
        }
        content={
          <ProjectDocsDetailContent
            projectName={projectName}
            editorContent={editorContent}
            createUpdateDetails={createUpdateDetails}
            selectedImage={selectedImage}
            isEditable={isEditable}
            handleContent={handleContent}
            handleImageChange={handleImageChange}
            setProjectName={handleProjectName}
            projectSummary={projectSummary}
            setProjectSummary={setProjectSummary}
          />
        }
      />
    </Header>
  );
};

export default ProjectDocsDetail;
