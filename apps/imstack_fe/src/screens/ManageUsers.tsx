import Button from "@/components/Button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import ProjectTitle from "@/components/ProjectTitle";
import Table from "@/components/Table";
import { Input } from "@/components/ui/input";
import { UsersColumn } from "@/enum";
import { TableColumnsType, UsersRowsType } from "@/type";
import React from "react";
import userAvatar from "../images/authpageimage.png";
import { useNavigate } from "@tanstack/react-router";

const usersColumns: TableColumnsType[] = [
  {
    field: UsersColumn.USERNAME,
    title: "User Name",
    textAlignment: "left",
  },
  {
    field: UsersColumn.EMAIL,
    title: "Email",
    textAlignment: "left",
  },
  {
    field: UsersColumn.JOINEDON,
    title: "Joined On",
    textAlignment: "left",
  },
];

const ManageUsers = () => {
  const navigation = useNavigate();
  const users: UsersRowsType[] = [
    {
      userName: (
        <ProjectTitle imageSrc={userAvatar} ProjectName="Tanvir Khan" />
      ),
      email: "Test@test.com",
      joinedOn: "24-03-2024",
      onClick: function (item) {
        navigation({ from: "/manageusers", to: `/manageusers/${item.userId}` });
      },
      userId: "test",
    },
    {
      userName: (
        <ProjectTitle imageSrc={userAvatar} ProjectName="Tanvir Khan" />
      ),
      email: "Test@test.com",
      joinedOn: "24-03-2024",
      onClick: function (item) {
        navigation({ from: "/manageusers", to: `/manageusers/${item.userId}` });
      },
      userId: "test",
    },
    {
      userName: (
        <ProjectTitle imageSrc={userAvatar} ProjectName="Tanvir Khan" />
      ),
      email: "Test@test.com",
      joinedOn: "24-03-2024",
      onClick: function (item) {
        navigation({ from: "/manageusers", to: `/manageusers/${item.userId}` });
      },
      userId: "test",
    },
    {
      userName: (
        <ProjectTitle imageSrc={userAvatar} ProjectName="Tanvir Khan" />
      ),
      email: "Test@test.com",
      joinedOn: "24-03-2024",
      onClick: function (item) {
        navigation({ from: "/manageusers", to: `/manageusers/${item.userId}` });
      },
      userId: "test",
    },
    {
      userName: (
        <ProjectTitle imageSrc={userAvatar} ProjectName="Tanvir Khan" />
      ),
      email: "Test@test.com",
      joinedOn: "24-03-2024",
      onClick: function (item) {
        navigation({ from: "/manageusers", to: `/manageusers/${item.userId}` });
      },
      userId: "test",
    },
    {
      userName: (
        <ProjectTitle imageSrc={userAvatar} ProjectName="Tanvir Khan" />
      ),
      email: "Test@test.com",
      joinedOn: "24-03-2024",
      onClick: function (item) {
        navigation({ from: "/manageusers", to: `/manageusers/${item.userId}` });
      },
      userId: "test",
    },
    {
      userName: (
        <ProjectTitle imageSrc={userAvatar} ProjectName="Tanvir Khan" />
      ),
      email: "Test@test.com",
      joinedOn: "24-03-2024",
      onClick: function (item) {
        navigation({ from: "/manageusers", to: `/manageusers/${item.userId}` });
      },
      userId: "test",
    },
  ];
  return (
    <Header>
      <div className="w-full max-w-5xl grid gap-4">
        <div className="w-full flex flex-row items-center justify-between">
          <Input
            placeholder="Search users..."
            onChange={(event) => {}}
            className="max-w-sm"
          />
        </div>
        <Card
          title={"All users"}
          content={<Table columns={usersColumns} rows={users} />}
        />
      </div>
    </Header>
  );
};

export default ManageUsers;
