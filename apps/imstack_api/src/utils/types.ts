export interface projects {
  projectId: string;
  projectName: string;
  summary: string;
  icon: string;
  iconType: string;
  tags: { technologyId: string; technology: string }[];
}

type ProjectWriteRoleType = {
  userRoleId: string;
  roleId: string;
  projectId: string;
  access: boolean;
};
type UserTechnologies = {
  userTechId: string;
  technologyId: string;
  hasSkill: boolean;
};

export interface UpdateUserDetailsType {
  userId: string;
  firstName: string;
  lastName: string;
  projectsWriteRole: ProjectWriteRoleType[];
  userTechnologies: UserTechnologies[];
  adminRole?: { userRoleId: string; isAdmin: boolean };
  image?: string;
}
