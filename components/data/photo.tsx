"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const Photo = () => {
  return (
    <div className="w-full h-full relative items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2, duration: 0.4, ease: "easeIn" },
        }}
      >
        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeInOut" },
          }}
          className="w-[312px] h-[312px] xl:w-[418px] xl:h-[418px] absolute"
        >
          <Image
            src="/assets/profile.png"
            priority
            quality={100}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="fikar.dev"
            className="object-contain rounded-full mix-blend-lighten"
          />
        </motion.div>

        {/* Border Profile Picture */}
        <motion.svg
          className="w-[312px] h-[312px] xl:w-[418px] xl:h-[418px]"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            stroke="#4299e1"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{
              strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
              rotate: [120, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

