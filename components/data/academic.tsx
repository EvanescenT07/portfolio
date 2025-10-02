import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MapPin, GraduationCap } from "lucide-react";
import Image from "next/image";
import { AcademicProps } from "@/types/data-types";

export const Academic = () => {
  const universityData: AcademicProps = {
    institution: "President University",
    degree: "Bachelor Degree",
    major: "Informatics - AI Concentration",
    logo: "/assets/_logopresuniv.png",
    year: "Sep 2022 - Aug 2025 (Unofficially Graduated)",
    location: "Jababeka, Cikarang Utara",
  };

  const highschoolData: AcademicProps = {
    institution: "SMA Bintara Depok",
    degree: "High School Diploma",
    major: "Natural Science",
    logo: "/assets/_logobintaradepok.png",
    year: "Jun 2018 - Jun 2021",
    location: "Depok, Jawa Barat",
  };

  return (
    <section className="py-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl xl:text-5xl font-bold font-comfortaa text-foreground mb-4">
          Academic Journey
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-ring mx-auto rounded-full" />
        <p className="text-lg text-foreground/70 mt-6 font-work-sans max-w-2xl mx-auto">
          A timeline showcasing my academic milestones
        </p>
      </div>

      <VerticalTimeline animate={true} lineColor="currentColor">
        {/* Academic Timeline Element */}
        <VerticalTimelineElement
          contentStyle={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            border: "none",
            boxShadow: "none",
          }}
          contentArrowStyle={{
            borderRight: "7px solid var(--foreground)",
          }}
          iconStyle={{
            background: "var(--background)",
            color: "var(--foreground",
            border: "1px solid var(--foreground)",
          }}
          date={universityData.year}
          dateClassName="text-foreground font-comfortaa"
          icon={<GraduationCap />}
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <Image
                  src={universityData.logo}
                  alt={universityData.institution}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex-1 font-comfortaa">
              <h3 className="text-2xl font-bold text-foreground">
                {universityData.institution}
              </h3>
              <h4 className="text-lg font-medium text-foreground/70 mt-1">
                {universityData.degree}
              </h4>
              <p className="text-foreground">{universityData.major}</p>

              <div className="flex gap-2 mt-4 text-foreground">
                <MapPin size={18} />
                <span>{universityData.location}</span>
              </div>
            </div>
          </div>
        </VerticalTimelineElement>

        {/* Bintara */}
        <VerticalTimelineElement
          contentStyle={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            border: "none",
            boxShadow: "none",
          }}
          contentArrowStyle={{
            borderRight: "7px solid var(--foreground)",
          }}
          iconStyle={{
            background: "var(--background)",
            color: "var(--foreground",
            border: "1px solid var(--foreground)",
          }}
          date={highschoolData.year}
          dateClassName="text-foreground font-comfortaa"
          icon={<GraduationCap />}
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <Image
                  src={highschoolData.logo}
                  alt={highschoolData.institution}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain rounded-2xl"
                />
              </div>
            </div>

            <div className="flex-1 font-comfortaa">
              <h3 className="text-2xl font-bold text-foreground">
                {highschoolData.institution}
              </h3>
              <h4 className="text-lg font-medium text-foreground/70 mt-1">
                {highschoolData.degree}
              </h4>
              <p className="text-foreground">{highschoolData.major}</p>

              <div className="flex gap-2 mt-4 text-foreground">
                <MapPin size={18} />
                <span>{highschoolData.location}</span>
              </div>
            </div>
          </div>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </section>
  );
};
