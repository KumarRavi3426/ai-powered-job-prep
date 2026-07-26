import { getGlobalTag, getIdTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";

export function getUserGlobalTag() {
  return getGlobalTag("users");
}

export function getUserIdTag(id: string) {
  return getIdTag("users", id);
}

export function revalidateUserCache(id: string) {
  // @ts-ignore: Next.js revalidateTag typings may differ; ignore to allow runtime call
  revalidateTag(getUserGlobalTag(), "max");
  // @ts-ignore: Next.js revalidateTag typings may differ; ignore to allow runtime call
  revalidateTag(getUserIdTag(id), "max");
}
