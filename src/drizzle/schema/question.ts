import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { JobInfoTable } from "./jobInfo";

export const questionDifficulties = ["junior", "mid-level", "senior"] as const;
export type QuestionDifficulty = (typeof questionDifficulties)[number];
export const questionDifficultyEnum = pgEnum(
  "questions_question_difficulty",
  questionDifficulties,
);

export const QuestionTable = pgTable("questions", {
  id,
  jobInfoId: uuid()
    .references(() => JobInfoTable.id, { onDelete: "cascade" })
    .notNull(),
  text: varchar().notNull(),
  difficulty: questionDifficultyEnum().notNull(),
  createdAt,
  updatedAt,
});

export const questionsRelations = relations(QuestionTable, ({ one }) => ({
  user: one(JobInfoTable, {
    fields: [QuestionTable.jobInfoId],
    references: [JobInfoTable.id],
  }),
}));
