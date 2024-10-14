import React, { ReactNode } from "react";
import {
  Card as SCNCard,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "lucide-react";

type CardPropsType = {
  title: ReactNode;
  description?: string;
  content: ReactNode;
  action?: ReactNode;
};

const Card = ({ title, description, content, action }: CardPropsType) => {
  return (
    <SCNCard className="overflow-auto w-full">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2 items-center justify-between w-full">
          <div className="flex flex-col gap-2 items-left justify-center">
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
        {action}
      </CardHeader>
      <CardContent>{content}</CardContent>
    </SCNCard>
  );
};

export default Card;
