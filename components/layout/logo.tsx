import { cn } from "@/lib/utils";
  import Image from "next/image";

export const Logo = () => {
  return (
    <>
      <div className="fixed top-6 left-6 lg:left-12 z-51 backdrop-blur-lg rounded-full hover:scale-105 transition-all duration-500 shadow-xl cursor-pointer">
        <Image
          src="assets/logo.svg"
          alt="Logo"
          width={256}
          height={256}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn("h-10 w-10 md:h-14 md:w-14")}
        />
      </div>
    </>
  );
};
