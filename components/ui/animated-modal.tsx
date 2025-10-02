"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export function Modal({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { setOpen } = useModal();
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md text-foreground text-center relative overflow-hidden",
        className
      )}
      onClick={() => setOpen(true)}
    >
      {children}
    </button>
  );
};

export const ModalBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { open } = useModal();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const { setOpen } = useModal();
  useOutsideClick(modalRef, () => setOpen(false));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            backdropFilter: "blur(10px)",
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
          className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full flex items-center justify-center z-50 p-4"
        >
          <Overlay />

          <motion.div
            ref={modalRef}
            className={cn(
              /* ========================================
                 📱 RESPONSIVE MODAL CONTAINER WITH SCROLLING
                 Mobile: Full width with max height for scrolling
                 Desktop: Fixed max-width with proper height constraints
              ======================================== */
              "w-full max-w-md",

              /* ========================================
                 📱 HEIGHT CONSTRAINTS FOR SCROLLING
                 Mobile: max-h-[85vh] for proper viewport fit
                 Desktop: max-h-[80vh] with min-h for consistency
              ======================================== */
              "max-h-[85vh]", // Mobile - leave space for safe areas
              "md:max-h-[90vh]", // Desktop - more space available

              /* ========================================
                 🎨 MODAL STYLING WITH FLEX LAYOUT
                 Background: Semi-transparent with backdrop blur
                 Layout: Flex column for proper content flow
                 Overflow: Hidden on container, scroll on content
              ======================================== */
              "bg-white/95 dark:bg-neutral-950/95",
              "backdrop-blur-md",
              "border border-border/50 dark:border-neutral-800/50",
              "rounded-2xl",
              "shadow-2xl",
              "relative z-50 flex flex-col",
              "overflow-hidden", // Important: hide overflow on container
              className
            )}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotateX: 40,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              rotateX: 10,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
            }}
          >
            <CloseIcon />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ModalContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        /* ========================================
         📱 SCROLLABLE CONTENT CONTAINER
         Layout: Flex column with flex-1 to fill available space
         Overflow: Auto for scrolling when content exceeds height
         Padding: Responsive padding that doesn't interfere with scrolling
      ======================================== */
        "flex flex-col flex-1",
        "overflow-y-auto", // Enable vertical scrolling
        "overflow-x-hidden", // Prevent horizontal scroll
        "p-4 sm:p-6 md:p-8 lg:p-10",
        /* ========================================
         🎨 CUSTOM SCROLLBAR STYLING
         Webkit scrollbar customization for better appearance
      ======================================== */
        "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20",
        "hover:scrollbar-thumb-muted-foreground/40",
        className
      )}
      style={{
        /* ========================================
         🎨 WEBKIT SCROLLBAR CUSTOM STYLES
         For browsers that support webkit scrollbar styling
        ======================================== */
        scrollbarWidth: "thin",
        scrollbarColor: "rgb(100 116 139 / 0.2) transparent",
      }}
    >
      {children}
    </div>
  );
};

export const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        /* ========================================
           📱 STICKY FOOTER THAT DOESN'T SCROLL
           Position: Stays at bottom even when content scrolls
           Background: Solid background to avoid transparency issues
        ======================================== */
        "flex justify-end gap-2 p-3 sm:p-4",
        "bg-muted/50 border-t border-border/50",
        "flex-shrink-0", // Prevent footer from shrinking
        className
      )}
    >
      {children}
    </div>
  );
};

const Overlay = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        backdropFilter: "blur(10px)",
      }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0px)",
      }}
      className={cn(
        "fixed inset-0 h-full w-full bg-black/20 dark:bg-black/40 z-40",
        className
      )}
    />
  );
};

const CloseIcon = () => {
  const { setOpen } = useModal();
  const { theme } = useTheme();

  return (
    <button
      onClick={() => setOpen(false)}
      className={cn(
        /* ========================================
           🔘 STICKY CLOSE BUTTON
           Position: Absolute positioning that stays visible during scroll
           Z-index: High z-index to stay above scrolling content
        ======================================== */
        "absolute top-3 right-3 sm:top-4 sm:right-4 z-20", // Higher z-index
        "p-1.5 sm:p-2 rounded-full",
        "bg-background/80 backdrop-blur-sm", // Background for visibility
        "hover:bg-muted/80 transition-all duration-200",
        "border border-border/10", // Subtle border for definition
        "group"
      )}
      title="Close modal"
      aria-label="Close modal"
    >
      <Image
        src={
          theme === "dark"
            ? "/assets/close-dark.svg"
            : "/assets/close-light.svg"
        }
        alt="Close"
        width={20}
        height={20}
        className={cn(
          "h-4 w-4 sm:h-5 sm:w-5",
          "group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200"
        )}
      />
    </button>
  );
};

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event?.target as Node)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
