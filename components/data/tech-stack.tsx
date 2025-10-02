import { TechnStackProps } from "@/types/data-types";
import Marquee from "react-fast-marquee";
import {
  SiAmazonwebservices,
  SiBun,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiFlask,
  SiGit,
  SiGithub,
  SiGithubcopilot,
  SiGooglegemini,
  SiJavascript,
  SiJupyter,
  SiKeras,
  SiLaragon,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiOnnx,
  SiOpenai,
  SiOpencv,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiRailway,
  SiReact,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiUbuntu,
  SiVercel,
} from "react-icons/si";

const TechRowOne: TechnStackProps = {
  SkillList: [
    {
      id: 1,
      icon: <SiTypescript />,
      name: "TypeScript",
    },
    {
      id: 2,
      icon: <SiJavascript />,
      name: "JavaScript",
    },
    {
      id: 3,
      icon: <SiTailwindcss />,
      name: "TailwindCSS",
    },
    {
      id: 4,
      icon: <SiNextdotjs />,
      name: "Next.JS",
    },
    {
      id: 5,
      icon: <SiReact />,
      name: "ReactJS",
    },
    {
      id: 6,
      icon: <SiLaravel />,
      name: "Laravel",
    },
    {
      id: 7,
      icon: <SiExpress />,
      name: "ExpressJS",
    },
    {
      id: 8,
      icon: <SiMongodb />,
      name: "MongoDB",
    },
    {
      id: 9,
      icon: <SiPostgresql />,
      name: "PostgreSQL",
    },
    {
      id: 10,
      icon: <SiMysql />,
      name: "MySQL",
    },
    {
      id: 11,
      icon: <SiNodedotjs />,
      name: "Node.js",
    },
    {
      id: 12,
      icon: <SiBun />,
      name: "Bun",
    },
  ],
};

const TechRowTwo: TechnStackProps = {
  SkillList: [
    {
      id: 11,
      icon: <SiPython />,
      name: "Python",
    },
    {
      id: 12,
      icon: <SiFlask />,
      name: "Flask",
    },
    {
      id: 13,
      icon: <SiFastapi />,
      name: "FastAPI",
    },
    {
      id: 14,
      icon: <SiTensorflow />,
      name: "TensorFlow",
    },
    {
      id: 15,
      icon: <SiPytorch />,
      name: "PyTorch",
    },
    {
      id: 16,
      icon: <SiOnnx />,
      name: "ONNX",
    },
    {
      id: 17,
      icon: <SiOpencv />,
      name: "OpenCV",
    },
    {
      id: 18,
      icon: <SiKeras />,
      name: "Keras",
    },
    {
      id: 19,
      icon: <SiNumpy />,
      name: "NumPy",
    },
    {
      id: 20,
      icon: <SiPandas />,
      name: "Pandas",
    },
    {
      id: 21,
      icon: <SiJupyter />,
      name: "Jupyter Notebook",
    },
    {
      id: 22,
      icon: <SiOpenai />,
      name: "OpenAI",
    },
    {
      id: 23,
      icon: <SiGooglegemini />,
      name: "Google Gemini",
    },
    {
      id: 24,
      icon: <SiGithubcopilot />,
      name: "GitHub Copilot",
    },
  ],
};

const TechRowThree: TechnStackProps = {
  SkillList: [
    {
      id: 21,
      icon: <SiGit />,
      name: "Git",
    },
    {
      id: 22,
      icon: <SiFigma />,
      name: "Figma",
    },
    {
      id: 23,
      icon: <SiLaragon />,
      name: "Laragon",
    },
    {
      id: 24,
      icon: <SiDocker />,
      name: "Docker",
    },
    {
      id: 25,
      icon: <SiVercel />,
      name: "Vercel",
    },
    {
      id: 26,
      icon: <SiRailway />,
      name: "Railway",
    },
    {
      id: 27,
      icon: <SiUbuntu />,
      name: "Ubuntu",
    },
    {
      id: 28,
      icon: <SiGithub />,
      name: "GitHub",
    },
    {
      id: 29,
      icon: <SiAmazonwebservices />,
      name: "Amazon Web Services",
    },
  ],
};

export const TechStack = () => {
  return (
    <section className="py-4" id="techstack">
      <div className="text-center mb-16">
        <h2 className="text-4xl xl:text-5xl font-bold text-comfortaa text-foreground mb-4">
          Tech Stack
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-ring mx-auto rounded-full" />
        <p className="text-lg text-foreground/70 mt-6 font-work-sans max-w-2xl mx-auto">
          Showcasing the technologies and tools that I have learned and used
        </p>
      </div>

      {/* Tech Rows */}
      <div className="flex flex-col space-y-2">
        <Marquee
          pauseOnClick={true}
          speed={30}
          gradient={true}
          gradientColor="248, 251, 253"
          gradientWidth={100}
          direction="right"
        >
          {TechRowOne.SkillList.map((tech) => (
            <div
              key={tech.id}
              className="group w-30 h-30 bg-primary/10 backdrop-blur-md border border-transparent shadow-lg hover:shadow-2xl rounded-2xl flex flex-col items-center justify-center m-4 hover:scale-105 transition-transform duration-500"
            >
              <div className="text-5xl mb-3 text-foreground group-hover:text-primary">
                {tech.icon}
              </div>
              <div className="text-sm font-comfortaa text-foreground group-hover:text-primary font-semibold text-center">
                {tech.name}
              </div>
            </div>
          ))}
        </Marquee>
        <Marquee
          pauseOnClick={true}
          speed={30}
          gradient={true}
          gradientColor="248, 251, 253"
          gradientWidth={100}
          direction="left"
        >
          {TechRowTwo.SkillList.map((tech) => (
            <div
              key={tech.id}
              className="group w-30 h-30 bg-primary/10 backdrop-blur-md border border-transparent shadow-lg hover:shadow-2xl rounded-2xl flex flex-col items-center justify-center m-4 hover:scale-105 transition-transform duration-500"
            >
              <div className="text-5xl mb-3 text-foreground group-hover:text-primary">
                {tech.icon}
              </div>
              <div className="text-sm font-comfortaa text-foreground group-hover:text-primary font-semibold text-center">
                {tech.name}
              </div>
            </div>
          ))}
        </Marquee>
        <Marquee
          pauseOnClick={true}
          speed={30}
          gradient={true}
          gradientColor="248, 251, 253"
          gradientWidth={100}
          direction="right"
        >
          {TechRowThree.SkillList.map((tech) => (
            <div
              key={tech.id}
              className="group w-30 h-30 bg-primary/10 backdrop-blur-md border border-transparent shadow-lg hover:shadow-2xl rounded-2xl flex flex-col items-center justify-center m-4 hover:scale-105 transition-transform duration-500"
            >
              <div className="text-5xl mb-3 text-foreground group-hover:text-primary">
                {tech.icon}
              </div>
              <div className="text-sm font-comfortaa text-foreground group-hover:text-primary font-semibold text-center">
                {tech.name}
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
