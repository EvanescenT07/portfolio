"use client";

import { useEffect, useState } from "react";

import { StatusProps } from "@/types/data-types";
import { useRef } from "react";
import CountUp from "react-countup";

export const Status = () => {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // Track if animation has run
  const sectionRef = useRef(null);

  const Stats: StatusProps[] = [
    {
      title: "Grade Point Average",
      count: 3.77,
    },
    {
      title: "Work Projects",
      count: 10,
    },
    {
      title: "Technologies Used",
      count: 30,
    },
    {
      title: "Code Commits",
      count: 162,
    },
  ];

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div>
        <div className="flex flex-wrap items-center gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {Stats.map((item) => {
            return (
              <div
                key={item.title}
                className="flex-1 flex gap-4 items-center justify-center"
              >
                {(isInView || hasAnimated) && (
                  <CountUp
                    start={0}
                    redraw={false}
                    decimal="."
                    end={item.count}
                    duration={10}
                    delay={0}
                    {...(item.title === "Grade Point Average"
                      ? { decimals: 2 }
                      : {})}
                    className="text-4xl xl:text-6xl font-bold font-work-sans text-foreground"
                  />
                )}
                <p
                  className={`${
                    item.title.length < 15 ? "max-w-[120px]" : "max-w-[150px]"
                  } leading-snug text-foreground text-sm xl:text-xl font-work-sans font-medium`}
                >
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
