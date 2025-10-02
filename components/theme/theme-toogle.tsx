"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggleProps } from "@/types/theme-types";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  const ThemeToggleHandler = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const KeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      ThemeToggleHandler();
    }
  };

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-16 h-8 rounded-full bg-gray-200 dark:bg-gray-700",
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-500 space-y-4",
        "backdrop-blur-xl border",
        isDark
          ? "bg-black/20 border-white/10"
          : "bg-background/20 border-black/5 shadow-2xl",
        className
      )}
      onClick={ThemeToggleHandler}
      tabIndex={0}
      onKeyDown={KeyDownHandler}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      role="button"
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-all duration-500",
            isDark
              ? "transform translate-x-0 backdrop-blur-sm border bg-background/10 border-white/20 shadow-lg"
              : "transform translate-x-8 bg-transparent"
          )}
        >
          <Moon
            className={cn(
              "w-4 h-4",
              isDark ? "text-foreground" : "text-black/30"
            )}
            strokeWidth={2}
          />
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-500",
            isDark
              ? "bg-transparent"
              : "transform -translate-x-8 backdrop-blur-sm border bg-black/10 border-black/20 shadow-lg"
          )}
        >
          <Sun
            className={cn(
              "w-4 h-4",
              isDark ? "text-foreground/30" : "text-black"
            )}
            strokeWidth={2}
          />
        </div>
      </div>
    </div>
  );
}
