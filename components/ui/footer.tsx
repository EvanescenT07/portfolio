"use client";

import { cn } from "@/lib/utils";
import {
  FooterCopyrightProps,
  FooterLegalLinksProps,
  FooterMainLinksProps,
  FooterSocialProps,
} from "@/types/component-types";
import Image from "next/image";
import { FaGithub, FaInstagram, FaSpotify } from "react-icons/fa";

const SocialIcon: FooterSocialProps = {
  SocialIcon: [
    {
      icon: <FaInstagram size={24} />,
      href: "https://www.instagram.com/zulfikarahmad12/",
      label: "Instagram",
    },
    {
      icon: <FaGithub size={24} />,
      href: "https://github.com/EvanescenT07",
      label: "Github",
    },
    {
      icon: <FaSpotify size={24} />,
      href: "https://open.spotify.com/user/vstliaumdpumwdadfsrrwvc10?si=zDRuzJ1_TxikJMiZ6eyp5Q",
      label: "Spotify",
    },
  ],
};

const mainLinks: FooterMainLinksProps = {
  mainLinks: [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ],
};

const legalLinks: FooterLegalLinksProps = {
  legalLinks: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
};

const copyright: FooterCopyrightProps = {
  text: `© ${new Date().getFullYear()} Portfolio Fikar. All rights reserved.`,
  license: "All rights reserved.",
};

export function Footer() {
  return (
    <footer className="pb-6 pt-16 lg:pb-8 lg:pt-24">
      <div className="px-4 lg:px-8">
        <div className="md:flex md:items-start md:justify-between">
          <a
            href="#home"
            className="flex items-center gap-x-2"
            aria-label="Home"
          >
            <Image
              src="assets/logo.svg"
              alt="Logo"
              width={256}
              height={256}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn("h-10 w-10 md:h-14 md:w-14")}
            />
            <span className="text-comfortaa font-bold text-xl">
              Portfolio Fikar
            </span>
          </a>
          <ul className="flex list-none mt-6 md:mt-0 space-x-3">
            {SocialIcon.SocialIcon.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  target="_blank"
                  aria-label={link.label}
                  className="flex items-center justify-center h-10 w-10 rounded-full text-foreground bg-accent/30 hover:bg-muted/10"
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t mt-6 pt-6 md:mt-4 md:pt-8 lg:grid lg:grid-cols-10">
          <nav className="lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-2 lg:justify-end">
              {mainLinks.mainLinks.map((link, i) => (
                <li key={i} className="my-1 mx-2 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-foreground font-work-sans underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-3 lg:justify-end">
              {legalLinks.legalLinks.map((link, i) => (
                <li key={i} className="my-1 mx-3 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground font-work-sans underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 text-sm font-work-sans leading-6 text-muted-foreground whitespace-nowrap lg:mt-0 lg:row-[1/3] lg:col-[1/4]">
            <div className="text-foreground">{copyright.text}</div>
            {copyright.license && <div>{copyright.license}</div>}
          </div>
        </div>
      </div>
    </footer>
  );
}
