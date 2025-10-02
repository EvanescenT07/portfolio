"use client";

import { useEffect } from "react";
import type { WrapperProps } from "@/types/component-types";

const ClientWrapper = ({ children }: WrapperProps) => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen transition-all duration-500 overflow-x-hidden">
      {children}
    </div>
  );
};
export default ClientWrapper;
