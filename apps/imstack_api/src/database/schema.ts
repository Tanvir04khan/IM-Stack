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
  image: customBytea("image").notNull(),
  clerkUserID: text("clerkUserId").notNull(),
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
  document: customBytea("document").notNull(),
  icon: customBytea("icon").notNull(),
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
  questionId: uuid("questionId")
    .references((): AnyPgColumn => Questions.questionId)
    .notNull(),
  answerId: uuid("answerId")
    .references((): AnyPgColumn => Answers.answerId)
    .notNull(),
});

export const Votes = pgTable("Votes", {
  voteId: uuid("voteId").defaultRandom().notNull().primaryKey(),
  vote: smallint("vote"),
  type: varchar("type", { length: 50 }).notNull(),
  answerId: uuid("answerId")
    .references((): AnyPgColumn => Answers.answerId)
    .notNull(),
  questionId: uuid("questionId")
    .references((): AnyPgColumn => Questions.questionId)
    .notNull(),
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
  projectId: uuid("projectId")
    .references((): AnyPgColumn => Projects.projectId)
    .notNull(),
  questionId: uuid("questionId")
    .references((): AnyPgColumn => Questions.questionId)
    .notNull(),
  technologyId: uuid("technologyId")
    .references((): AnyPgColumn => Technologies.technologyId)
    .notNull(),
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

export const questionsRelations = relations(Questions, ({ many }) => ({
  Answers: many(Answers),
  Comments: many(Comments),
  Votes: many(Votes),
  Tags: many(Tags),
}));

export const answersRelations = relations(Answers, ({ one, many }) => ({
  Comments: many(Comments),
  Votes: one(Votes, { fields: [Answers.answerId], references: [Votes.voteId] }),
}));

export const projectsRelations = relations(Projects, ({ many }) => ({
  Tags: many(Tags),
  UsersRoles: many(UsersRoles),
}));

export const RolesRelations = relations(UsersRoles, ({ many }) => ({
  UsersRoles: many(UsersRoles),
}));

export const TechnologiesRelations = relations(Technologies, ({ many }) => ({
  Tags: many(Tags),
  UserTechnologies: many(UserTechnologies),
}));
