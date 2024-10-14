import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useNavigate } from "@tanstack/react-router";

type ProjectCardPropsType = {
  image: string;
  name: string;
  id: string;
};

const ProjectCard = ({ image, name, id = "TEST" }: ProjectCardPropsType) => {
  const navigation = useNavigate();

  return (
    <Card
      className="flex flex-col items-center justify-center h-48 w-48 hover:shadow-lg duration-100 cursor-pointer"
      onClick={() =>
        navigation({ from: "/projectdocs", to: `/projectdocs/${id}` })
      }
    >
      <CardHeader>
        <img className="w-20 h-20 rounded-full" src={image} />
      </CardHeader>
      <CardContent className="text-lg font-semibold">{name}</CardContent>
    </Card>
  );
};

export default ProjectCard;
