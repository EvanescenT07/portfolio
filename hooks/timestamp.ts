"use client";

import { useMemo } from "react";

export function useTimestamp(createdAt: string, now: Date) {
  return useMemo(() => {
    const date = new Date(createdAt);
    const diffms = Math.abs(now.getTime() - date.getTime());
    if (diffms < 5000) return "just now";
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }, [createdAt, now.getMinutes()]);
}
