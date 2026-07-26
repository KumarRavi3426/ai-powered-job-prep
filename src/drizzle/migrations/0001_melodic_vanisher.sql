CREATE TYPE "public"."job_infos_experience_level" AS ENUM('junior', 'mid-level', 'senior');--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "difficulty" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."questions_question_difficulty";--> statement-breakpoint
CREATE TYPE "public"."questions_question_difficulty" AS ENUM('easy', 'medium', 'hard');--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "difficulty" SET DATA TYPE "public"."questions_question_difficulty" USING "difficulty"::"public"."questions_question_difficulty";--> statement-breakpoint
ALTER TABLE "job_info" ALTER COLUMN "experienceLevel" SET DATA TYPE "public"."job_infos_experience_level" USING "experienceLevel"::text::"public"."job_infos_experience_level";--> statement-breakpoint
DROP TYPE "public"."job_info_experience_level";