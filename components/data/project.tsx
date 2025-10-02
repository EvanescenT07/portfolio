"use client";

import { ProjectProps } from "@/types/data-types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BsArrowRight, BsGithub } from "react-icons/bs";
import WorkSliderButton from "@/components/ui/workslider";
import {
  SiAdonisjs,
  SiDocker,
  SiFastapi,
  SiFlask,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
} from "react-icons/si";
import { GiArtificialIntelligence } from "react-icons/gi";

const projectItems: ProjectProps[] = [
  {
    id: 1,
    title: "Caffmed ",
    description:
      "An innovative web application designed to assist in detecting brain tumors utilized machine learning by analyzing user-uploaded brain X-ray images. This project leverages the power of machine learning and integrates a floating AI-powered chatbot using the OpenAI API to enhance user interaction and support.",
    image: {
      src: "/project/Caffmed.png",
      alt: "Portfolio Website Screenshot",
    },
    techStack: [
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "Flask", icon: <SiFlask /> },
      { name: "Docker", icon: <SiDocker /> },
    ],
    githubUrl: "https://github.com/EvanescenT07/caffmed",
    liveUrl: "https://caffmed.vercel.app",
  },
  {
    id: 2,
    title: "Caffmusic",
    description:
      "A web application that demonstrates machine learning capabilities for music genre classification. Built with Next.js and FastAPI, it uses a CNN model trained on the GTZAN dataset to classify audio files into 10 genres including Blues, Classical, Hip Hop, and Rock through real-time audio processing.",
    image: {
      src: "/project/Caffmusic.png",
      alt: "Portfolio Website Screenshot",
    },
    techStack: [
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "FastAPI", icon: <SiFastapi /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
    ],
    githubUrl: "https://github.com/EvanescenT07/caffmusic",
    liveUrl: "https://caffmusic.vercel.app",
  },
  {
    id: 3,
    title: "Document Summarizer",
    description:
      "A Capstone project using the IBM Granite model. This application feature can summarize documents in docx and txt formats inputted by users.",
    image: {
      src: "/project/DocsSumm.png",
      alt: "Portfolio Website Screenshot",
    },
    techStack: [
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "IBM Granite", icon: <GiArtificialIntelligence /> },
    ],
    githubUrl: "https://github.com/username/repo",
    liveUrl: "https://ibm-granite-summarization.vercel.app/",
  },
  {
    id: 4,
    title: "Warehouse Inventory Management System",
    description:
      "A Capstone project developed by a three-person as part of graduation requirements at President University, this Warehouse Inventory Management System leverages cutting-edge technology to streamline warehouse operations. It pairs a high-accuracy YOLOv11 object detection model for automated item identification with an integrated IoT framework consisting of a conveyor system , load cell sensors , and a QR code-based labeling mechanism. All data is monitored and managed through a responsive web dashboard , built to reduce human intervention and boost productivity.",
    image: {
      src: "/project/WIMS.png",
      alt: "WIMS",
    },
    techStack: [
      { name: "AdonisJS", icon: <SiAdonisjs /> },
      { name: "FastAPI", icon: <SiFastapi /> },
      { name: "mySQL", icon: <SiMysql /> },
    ],
    githubUrl: "/docs/WIMS.pdf",
    liveUrl: "https://capstone.yuel.web.id/",
  },
];

export const Project = () => {
  const [isProject, setIsProject] = useState(projectItems[0]);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsProject(projectItems[swiper.realIndex]);
  };

  return (
    <section id="projects" className="h-full w-full py-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl xl:text-5xl font-bold font-comfortaa text-foreground mb-4">
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-ring mx-auto rounded-full" />
          <p className="text-lg text-foreground/70 mt-6 font-work-sans max-w-2xl mx-auto">
            A collection of my latest work and developments.
          </p>
        </div>

        {/* Project Content - Following Hero Layout */}
        <div className="flex flex-col xl:flex-row items-center justify-between">
          {/* Left Content - Project Details */}
          <div className="w-full xl:w-[50%] text-center xl:text-left order-2 xl:order-none">
            <div className="flex flex-col gap-[20px] px-5 group">
              {/* Project Number */}
              <div className="text-8xl leading-none font-extrabold text-foreground font-work-sans transition-all duration-500">
                {String(isProject.id).padStart(2, "0")}
              </div>

              {/* Project Title */}
              <h2 className="text-2xl xl:text-4xl font-bold leading-tight hover:text-primary transition-all duration-500 capitalize font-comfortaa text-foreground">
                {isProject.title}
              </h2>

              {/* Project Description */}
              <p className="text-sm xl:text-base text-center text-foreground font-work-sans  xl:max-w-[600px] leading-relaxed md:text-justify">
                {isProject.description}
              </p>

              {/* Tech Stack */}
              <div className="flex gap-4 justify-center xl:justify-start">
                {isProject.techStack.map((tech) => (
                  <div key={tech.name}>
                    {typeof window !== "undefined" && (
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="text-2xl hover:text-primary transition-all duration-500">
                              {tech.icon}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-secondary font-bold text-md font-work-sans">
                              {tech.name}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-border" />

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center xl:justify-start">
                {isProject.liveUrl && (
                  <Link
                    href={isProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-[48px] h-[48px] rounded-full bg-primary/20 hover:bg-primary/30 flex justify-center items-center group transition-all duration-500 hover:scale-110">
                          <BsArrowRight className="text-xl text-foreground transition-all duration-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-secondary font-sm font-bold font-work-sans">
                            Demo
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                )}

                {isProject.githubUrl && (
                  <Link
                    href={isProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-[48px] h-[48px] rounded-full bg-primary/20 hover:bg-primary/30 flex justify-center items-center group transition-all duration-500 hover:scale-110">
                          <BsGithub className="text-xl text-foreground transition-all duration-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-secondary font-sm font-bold font-work-sans">
                            Github Repository
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right Content - Project Image/Slider */}
          <div className="w-full xl:w-[50%] order-1 xl:order-none mb-8 xl:mb-0">
            <div className="relative">
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                modules={[Navigation, Pagination]}
                navigation={false}
                pagination={false}
                loop={true}
                onSlideChange={handleSlideChange}
                onSwiper={(sw) => setIsProject(projectItems[sw.realIndex])}
                className="xl:h-[380px] h-[300px] rounded-xl"
              >
                {projectItems.map((item) => (
                  <SwiperSlide key={item.title}>
                    <div className="h-full relative group flex justify-center items-center bg-background/10 backdrop-blur-2xl border border-transparent shadow-xl rounded-xl overflow-hidden">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={item.id === 1}
                          quality={100}
                          className="object-cover max-w-full max-h-full"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                {/* WorkSlider Button */}
                <WorkSliderButton
                  containerStyle="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-4 z-20 w-full justify-between px-4 xl:w-max xl:justify-none xl:right-6 xl:gap-4"
                  buttonStyle="bg-primary/20 hover:bg-primary/30 backdrop-blur-md w-[40px] h-[40px] rounded-full flex justify-center items-center transition-all duration-500 hover:scale-110"
                  iconsStyle="text-foreground text-[18px]"
                />
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
