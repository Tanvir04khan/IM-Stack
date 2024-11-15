import Button from "@/components/Button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import ProjectTitle from "@/components/ProjectTitle";
import Table from "@/components/Table";
import { Input } from "@/components/ui/input";
import { Paths, QueryKeys, UsersColumn } from "@/enum";
import {
  ResponseType,
  RUsersType,
  RUserType,
  TableColumnsType,
  UsersRowsType,
} from "@/type";
import React from "react";
import userAvatar from "../images/authpageimage.png";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { customFetch, getUser } from "@/utilts";
import ProfileCard from "@/components/ProfileCard";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { user } = useUser();
  const { data: userData, isFetching: isUserLoading } = useQuery<
    ResponseType<RUserType>
  >({
    queryKey: [QueryKeys.GET_USER, user?.id],
    queryFn: () => getUser(user ? user.id : ""),
  });
  const { data: usersData, isFetching: isLoadingUsersData } = useQuery<
    ResponseType<RUsersType[]>
  >({ queryKey: [QueryKeys.GET_USERS], queryFn: getUsers });

  async function getUsers(): Promise<ResponseType<RUsersType[]>> {
    const data = await customFetch(
      `${Paths.GET_USERS}/${userData?.data.userId}`
    );
    return data;
  }
  const hasAdminRole = userData?.data.UsersRoles.some(
    ({ Roles }) => Roles.role === "Admin"
  );
  const users: UsersRowsType[] = usersData
    ? usersData?.data.map(
        ({ userId, firstName, lastName, emailId, image, joinedOn }) => ({
          userName: (
            <ProfileCard
              ProjectName={`${firstName} ${lastName}`}
              imageSrc={image}
            />
          ),
          email: emailId,
          userId,
          joinedOn: joinedOn.split("T")[0],
          onClick: () => {
            navigation({ from: "/manageusers", to: `/manageusers/${userId}` });
          },
        })
      )
    : [];

  return (
    <Header isLoading={isUserLoading || isLoadingUsersData}>
      {!isUserLoading && !isLoadingUsersData ? (
        hasAdminRole ? (
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
        ) : (
          <h1>You don't have the admin role.</h1>
        )
      ) : (
        <Skeleton className="max-w-5xl w-full h-[50vh]" />
      )}
    </Header>
  );
};

export default ManageUsers;
