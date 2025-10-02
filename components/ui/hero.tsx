"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/data/photo";
import { SocialMedia } from "@/components/data/social-media";
import { FiDownload } from "react-icons/fi";

import TypeIt from "typeit-react";
import dynamic from "next/dynamic";

const Status = dynamic(
  () => import("@/components/data/status").then((m) => m.Status),
  { ssr: true }
);
const Academic = dynamic(
  () => import("@/components/data/academic").then((m) => m.Academic),
  { ssr: true }
);
const Experience = dynamic(
  () => import("@/components/data/experience").then((m) => m.Experience),
  { ssr: true }
);
const Project = dynamic(
  () => import("@/components/data/project").then((m) => m.Project),
  { ssr: true }
);
const TechStack = dynamic(
  () => import("@/components/data/tech-stack").then((m) => m.TechStack),
  { ssr: true }
);
const ContactMe = dynamic(
  () => import("@/components/data/contact").then((m) => m.ContactMe),
  { ssr: true }
);

export const Hero = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const updateWindowwidth = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };
    updateWindowwidth();
    window.addEventListener("resize", updateWindowwidth);
    return () => window.removeEventListener("resize", updateWindowwidth);
  }, []);

  const DesktopText =
    "A recent Informatics graduate from President University with a specialization in Artificial Intelligence. My expertise spans software development, web development, and user-centric digital design, skills honed during my tenure as the former Vice Head of the Design Division for the President University Major Association. I am a proven problem-solver with strong leadership and communication skills, dedicated to continuous learning and delivering high-quality, impactful projects.";
  const MobileText =
    "A recent Informatics graduate from President University specializing in Artificial Intelligence. Skilled in software project development, web development, and digital design, ready to create impactful digital solutions.";

  const downloadCVHandler = () => {
    try {
      setDownloading(true);

      const link = document.createElement("a");
      link.href = "/assets/CV_ZulfikarAhmadAliansyah.pdf";
      link.download = "CV_ZulfikarAhmadAliansyah.pdf";
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Downloading CV");
    } catch {
      console.error("Error downloading CV");
      toast.error("Failed to download CV");
      window.open("/assets/CV_ZulfikarAhmadAliansyah.pdf", "_blank");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      {/* About Section */}
      <section className="h-full w-full py-16">
        <div className="container mx-auto">
          {/* Hero Content */}
          <div className="flex flex-col xl:flex-row items-center justify-between xl:pb-30">
            <div className="text-center xl:text-left mt-3 xl:mt-0">
              <motion.span
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="text-xl font-bold text-foreground font-comfortaa"
              >
                Artificial Intelligence Enthusiast
              </motion.span>

              <motion.h1
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="text-3xl xl:text-4xl leading-[1.2] font-semibold mt-1 text-foreground font-comfortaa"
              >
                Hello I&apos;m <br />{" "}
                <TypeIt
                  options={{
                    strings: ["Zulfikar Ahmad Aliansyah", "Known as Fikar"],
                    startDelay: 1200,
                    loop: true,
                    speed: 200,
                    deleteSpeed: 300,
                    waitUntilVisible: true,
                    breakLines: false,
                  }}
                  className="text-heading"
                />
              </motion.h1>

              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="max-w-[500px] xl:max-w-[750px] mb-9 mt-4 text-foreground font-normal font-work-sans xl:text-justify leading-relaxed text-base xl:text-lg"
              >
                {isDesktop ? DesktopText : MobileText}
              </motion.p>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="flex flex-col xl:flex-row items-center gap-4"
              >
                <Button
                  variant="default"
                  size="lg"
                  className="flex items-center gap-2"
                  onClick={downloadCVHandler}
                  loading={downloading}
                  disabled={downloading}
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </Button>

                <div className="mb-8 xl:mb-0">
                  <SocialMedia containerStyle="flex gap-4" />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                },
              }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <Photo />
            </motion.div>
          </div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            viewport={{ once: false, amount: 0.3 }}
            className="mb-12 xl:mb-25"
          >
            <Status />
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            viewport={{ once: false, amount: 0.3 }}
            className="mb-12 xl:mb-25"
          >
            <Academic />
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            viewport={{ once: false, amount: 0.3 }}
            className="mb-8"
          >
            <Experience />
          </motion.div>

          {/* Project */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-16 xl:mb-32"
          >
            <Project />
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            viewport={{ once: false, amount: 0.3 }}
            className="mb-16 xl:mb-32"
          >
            <TechStack />
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-16 xl:mb-32"
          >
            <ContactMe />
          </motion.div>
        </div>
      </section>
    </>
  );
};
