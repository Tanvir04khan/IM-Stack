import { NextFunction, Request, Response } from "express";
import NodeError from "../../utils/NodeError";
import {
  APIStatusCode,
  ErrorCode,
  ErrorMessage,
  ResponseStatus,
  SuccesMessage,
} from "../../utils/enums";
import { database } from "../../database/connection";
import { Users, UsersRoles, UserTechnologies } from "../../database/schema";
import { UpdateUserDetailsType } from "../../utils/types";
import { and, eq } from "drizzle-orm";
import { Roles as URoles } from "../../utils/enums";

const updateUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const {
    userId: id,
    firstName,
    lastName,
    projectsWriteRole,
    userTechnologies,
    adminRole,
    image,
  }: UpdateUserDetailsType = req.body;

  try {
    if (
      !userId ||
      !firstName ||
      !lastName ||
      !projectsWriteRole ||
      !userTechnologies
    ) {
      throw new NodeError(
        ErrorMessage.UPDATE_USER_DETAILS,
        APIStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_DATA
      );
    }

    const isUserUpdatingHisDetails = userId === id;
    let result;

    const profilePicArray = image?.split(",");
    const icon = profilePicArray
      ? Buffer.from(profilePicArray[1], "base64")
      : null;

    if (isUserUpdatingHisDetails) {
      result = await database
        .update(Users)
        .set({
          firstName,
          lastName,
          image: icon,
          imageType: profilePicArray?.length ? profilePicArray[0] : null,
        })
        .returning({ userId: Users.userId });

      //user new skills to be inserted
      const userNewTech = userTechnologies
        .filter(({ userTechId, hasSkill }) => !userTechId && hasSkill)
        .map(({ technologyId }) => ({ userId: id, technologyId }));
      if (userNewTech.length) {
        await database.insert(UserTechnologies).values(userNewTech);
      }

      //user existing skills to be deleted
      const userDeleteSkills = userTechnologies
        .filter(({ userTechId, hasSkill }) => !hasSkill && userTechId)
        .map(({ userTechId }) => eq(UserTechnologies.userTechId, userTechId));
      if (userDeleteSkills.length) {
        await database.delete(UserTechnologies).where(and(...userDeleteSkills));
      }
    } else {
      const userRoles = await database.query.Users.findFirst({
        where: (Users, { inArray }) => inArray(Users.userId, [userId]),
        columns: {},
        with: {
          UsersRoles: {
            columns: {},
            with: {
              Roles: true,
            },
          },
        },
      });

      const adminRoleIdArray = userRoles?.UsersRoles.filter(
        ({ Roles }) => Roles.role === URoles.ADMIN
      );
      const adminRoleId = adminRoleIdArray?.length
        ? adminRoleIdArray[0].Roles.roleId
        : "";

      if (adminRoleId) {
        result = await database
          .update(Users)
          .set({
            firstName,
            lastName,
            image: icon,
            imageType: profilePicArray?.length ? profilePicArray[0] : null,
          })
          .returning({ userId: Users.userId });

        if (adminRole) {
          if (!adminRole.userRoleId && adminRole.isAdmin) {
            // admin role to be inserted
            await database.insert(UsersRoles).values({
              roleId: adminRoleId,
              userId: id,
            });
          } else if (adminRole.userRoleId && !adminRole.isAdmin) {
            await database
              .delete(UsersRoles)
              .where(eq(UsersRoles.usersRoleId, adminRole.userRoleId));
          }
        }
        //user new project roles to be inserted
        const userNewRole = projectsWriteRole
          .filter(({ userRoleId, access }) => access && !userRoleId)
          .map(({ projectId, roleId }) => ({ userId: id, projectId, roleId }));
        if (userNewRole.length) {
          await database.insert(UsersRoles).values(userNewRole);
        }

        //user existing role to be deleted
        const userDeleteRoles = projectsWriteRole
          .filter(({ userRoleId, access }) => !access && userRoleId)
          .map(({ userRoleId }) => eq(UsersRoles.usersRoleId, userRoleId));
        if (userDeleteRoles.length) {
          await database.delete(UsersRoles).where(and(...userDeleteRoles));
        }

        //user new skills to be inserted
        const userNewTech = userTechnologies
          .filter(({ userTechId, hasSkill }) => !userTechId && hasSkill)
          .map(({ technologyId }) => ({ userId: id, technologyId }));
        if (userNewTech.length) {
          await database.insert(UserTechnologies).values(userNewTech);
        }

        //user existing skills to be deleted
        const userDeleteSkills = userTechnologies
          .filter(({ userTechId, hasSkill }) => !hasSkill && userTechId)
          .map(({ userTechId }) => eq(UserTechnologies.userTechId, userTechId));
        if (userDeleteSkills.length) {
          await database
            .delete(UserTechnologies)
            .where(and(...userDeleteSkills));
        }
      }
    }

    if (!result || !result.length) {
      throw new NodeError(
        ErrorMessage.UPDATE_USER_DETAILS_RES,
        APIStatusCode.FORBIDDEN,
        ErrorCode.SERVER_ERROR
      );
    }

    res.status(APIStatusCode.OK).json({
      status: ResponseStatus.SUCCESS,
      message: SuccesMessage.UPDATE_USER_DETAILS,
      data: { userId: result[0].userId },
    });
  } catch (error) {
    next(error);
  }
};

export default updateUserDetails;
