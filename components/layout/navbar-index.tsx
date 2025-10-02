"use client";

import { HomeIcon, Mail, FolderGit2, BriefcaseIcon, CodeXmlIcon } from "lucide-react";
import { NavbarComponent } from "@/components/layout/navigation-bar";

export function Navbar() {
  const NavItems = [
    { name: "Home", url: "#home", icon: HomeIcon },
    { name: "Experience", url: "#experience", icon: BriefcaseIcon },
    { name: "Projects", url: "#projects", icon: FolderGit2 },
    { name: "Tech", url: "#techstack", icon: CodeXmlIcon  },
    { name: "Contact", url: "#contact", icon: Mail },
  ];

  return <NavbarComponent items={NavItems} />;
}
