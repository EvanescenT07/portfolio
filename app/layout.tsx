import type { Metadata } from "next";
import { Comfortaa, Work_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navbar } from "@/components/layout/navbar-index";
import { AudioProvider } from "@/components/ui/audio-context";
import { AudioSettingsModal } from "@/components/overlay/setting-modal";
import { Logo } from "@/components/layout/logo";
import { Toaster } from "react-hot-toast";
import { FloatingChatbot } from "@/components/chatbot/chatbot";
import { getBaseUrl } from "@/lib/site";

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const siteURL = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteURL),
  title: "Portfolio | Aliansyah",
  description:
    "Portfolio of Zulfikar Ahmad Aliansyah, an Unofficial Informatics Graduate from President University specializing in Artificial Intelligence (Python, and YOLO) and modern Frontend Development (Next.js, TypeScript). My location based in Jakarta. Let's connect!",
  icons: {
    icon: "/assets/icon.svg",
    shortcut: "/assets/icon.svg",
    apple: "/assets/icon.svg",
  },
  keywords: [
    "Zulfikar Ahmad Aliansyah",
    "Portfolio",
    "Informatics Graduate",
    "President University",
    "Artificial Intelligence",
    "Machine Learning",
    "Computer Vision",
    "Indonesia",
    "Jakarta",
    "Depok",
    "AI/ML Enthusiast",
    "Software Development",
    "Next.js",
    "TypeScript",
    "AI/ML",
    "Freshgraduate",
  ],
  creator: "Zulfikar Ahmad Aliansyah",
  openGraph: {
    title: "Zulfikar Ahmad Aliansyah's Portfolio",
    description:
      "Portfolio of Zulfikar Ahmad Aliansyah, an Unofficial Informatics Graduate from President University specializing in Artificial Intelligence (Python, and YOLO) and modern Frontend Development (Next.js, TypeScript). My location based in Jakarta. Let's connect!",
    locale: "id_ID",
    type: "website",
    siteName: "Zulfikar Ahmad Aliansyah's Portfolio",
    images: [
      {
        url: "/assets/profile.png",
        width: 800,
        height: 600,
        alt: "Profile Picture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zulfikar Ahmad Aliansyah's Portfolio",
    description:
      "Portfolio of Zulfikar Ahmad Aliansyah, an Informatics Graduate specializing in AI and modern Frontend.",
    images: ["/assets/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${comfortaa.variable} ${workSans.variable} ${poppins.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Zulfikar Ahmad Aliansyah",
              url: siteURL,
              sameAs: [
                "https://github.com/EvanescenT07",
                "https://www.linkedin.com/in/zulfikarahmad12",
              ],
              jobTitle: "Information Technology",
            }),
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          <AudioProvider>
            <Navbar />
            <AudioSettingsModal />
            <Logo />
            <main>{children}</main>
            <FloatingChatbot />
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
