"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ExperienceModalProps } from "@/types/data-types";
import { MdDescription } from "react-icons/md";

export const ExperienceModal = ({
  isOpen,
  onClose,
  data,
}: ExperienceModalProps) => {
  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-background border border-transparent rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-transparent p-2">
                    <Image
                      src={data.logo}
                      alt={data.company}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-comfortaa text-foreground">
                      {data.company}
                    </h2>
                    <p className="text-sm text-foreground font-work-sans">
                      {data.location}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer duration-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Position */}
                <div className="space-y-2 font-work-sans">
                  <div className="flex gap-2 text-primary">
                    <Briefcase className="w-5 h-5" />
                    <span className="font-semibold">Position</span>
                  </div>
                  <p className="text-lg font-medium text-foreground">
                    {data.position}
                  </p>
                </div>

                {/* Period */}
                <div className="space-y-2 font-work-sans">
                  <div className="flex gap-2 text-primary">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">Period</span>
                  </div>
                  <div className="text-foreground">
                    {data.period.includes("Present") ? (
                      <span>
                        {data.period.split(" - Present")[0]} -{" "}
                        <span className="text-primary font-bold text-blink">
                          Present
                        </span>
                      </span>
                    ) : (
                      <span>{data.period}</span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2 font-work-sans">
                  <div className="flex gap-2 text-primary">
                    <MdDescription className="w-5 h-5" />
                    <h3 className="font-semibold">Description</h3>
                  </div>
                  <p className="text-foreground leading-relaxed text-justify">
                    {/* Add description field to your data or use a placeholder */}
                    {data.description || "No description available."}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-border font-work-sans">
                  <Link
                    href={data.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-foreground rounded-lg hover:bg-primary/60 transition-colors duration-500"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Website
                  </Link>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/40 transition-colors duration-500 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
