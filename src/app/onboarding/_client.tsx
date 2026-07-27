"use client";

import { getUser } from "@/features/users/actions";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function OnboardingClient({ userId }: { userId: string }) {
  const router = useRouter();
  useEffect(() => {
    let cancelled = false;

    const intervalId = setInterval(async () => {
      const user = await getUser(userId); // ✅ await it
      if (user == null || cancelled) return;

      clearInterval(intervalId);
      router.replace("/app");
    }, 250);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, [userId, router]);

  return <Loader2Icon className="animate-spin size-24" />;
}
