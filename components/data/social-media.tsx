import Link from "next/link";
import { SocialMediaProps } from "@/types/data-types";
import { FaGithub, FaLinkedinIn, FaInstagram, FaSpotify } from "react-icons/fa";

export const SocialMedia = ({ containerStyle }: SocialMediaProps) => {
  const socials = [
    {
      icon: <FaGithub />,
      path: process.env.NEXT_PUBLIC_GITHUB_PATH || "https://www.github.com",
      title: "GitHub",
    },
    {
      icon: <FaLinkedinIn />,
      path: process.env.NEXT_PUBLIC_LINKEDIN_PATH || "https://www.linkedin.com",
      title: "LinkedIn",
    },
    {
      icon: <FaInstagram />,
      path:
        process.env.NEXT_PUBLIC_INSTAGRAM_PATH || "https://www.instagram.com",
      title: "Instagram",
    },
    {
      icon: <FaSpotify />,
      path: process.env.NEXT_PUBLIC_SPOTIFY_PATH || "https://www.spotify.com",
      title: "Spotify",
    },
  ];

  return (
    <div className={containerStyle}>
      {socials.map((item) => {
        return (
          <Link
            key={item.title}
            href={item.path}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-[50px] h-[50px] bg-background border border-transparent shadow-xl rounded-full flex items-center justify-center transition-all duration-500 hover:w-[140px] hover:bg-primary hover:shadow-xl hover:shadow-primary/20 group cursor-pointer"
          >
            {/* Icon */}
            <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0">
              <span className="text-xl text-foreground group-hover:text-primary-foreground">
                {item.icon}
              </span>
            </span>

            {/* Title */}
            <span className="absolute text-primary-foreground font-semibold text-sm font-work-sans transition-all duration-500 scale-0 group-hover:scale-100 delay-150 z-10">
              {item.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
