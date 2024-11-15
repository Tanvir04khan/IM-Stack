import Alert from "@/components/Alert";
import AskQuestionAction from "@/components/AskQuestionAction";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Input from "@/components/Input";
import MultiSelectDropdown from "@/components/MultiselectorDropdown";
import TextEditor from "@/components/TextEditor";
import { Label } from "@/components/ui/label";
import { Paths, QueryKeys } from "@/enum";
import {
  customFetch,
  getProjectTags,
  getTechnologies,
  getUser,
} from "@/utilts";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";

const AskQuestion = () => {
  const [editorContent, setEditorContent] = useState("");
  const [selectedTech, setSelectedTech] = useState<
    { id: string; value: string }[]
  >([]);
  const [selectedProject, setSelectedProject] = useState<
    { id: string; value: string }[]
  >([]);
  const [title, setTitle] = useState("");
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"Success" | "Error" | "Warning">(
    "Success"
  );
  const { user } = useUser();
  const navigation = useNavigate();

  const { data: userData, isFetching: isLoadingUserData } = useQuery({
    queryKey: [QueryKeys.GET_USER, user?.id],
    queryFn: () => getUser(user ? user?.id : ""),
    staleTime: 1000 * 5 * 60,
  });

  const { data: technologies, isFetching: isLoadingTechnologies } = useQuery({
    queryKey: [QueryKeys.GET_TECHNOLOGIES],
    queryFn: getTechnologies,
    staleTime: 1000 * 5 * 60,
  });

  const { data: projectTags, isFetching: isLoadingProjectTags } = useQuery({
    queryKey: [QueryKeys.GET_PROJECT_TAGS],
    queryFn: getProjectTags,
    staleTime: 1000 * 5 * 60,
  });

  const { mutate, isPending: isLoadingPostQuestion } = useMutation({
    mutationFn: postQuestion,
    onSuccess: (data) => {
      setAlertType("Success");
      setAlertMessage("Question posted sucessfully.");
      navigation({ to: `/questions/${data.data.questionId}` });
    },
    onError: () => {
      setAlertType("Error");
      setAlertMessage("Error while posting question.");
    },
  });

  const handleContent = (newContent: string) => {
    setEditorContent(newContent);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  async function postQuestion() {
    const res = await customFetch(
      `${Paths.ADD_QUESTION}/${userData?.data.userId}`,
      {
        title,
        question: editorContent,
        technologyTags: selectedTech.map(({ id, value }) => ({
          technologyId: id,
          technology: value,
        })),
        projectTags: selectedProject.map(({ id, value }) => ({
          projectId: id,
          projectName: value,
        })),
      },
      "POST"
    );
    return res;
  }

  const handlePostQuestion = () => {
    setAlertType("Warning");
    if (!title) {
      setAlertMessage("Title can't be empty.");
    }
    if (!editorContent) {
      setAlertMessage("Question can't be empty.");
    }
    mutate();
  };

  return (
    <Header
      isLoading={
        isLoadingTechnologies ||
        isLoadingProjectTags ||
        isLoadingUserData ||
        isLoadingPostQuestion
      }
    >
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
                isMandatory
              />
              <MultiSelectDropdown
                label="Technology"
                placeholder="Select technology..."
                options={
                  technologies
                    ? technologies?.data.map(
                        ({ technologyId, technology }) => ({
                          id: technologyId,
                          value: technology,
                        })
                      )
                    : []
                }
                values={selectedTech}
                onSelect={setSelectedTech}
              />
              <MultiSelectDropdown
                label="Project"
                placeholder="Select Project..."
                options={
                  projectTags
                    ? projectTags.data.map(({ projectId, projectName }) => ({
                        id: projectId,
                        value: projectName,
                      }))
                    : []
                }
                values={selectedProject}
                onSelect={setSelectedProject}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Question *</Label>
              <TextEditor
                placeholder="Type here..."
                value={editorContent}
                handleContent={handleContent}
              />
            </div>
            <AskQuestionAction
              title={title}
              technology={selectedTech.map((i) => i.value).join(", ")}
              Project={selectedProject.map((i) => i.value).join(", ")}
              editorContent={editorContent}
              isReviewDialogOpen={isReviewDialogOpen}
              setIsReviewDialogOpen={setIsReviewDialogOpen}
              handlePostQuestion={handlePostQuestion}
            />
          </div>
        }
      />
      {alertMessage && (
        <Alert
          title={alertType}
          type={alertType}
          description={alertMessage}
          variant="default"
          setAlertMessage={setAlertMessage}
        />
      )}
    </Header>
  );
};

export default AskQuestion;
