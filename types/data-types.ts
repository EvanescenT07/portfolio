import { JSX } from "react";

export interface SocialMediaProps {
  containerStyle?: string;
  iconStyle?: string;
}

export interface StatusProps {
  title: string;
  count: number;
}

export interface AcademicProps {
  institution: string;
  degree: string;
  major: string;
  logo: string;
  year: string;
  location: string;
}

export interface ExperienceProps {
  logo: string;
  href: string;
  company: string;
  position: string;
  division: string;
  period: string;
  location: string;
}

export interface CareerProps {
  logo: string;
  href: string;
  status: string;
  company: string;
  position: string;
  division: string;
  period: string;
  location: string;
  description?: string;
}

export interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CareerProps | null;
}

export interface TechStackProps {
  name: string;
  icon: JSX.Element;
}

export interface ProjectProps {
  id: number;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  techStack: TechStackProps[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface TechnStackProps {
  SkillList: {
    id: number;
    icon: React.ReactNode;
    name: string;
  }[];
}

export interface ContactProps {
  icon: JSX.Element;
  title: string;
  value: string;
}
