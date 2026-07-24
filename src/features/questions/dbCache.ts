import { getGlobalTag, getIdTag, getJobInfoTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";

export function getQuestionGlobalTag() {
  return getGlobalTag("questions");
}

export function getQuestionJobInfoTag(jobInfoId: string) {
  return getJobInfoTag("questions", jobInfoId);
}

export function getQuestionIdTag(id: string) {
  return getIdTag("questions", id);
}

export function revalidateQuestionCache({
  id,
  jobInfoId,
}: {
  id: string;
  jobInfoId: string;
}) {
  // @ts-ignore
  revalidateTag(getQuestionGlobalTag());
  // @ts-ignore
  revalidateTag(getQuestionJobInfoTag(jobInfoId));
  // @ts-ignore
  revalidateTag(getQuestionIdTag(id));
}
