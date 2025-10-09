"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { BsChevronDoubleDown } from "react-icons/bs";
import dayjs from "dayjs";
import TypeIt from "typeit-react";

// Floating particles component
const FloatingParticles = () => {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 1 + "px",
            height: Math.random() * 4 + 1 + "px",
            background:
              theme === "dark"
                ? `hsl(${Math.random() * 60 + 200}, 70%, ${
                    Math.random() * 30 + 50
                  }%)`
                : "rgba(0, 0, 0, 0.8)",
            opacity: Math.random() * 0.6 + 0.3,
          }}
          initial={{
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1000),
            y:
              Math.random() *
              (typeof window !== "undefined" ? window.innerHeight : 1000),
            scale: 0,
            rotate: 0,
          }}
          animate={{
            x: [
              Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1000),
              Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1000),
              Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1000),
            ],
            y: [
              Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 1000),
              Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 1000),
              Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 1000),
            ],
            scale: [0, 1, 0.8, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export const Greeting = () => {
  const [opacity, setOpacity] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [greeting, setGreeting] = useState<string[]>(getGreeting());

  function getGreeting(): string[] {
    const hour = dayjs().hour();

    if (hour >= 5 && hour < 12) {
      return [
        "Good Morning!", // English
        "Guten Morgen!", // German
        "Goedemorgen!", // Dutch
        "Bonjour!", // French
        "¡Buenos días!", // Spanish
        "Selamat Pagi!", // Indonesian
        "おはようございます", // Japanese
        "좋은 아침입니다", // Korean
        "صباح الخير", // Arabic
        "早上好", // Mandarin
      ];
    } else if (hour >= 12 && hour < 18) {
      return [
        "Good Afternoon!", // English
        "Guten Tag!", // German
        "Goedemiddag!", // Dutch
        "Bon après-midi!", // French
        "¡Buenas tardes!", // Spanish
        "Selamat Siang!", // Indonesian
        "こんにちは", // Japanese
        "좋은 오후입니다", // Korean
        "مساء الخير", // Arabic
        "下午好", // Mandarin
      ];
    } else {
      return [
        "Good Evening!", // English
        "Guten Abend!", // German
        "Goedenavond!", // Dutch
        "Bonsoir!", // French
        "¡Buenas noches!", // Spanish
        "Selamat Malam!", // Indonesian
        "こんばんは", // Japanese
        "좋은 저녁입니다", // Korean
        "مساء الخير", // Arabic
        "晚上好", // Mandarin
      ];
    }
  }

  useEffect(() => {
    setGreeting(getGreeting());
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Make the transition smoother by adjusting the calculation
      const newOpacity = Math.max(0, 1 - currentScrollY / 400);
      setOpacity(newOpacity);

      // Only hide completely when fully scrolled
      if (currentScrollY > 500) {
        // Give more buffer before hiding
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible && opacity <= 0) return null;

  return (
    <motion.div
      className="fixed inset-0 flex flex-col gradient-background items-center justify-center transition-all duration-500"
      style={{
        zIndex: opacity > 0.5 ? 40 : 10,
        opacity: opacity,
        pointerEvents: opacity < 0.2 ? "none" : "auto",
      }}
    >
      <FloatingParticles />
      <div className="text-center px-6 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold font-comfortaa text-heading mb-4"
        >
          <TypeIt
            key={greeting.join(",")}
            options={{
              strings: [...greeting],
              speed: 150,
              waitUntilVisible: true,
              loop: true,
              breakLines: false,
              deleteSpeed: 75,
                
            }}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-foreground font-work-sans max-w-2xl mx-auto my-5"
        >
          Welcome to my Portfolio Website
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.5,
            delay: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            repeatDelay: 0.8,
          }}
          className="group mt-[100px]"
        >
          <div className="bg-blue-default/20 dark:bg-blue-dark/20 rounded-full px-6 py-3 shadow-lg transition-all duration-300 group-hover:shadow-blue-hover/20 group-hover:translate-y-1">
            <p className="text-foreground text-sm md:text-base font-medium">
              Scroll Below
            </p>
            <BsChevronDoubleDown className="mx-auto text-2xl text-foreground mt-2" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
