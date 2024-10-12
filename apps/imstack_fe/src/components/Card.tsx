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
  title: string;
  description: string;
  content: ReactNode;
  action?: ReactNode;
};

const Card = ({ title, description, content, action }: CardPropsType) => {
  return (
    <SCNCard className="overflow-auto">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {action}
      </CardHeader>
      <CardContent>{content}</CardContent>
    </SCNCard>
  );
};

export default Card;
