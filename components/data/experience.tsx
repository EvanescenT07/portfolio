"use client";

import { useState } from "react";
import { CareerProps } from "@/types/data-types";
import { Card, CardContent } from "@/components/ui/card";
import { ExperienceModal } from "@/components/overlay/experience-modal";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  ArrowRight,
  BriefcaseIcon,
  Building2Icon,
  Calendar,
} from "lucide-react";

export const Experience = () => {
  const [selectedExperience, setSelectedExperience] =
    useState<CareerProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const CareerData: CareerProps[] = [
    {
      logo: "/assets/_logosmbci.png",
      href: "https://www.smbc.co.id/",
      status: "Internship",
      company: "PT Bank SMBC Indonesia Tbk",
      position: "System Administration Management Intern",
      division: "SAM Division",
      period: "Feb 2025 - Present",
      location: "South Jakarta",
      description:
        "As a proactive member of an Agile team, I was deeply involved in the entire software development lifecycle, from sprint planning to final release. I played a key role in shaping our product's direction by authoring over 20 user stories and backlog items, which directly led to new feature releases. Working in close support of the Product Owner, I helped prioritize development efforts and ensured features aligned with user requirements by executing detailed User Acceptance Testing (UAT). To support the team's long-term success, I also developed more than 7 technical documents for internal applications and actively contributed to initiatives that improved our overall team culture and processes.",
    },
    {
      logo: "/assets/_logobsi.png",
      href: "https://www.bsi.co.id/",
      status: "Internship",
      company: "PT Berlian Sistem Informasi",
      position: "CX System Development Intern",
      division: "DMA Division",
      period: "Aug 2024 - Januari 2025",
      location: "East Jakarta",
      description:
        "As a CX System Development Intern, I contributed to key projects that improved data integrity and team efficiency. I helped establish a centralized Source of Truth database to reduce inconsistencies and played a significant role in developing a Docusaurus-based internal guidance system, using Azure DevOps with Git for team collaboration. By applying Agile practices, I directly contributed to the team achieving an 87% development efficiency rate. I also supported product quality by creating 15+ UAT scenarios, documenting insights from over 10 brainstorming sessions, and participating in 20+ cross-functional meetings to ensure stakeholder alignment",
    },
    {
      logo: "/assets/_logopuma.png",
      href: "https://www.instagram.com/itpresuniv/",
      status: "Organization",
      company: "PUMA Informatics",
      position: "Vice Head of Communication & Design Division",
      division: "Design Division",
      period: "Dec 2023 - Dec 2024",
      location: "President University",
      description:
        "As Vice of the Design Division, I led and mentored a team of 3+ members, managing task delegation and deliverable reviews to consistently meet deadlines and quality standards. I established and maintained the organization's brand identity by designing the official PUMA logo and creating all visual content for social media, which improved channel consistency and visibility. My hands-on work also included producing print assets like the wall magazine and contributing to the full production of the company profile video, from storyboarding through post-production.",
    },
  ];

  const openModal = (data: CareerProps) => {
    setSelectedExperience(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
  };

  return (
    <>
      <section id="experience">
        <div className="text-center mb-16">
          <h2 className="text-4xl xl:text-5xl font-bold font-comfortaa text-foreground mb-4">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-ring mx-auto rounded-full" />
          <p className="text-lg text-foreground/70 mt-6 font-work-sans max-w-2xl mx-auto">
            Showcasing my professional milestones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
          {/* Experience Data */}
          {CareerData.map((data, index) => (
            <div
              key={index}
              onClick={() => openModal(data)}
              className="group transition-all cursor-pointer hover:scale-[1.01] duration-500"
            >
              <Card className="bg-background/10 backdrop-blur-2xl border border-transparent shadow-xl hover:shadow-2xl ">
                <CardContent className="p-6">
                  {/* Badge */}
                  <Badge
                    variant={
                      data.status === "Fulltime" || data.status === "Full time"
                        ? "fulltime"
                        : data.status === "Contract"
                        ? "fulltime"
                        : data.status === "Internship"
                        ? "internship"
                        : "organization"
                    }
                    className="absolute top-4 right-4 text-xs z-10 font-work-sans"
                  >
                    {data.status}
                  </Badge>

                  {/* Logo */}
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-transparent p-4 mx-auto md:mx-0">
                    <Image
                      src={data.logo}
                      alt={data.company}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4 text-center md:text-left mt-4">
                    {/* Company Name */}
                    <div className="font-work-sans">
                      <h2 className="text-2xl font-bold font-comfortaa text-foreground group-hover:text-primary transition-colors duration-500">
                        {data.company}
                      </h2>
                      <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                        <BriefcaseIcon className="w-4 h-4 text-foreground/70" />
                        <p className="text-sm text-foreground">
                          {data.position}
                        </p>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                        <Building2Icon className="w-4 h-4 text-foreground/70" />
                        <p className="text-sm text-foreground">
                          {data.division}
                        </p>
                      </div>
                    </div>

                    {/* Period and Location */}
                    <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                      <div className="flex items-center gap-2 text-foreground/70 font-work-sans">
                        <Calendar className="w-4 h-4 text-foreground" />
                        {data.period.includes("Present") ? (
                          <span className="text-sm text-foreground">
                            {data.period.split("Present")[0]}
                            <span className="text-foreground text-blink">
                              Present
                            </span>
                            {data.period.split("Present")[1] || ""}
                          </span>
                        ) : (
                          <span className="text-foreground text-sm">
                            {data.period}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Open Modal */}
                  <div className="flex w-full items-center justify-center md:justify-start space-x-2 text-center md:text-left text-foreground/70 group-hover:text-primary transition-colors duration-500 mt-4">
                    <span className="text-xs ">Click to see more details</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Modal */}
      <ExperienceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={selectedExperience}
      />
    </>
  );
};
