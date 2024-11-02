import { relations } from "drizzle-orm";
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import {
  boolean,
  customType,
  integer,
  pgTable,
  smallint,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { User } from "lucide-react";

const customBytea = customType<{ data: Buffer }>({
  dataType() {
    return "bytea";
  },
});

export const Users = pgTable("Users", {
  userId: uuid("userId").defaultRandom().notNull().primaryKey(),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  emailId: varchar("emailId", { length: 200 }).notNull(),
  image: customBytea("image"),
  clerkUserID: text("clerkUserId").notNull(),
  imageType: varchar("imageType", { length: 200 }),
});

export const Projects = pgTable("Projects", {
  projectId: uuid("projectId").defaultRandom().notNull().primaryKey(),
  projectName: varchar("projectName", { length: 100 }).notNull(),
  createdBy: uuid("createdBy")
    .references((): AnyPgColumn => Users.userId)
    .notNull(),
  createdOn: timestamp("createdOn").notNull().defaultNow(),
  modifiedBy: uuid("modifiedBy")
    .references((): AnyPgColumn => Users.userId)
    .notNull(),
  modifiedOn: timestamp("modifiedOn")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  summary: text("summary").notNull(),
  document: text("document").notNull(),
  icon: customBytea("icon").notNull(),
  iconType: varchar("iconType", { length: 200 }).notNull(),
});

export const Technologies = pgTable("Technologies", {
  technologyId: uuid("technologyId").defaultRandom().notNull().primaryKey(),
  technology: varchar("technology", { length: 50 }).notNull(),
});

export const Questions = pgTable("Questions", {
  questionId: uuid("questionId").defaultRandom().notNull().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  question: text("question").notNull(),
  views: integer("views").notNull(),
  askedOn: timestamp("askedOn").defaultNow().notNull(),
  userId: uuid("userId")
    .references((): AnyPgColumn => Users.userId)
    .notNull(),
});

export const Answers = pgTable("Answers", {
  answerId: uuid("answerId").defaultRandom().notNull().primaryKey(),
  answer: text("answer").notNull(),
  answeredOn: timestamp("answeredOn").notNull().defaultNow(),
  userId: uuid("userId")
    .references((): AnyPgColumn => Users.userId)
    .notNull(),
  questionId: uuid("questionId")
    .references((): AnyPgColumn => Questions.questionId)
    .notNull(),
  acceptedAsBest: boolean("acceptedAsBest")
    .$default(() => false)
    .notNull(),
});

export const Comments = pgTable("Comments", {
  commentId: uuid("commentId").defaultRandom().notNull().primaryKey(),
  comment: text("comment").notNull(),
  commentedOn: timestamp("commentedOn").notNull().defaultNow(),
  userId: uuid("userId")
    .references((): AnyPgColumn => Users.userId)
    .notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  questionId: uuid("questionId").references(
    (): AnyPgColumn => Questions.questionId
  ),
  answerId: uuid("answerId").references((): AnyPgColumn => Answers.answerId),
});

export const Votes = pgTable("Votes", {
  voteId: uuid("voteId").defaultRandom().notNull().primaryKey(),
  vote: smallint("vote"),
  type: varchar("type", { length: 50 }).notNull(),
  answerId: uuid("answerId").references((): AnyPgColumn => Answers.answerId),
  questionId: uuid("questionId").references(
    (): AnyPgColumn => Questions.questionId
  ),
  userId: uuid("userId")
    .references((): AnyPgColumn => Users.userId)
    .notNull(),
});

export const Rewards = pgTable("Rewards", {
  rewardId: uuid("rewardId").defaultRandom().notNull().primaryKey(),
  score: integer("score").notNull(),
  userId: uuid("userId")
    .references((): AnyPgColumn => Users.userId)
    .notNull(),
});

export const Roles = pgTable("Roles", {
  roleId: uuid("roleId").defaultRandom().notNull().primaryKey(),
  role: varchar("role", { length: 100 }).notNull(),
});

export const UsersRoles = pgTable("UsersRoles", {
  usersRoleId: uuid("usersRoleId").defaultRandom().notNull().primaryKey(),
  userId: uuid("userId")
    .references((): AnyPgColumn => Users.userId)
    .notNull(),
  roleId: uuid("roleId")
    .references((): AnyPgColumn => Roles.roleId)
    .notNull(),
  projectId: uuid("projectId").references(
    (): AnyPgColumn => Projects.projectId
  ),
});

export const Tags = pgTable("Tags", {
  tagId: uuid("tagId").defaultRandom().notNull().primaryKey(),
  type: varchar("type", { length: 50 }).notNull(),
  tagType: varchar("tagType", { length: 50 }).notNull(),
  projectId: uuid("projectId").references(
    (): AnyPgColumn => Projects.projectId
  ),
  questionId: uuid("questionId").references(
    (): AnyPgColumn => Questions.questionId
  ),
  technologyId: uuid("technologyId").references(
    (): AnyPgColumn => Technologies.technologyId
  ),
});

export const UserTechnologies = pgTable("UserTechnologies", {
  userTechId: uuid("userTechId").defaultRandom().notNull().primaryKey(),
  userId: uuid("userId")
    .references((): AnyPgColumn => Users.userId)
    .notNull(),
  technologyId: uuid("technologyId")
    .references((): AnyPgColumn => Technologies.technologyId)
    .notNull(),
});

// relations

export const usersRelations = relations(Users, ({ one, many }) => ({
  Projects: many(Projects),
  Questions: many(Questions),
  Answers: many(Answers),
  Comments: many(Comments),
  UsersRoles: many(UsersRoles),
  Votes: many(Votes),
  UserTechnologies: many(UserTechnologies),
  Rewards: one(Rewards, {
    fields: [Users.userId],
    references: [Rewards.rewardId],
  }),
}));

export const questionsRelations = relations(Questions, ({ many, one }) => ({
  Answers: many(Answers),
  Comments: many(Comments),
  Votes: many(Votes),
  Tags: many(Tags),
  Users: one(Users, { fields: [Questions.userId], references: [Users.userId] }),
}));

export const answersRelations = relations(Answers, ({ one, many }) => ({
  Comments: many(Comments),
  Votes: many(Votes),
  Questions: one(Questions, {
    fields: [Answers.questionId],
    references: [Questions.questionId],
  }),
  Users: one(Users, { fields: [Answers.userId], references: [Users.userId] }),
}));

export const projectsRelations = relations(Projects, ({ many, one }) => ({
  Tags: many(Tags),
  UsersRoles: many(UsersRoles),
  Users: one(Users, {
    fields: [Projects.createdBy],
    references: [Users.userId],
  }),
}));

export const RolesRelations = relations(Roles, ({ many }) => ({
  UsersRoles: many(UsersRoles),
}));

export const TechnologiesRelations = relations(Technologies, ({ many }) => ({
  Tags: many(Tags),
  UserTechnologies: many(UserTechnologies),
}));

export const TagsRelations = relations(Tags, ({ one }) => ({
  Questions: one(Questions, {
    fields: [Tags.questionId],
    references: [Questions.questionId],
  }),
  Technologies: one(Technologies, {
    fields: [Tags.technologyId],
    references: [Technologies.technologyId],
  }),
  Projects: one(Projects, {
    fields: [Tags.projectId],
    references: [Projects.projectId],
  }),
}));

export const CommentsRelations = relations(Comments, ({ one }) => ({
  Answers: one(Answers, {
    fields: [Comments.answerId],
    references: [Answers.answerId],
  }),
  Questions: one(Questions, {
    fields: [Comments.questionId],
    references: [Questions.questionId],
  }),
  User: one(Users, { fields: [Comments.userId], references: [Users.userId] }),
}));

export const VotesRelations = relations(Votes, ({ one }) => ({
  Answers: one(Answers, {
    fields: [Votes.answerId],
    references: [Answers.answerId],
  }),
  Questions: one(Questions, {
    fields: [Votes.questionId],
    references: [Questions.questionId],
  }),
}));

export const UsersRolesRelations = relations(UsersRoles, ({ one }) => ({
  Users: one(Users, {
    fields: [UsersRoles.userId],
    references: [Users.userId],
  }),
  Roles: one(Roles, {
    fields: [UsersRoles.roleId],
    references: [Roles.roleId],
  }),
  Projects: one(Projects, {
    fields: [UsersRoles.projectId],
    references: [Projects.projectId],
  }),
}));

export const UserTechnologiesRelations = relations(
  UserTechnologies,
  ({ one }) => ({
    Users: one(Users, {
      fields: [UserTechnologies.userId],
      references: [Users.userId],
    }),
    Technologies: one(Technologies, {
      fields: [UserTechnologies.technologyId],
      references: [Technologies.technologyId],
    }),
  })
);
