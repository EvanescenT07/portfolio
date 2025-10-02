"use client";

import { useCallback } from "react";

export function AutoScroll(listEndRef: React.RefObject<HTMLDivElement | null>) {
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      listEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    });
  }, [listEndRef]);

  const scrollToTop = useCallback(() => {
    requestAnimationFrame(() => {
      const parent = listEndRef.current?.parentElement;
      if (parent) parent.scrollTop = 0;
    });
  }, [listEndRef]);

  return { scrollToBottom, scrollToTop };
}
