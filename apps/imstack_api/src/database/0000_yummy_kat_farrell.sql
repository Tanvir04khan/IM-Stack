CREATE TABLE IF NOT EXISTS "Answers" (
	"answerId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"answer" text NOT NULL,
	"answeredOn" timestamp DEFAULT now() NOT NULL,
	"userId" uuid NOT NULL,
	"questionId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Comments" (
	"commentId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"comment" text NOT NULL,
	"commentedOn" timestamp DEFAULT now() NOT NULL,
	"userId" uuid NOT NULL,
	"type" varchar(50) NOT NULL,
	"questionId" uuid NOT NULL,
	"answerId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Projects" (
	"projectId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectName" varchar(100) NOT NULL,
	"createdBy" uuid NOT NULL,
	"createdOn" timestamp DEFAULT now() NOT NULL,
	"modifiedBy" uuid NOT NULL,
	"modifiedOn" timestamp DEFAULT now() NOT NULL,
	"summary" text NOT NULL,
	"document" "bytea" NOT NULL,
	"icon" "bytea" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Questions" (
	"questionId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(500) NOT NULL,
	"question" text NOT NULL,
	"views" integer NOT NULL,
	"askedOn" timestamp DEFAULT now() NOT NULL,
	"userId" uuid NOT NULL,
	"type" varchar(50) NOT NULL,
	"projectId" uuid,
	"technologyId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Rewards" (
	"rewardId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"score" integer NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Roles" (
	"roleId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Technologies" (
	"technologyId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"technology" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"userId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firstName" varchar(100) NOT NULL,
	"lastName" varchar(100) NOT NULL,
	"emailId" varchar(200) NOT NULL,
	"password" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UsersRoles" (
	"usersRoleId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"roleId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Votes" (
	"voteId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"answerId" uuid NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Answers" ADD CONSTRAINT "Answers_userId_Users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Answers" ADD CONSTRAINT "Answers_questionId_Questions_questionId_fk" FOREIGN KEY ("questionId") REFERENCES "public"."Questions"("questionId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_Users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comments" ADD CONSTRAINT "Comments_questionId_Questions_questionId_fk" FOREIGN KEY ("questionId") REFERENCES "public"."Questions"("questionId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comments" ADD CONSTRAINT "Comments_answerId_Answers_answerId_fk" FOREIGN KEY ("answerId") REFERENCES "public"."Answers"("answerId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Projects" ADD CONSTRAINT "Projects_createdBy_Users_userId_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."Users"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Projects" ADD CONSTRAINT "Projects_modifiedBy_Users_userId_fk" FOREIGN KEY ("modifiedBy") REFERENCES "public"."Users"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Questions" ADD CONSTRAINT "Questions_userId_Users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Questions" ADD CONSTRAINT "Questions_projectId_Projects_projectId_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Projects"("projectId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Questions" ADD CONSTRAINT "Questions_technologyId_Technologies_technologyId_fk" FOREIGN KEY ("technologyId") REFERENCES "public"."Technologies"("technologyId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Rewards" ADD CONSTRAINT "Rewards_userId_Users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UsersRoles" ADD CONSTRAINT "UsersRoles_userId_Users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UsersRoles" ADD CONSTRAINT "UsersRoles_roleId_Roles_roleId_fk" FOREIGN KEY ("roleId") REFERENCES "public"."Roles"("roleId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Votes" ADD CONSTRAINT "Votes_answerId_Answers_answerId_fk" FOREIGN KEY ("answerId") REFERENCES "public"."Answers"("answerId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Votes" ADD CONSTRAINT "Votes_userId_Users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
