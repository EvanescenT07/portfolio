"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { NavbarProps } from "@/types/component-types";
import { ThemeToggle } from "@/components/theme/theme-toogle";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function NavbarComponent({ items, className }: NavbarProps) {
  // Helpers
  const getIdFromUrl = (url: string) =>
    url.startsWith("#") ? url.slice(1) : url.replace(/^\//, "");

  const defaultActive = items?.[0]?.name ?? "Home";

  const [activeTabs, setActiveTabs] = useState(defaultActive);

  // Smooth scroll function
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Initialize active tab from hash or visible section before first paint
  useLayoutEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const byHash = items.find((it) => getIdFromUrl(it.url) === hash)?.name;
    if (byHash) {
      setActiveTabs(byHash);
      return;
    }
    const scrollY = window.scrollY;
    let current = defaultActive;

    for (const item of items) {
      const id = getIdFromUrl(item.url);
      const el = document.getElementById(id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const top = scrollY + rect.top;
      const bottom = top + rect.height;

      if (scrollY >= top - 300 && scrollY < bottom - 100) {
        current = item.name;
        break;
      }
    }

    setActiveTabs(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // Enhanced scroll spy (keeps animation smooth)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let currentSection = activeTabs; // retain current if none is clearly active

      items.forEach((item) => {
        const id = getIdFromUrl(item.url);
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;
          const elementBottom = elementTop + rect.height;

          if (scrollY >= elementTop - 300 && scrollY < elementBottom - 100) {
            currentSection = item.name;
          }
        }
      });

      if (currentSection !== activeTabs) {
        setActiveTabs(currentSection);
      }
    };

    // Initial check
    handleScroll();

    // Throttle with rAF
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [items, activeTabs]);

  const ActiveTabsHandler = (name: string, url: string) => {
    setActiveTabs(name);

    if (url.startsWith("#")) {
      const elementId = url.slice(1);
      smoothScrollTo(elementId);
    } else if (url.startsWith("/")) {
      window.location.href = url;
    } else {
      smoothScrollTo(url);
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className
      )}
    >
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3 bg-foreground/5 border border-background/5 dark:border-background/5 backdrop-blur-sm p-2 rounded-full shadow-2xl">
          {items.map((item) => {
            const Icons = item.icon;
            const isActive = activeTabs === item.name;

            return (
              <button
                key={item.name}
                onClick={() => ActiveTabsHandler(item.name, item.url)}
                className={cn(
                  "relative flex items-center justify-center p-2 rounded-full font-work-sans font-semibold text-sm transition-all duration-300 leading-relaxed cursor-pointer",
                  isActive
                    ? "bg-primary/10 text-primary backdrop-blur-sm shadow-xl scale-110"
                    : "hover:bg-black/20 dark:hover:bg-white/20 text-foreground hover:scale-105"
                )}
              >
                <span className="hidden md:inline px-2">{item.name}</span>
                <span className="md:hidden">
                  <Icons size={18} strokeWidth={2.5} />
                </span>

                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                      <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3 bg-foreground/5 border border-background/5 dark:border-background/5 backdrop-blur-md p-2 rounded-full shadow-2xl">
          <ThemeToggle className="ml-auto" />
        </div>
      </div>
    </div>
  );
}
