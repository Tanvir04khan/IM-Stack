import React, { ReactNode } from "react";
import {
  Card as SCNCard,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CardPropsType = {
  title: ReactNode;
  description?: ReactNode;
  content: ReactNode;
  action?: ReactNode;
  titleReverse?: boolean;
  className?: string;
  onClick?: () => void;
};

const Card = ({
  title,
  description,
  content,
  action,
  titleReverse,
  className,
  onClick,
}: CardPropsType) => {
  return (
    <SCNCard
      className={"overflow-auto w-full max-w-5xl " + className}
      onClick={onClick}
    >
      <CardHeader
        className={cn("flex items-center gap-6", {
          "flex-row": !titleReverse,
          "flex-row-reverse": titleReverse,
        })}
      >
        <div className="grid gap-2 items-center justify-between w-full">
          <div className="flex flex-col gap-2 items-left justify-center">
            <CardTitle className="text-justify">{title}</CardTitle>
            {description && (
              <CardDescription className="text-justify">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
        <div>{action}</div>
      </CardHeader>
      <CardContent className="text-justify">
        {typeof content === "string" && content.length > 200
          ? `${content.slice(0, 200)}...`
          : content}
      </CardContent>
    </SCNCard>
  );
};

export default Card;
