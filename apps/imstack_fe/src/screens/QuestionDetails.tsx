import Activity from "@/components/Activity";
import Button from "@/components/Button";
import Card from "@/components/Card";
import CommentCard from "@/components/CommentCard";
import Dialog from "@/components/Dialog";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Tooltip from "@/components/Tooltip";
import { AvatarIcon } from "@radix-ui/react-icons";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  MessageCircle,
  SendHorizontal,
} from "lucide-react";
import React from "react";

const questionDetails: any = {
  title: "",
  content: "",
  votes: 50,
  comments: [{ userName: "", comment: "", commentedOn: "" }],
  askedBy: {
    useId: "",
    userName: "",
    image: <AvatarIcon />,
  },
  askedOn: "20/11/2024",
  modifiedOn: "20/11/2024",
  answers: [
    {
      answer: "",
      votes: 200,
      comments: "",
    },
  ],
};

const content = `
1914 translation by H. Rackham
"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."`;

const QuestionDetails = () => {
  const comment: any[] = [];
  comment.length = 25;

  return (
    <Header>
      <Card
        title={"IM Stack setup and developers."}
        action={
          <div className="flex flex-col items-center justify-center">
            <Tooltip content="This question shows research effort; it is useful and clear">
              <ChevronUp className="w-8 h-8 text-muted-foreground hover:cursor-pointer hover:text-black" />
            </Tooltip>
            <div className="text-sm">10</div>
            <Tooltip content="This question does not show any research effort; it is unclear or not useful">
              <ChevronDown className="w-8 h-8 text-muted-foreground hover:cursor-pointer hover:text-black" />
            </Tooltip>
          </div>
        }
        content={
          <div className="w-full flex flex-col items-end justify-center gap-4">
            <div
              className="w-full"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
            <Dialog
              title="Comments"
              content={
                <div className="w-full max-h-[80vh] overflow-y-scroll hide-scrollbar flex flex-col items-center gap-2 ">
                  {[1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4].map(() => (
                    <CommentCard />
                  ))}
                </div>
              }
              action={
                <div className="w-full max-h-[20vh] fixed left-0 bottom-0 flex items-end flex-row gap-2 p-6">
                  <Input
                    className="grow"
                    placeholder="Add a comment..."
                    type="text"
                    onChange={() => {}}
                  />
                  <Button onClick={() => {}}>
                    <SendHorizontal />
                  </Button>
                </div>
              }
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <Tooltip content="Comments">
                  <MessageCircle className="w-8 h-8" />
                </Tooltip>
                <p>19</p>
              </div>
            </Dialog>
          </div>
        }
        description={
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <div className="flex gap-2">
              <p>Asked</p>
              <p>20/11/2024</p>
            </div>
            <div className="flex gap-2">
              <p>Modified</p>
              <p>20/11/2024</p>
            </div>
            <Activity Icon={Eye} name="Views" value={20} />
          </div>
        }
      />
    </Header>
  );
};

export default QuestionDetails;
