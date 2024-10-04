import { relations } from "drizzle-orm";
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import {
  customType,
  integer,
  pgTable,
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
  password: text("password").notNull(),
  projects: uuid("projects").array(),
  roles: uuid("roles").array().notNull(),
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
  type: varchar("type", { length: 50 }).notNull(),
  projectId: uuid("projectId").references(
    (): AnyPgColumn => Projects.projectId,
    { onDelete: "cascade" }
  ),
  technologyId: uuid("technologyId").references(
    (): AnyPgColumn => Technologies.technologyId,
    { onDelete: "cascade" }
  ),
});

export const Answers = pgTable("Answers", {
  answerId: uuid("answerId").defaultRandom().notNull().primaryKey(),
  answer: text("answer").notNull(),
  answeredOn: timestamp("answeredOn").notNull().defaultNow(),
  userId: uuid("userID")
    .references((): AnyPgColumn => Users.userId)
    .notNull(),
  questionId: uuid("questionId")
    .references((): AnyPgColumn => Questions.questionId)
    .notNull(),
});

export const Comments = pgTable("Comments", {
  commentId: uuid("commentId").defaultRandom().notNull().primaryKey(),
  comment: text("comment").notNull(),
  commentedOn: timestamp("commentedOn").notNull().defaultNow(),
  userId: uuid("userID")
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
  voteCount: integer("voteCount").notNull(),
  maxVoteCount: integer("maxVoteCount").notNull(),
  answerId: uuid("answerId")
    .references((): AnyPgColumn => Answers.answerId)
    .notNull(),
  usersId: uuid("usersId").array(),
});

export const Awards = pgTable("Awards", {
  awardId: uuid("awardId").defaultRandom().notNull().primaryKey(),
  score: integer("score").notNull(),
  userId: uuid("userID")
    .references((): AnyPgColumn => Users.userId)
    .notNull(),
});

export const Roles = pgTable("Roles", {
  roleId: uuid("roleId").defaultRandom().notNull().primaryKey(),
  role: varchar("role", { length: 50 }).notNull(),
});

// relations

export const usersRelations = relations(Users, ({ one, many }) => ({
  Projects: many(Projects),
  Questions: many(Questions),
  Answers: many(Answers),
  Comments: many(Comments),
  Awards: one(Awards, { fields: [Users.userId], references: [Awards.awardId] }),
}));

export const questionsRelations = relations(Questions, ({ many }) => ({
  Answers: many(Answers),
  Comments: many(Comments),
}));

export const answersRelations = relations(Answers, ({ one, many }) => ({
  Comments: many(Comments),
  Votes: one(Votes, { fields: [Answers.answerId], references: [Votes.voteId] }),
}));

export const projectsRelations = relations(Projects, ({ many }) => ({
  Questions: many(Questions),
}));

export const TechnologiesRelations = relations(Technologies, ({ many }) => ({
  Questions: many(Questions),
}));
