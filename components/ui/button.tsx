import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 group",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary to-ring text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 before:absolute before:inset-0 before:bg-gradient-to-r before:from-ring before:to-primary before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 cursor-pointer",
        destructive:
          "bg-gradient-to-r from-destructive to-red-600 text-white shadow-lg hover:shadow-xl hover:shadow-destructive/25 before:absolute before:inset-0 before:bg-gradient-to-r before:from-red-600 before:to-destructive before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 cursor-pointer",
        outline:
          "border-2 border-border bg-transparent backdrop-blur-sm hover:bg-accent/50 hover:text-accent-foreground hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:to-ring/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 cursor-pointer",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow-lg hover:shadow-secondary/20 hover:-translate-y-0.5 cursor-pointer",
        ghost:
          "text-foreground hover:bg-accent/80 hover:text-accent-foreground hover:shadow-md backdrop-blur-sm before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-primary/10 before:to-ring/10 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300 cursor-pointer",
        link: "text-primary underline-offset-4 hover:underline hover:text-ring relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-ring hover:after:w-full after:transition-all after:duration-300 cursor-pointer",
        glass:
          "bg-card/20 backdrop-blur-md border border-border/30 text-foreground hover:bg-card/30 hover:border-primary/30 shadow-xl hover:shadow-2xl hover:shadow-primary/10 before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/10 before:to-ring/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 cursor-pointer",
        neon: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.3)] hover:shadow-[0_0_25px_rgba(var(--primary),0.6)] transition-all duration-300 before:absolute before:inset-0 before:bg-primary before:opacity-0 hover:before:opacity-20 before:blur-xl before:transition-opacity before:duration-300 cursor-pointer",
        interactive:
          "border border-border bg-background text-foreground font-semibold rounded-full cursor-pointer",
      },
      size: {
        default: "h-10 px-6 py-2 text-sm",
        sm: "h-8 rounded-md px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  ripple?: boolean;
  interactiveText?: string; // For the interactive variant
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      ripple = true,
      children,
      onClick,
      disabled,
      interactiveText,
      // Extract HTML drag events
      onDrag,
      onDragStart,
      onDragEnd,
      onDragEnter,
      onDragExit,
      onDragLeave,
      onDragOver,
      onDrop,
      // Extract HTML animation events
      onAnimationStart,
      onAnimationEnd,
      onAnimationIteration,
      // Extract HTML transition events
      onTransitionStart,
      onTransitionEnd,
      onTransitionRun,
      onTransitionCancel,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = React.useState<
      Array<{ id: number; x: number; y: number }>
    >([]);
    const rippleId = React.useRef(0);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && !disabled && !loading && variant !== "interactive") {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = {
          id: rippleId.current++,
          x,
          y,
        };

        setRipples((prev) => [...prev, newRipple]);

        setTimeout(() => {
          setRipples((prev) =>
            prev.filter((ripple) => ripple.id !== newRipple.id)
          );
        }, 600);
      }

      if (onClick && !disabled && !loading) {
        onClick(e);
      }
    };

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          onClick={handleClick}
          // Pass HTML events back to Slot
          onDrag={onDrag}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragEnter={onDragEnter}
          onDragExit={onDragExit}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onAnimationStart={onAnimationStart}
          onAnimationEnd={onAnimationEnd}
          onAnimationIteration={onAnimationIteration}
          onTransitionStart={onTransitionStart}
          onTransitionEnd={onTransitionEnd}
          onTransitionRun={onTransitionRun}
          onTransitionCancel={onTransitionCancel}
          {...props}
        />
      );
    }

    // Interactive variant with special animation
    if (variant === "interactive") {
      const displayText =
        interactiveText || (typeof children === "string" ? children : "Button");

      return (
        <motion.button
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          onClick={handleClick}
          disabled={disabled || loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          {...props}
        >
          {/* Original text that slides out */}
          <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
            {displayText}
          </span>

          {/* New text with arrow that slides in */}
          <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
            <span>{displayText}</span>
            <ArrowRight className="w-4 h-4" />
          </div>

          {/* Expanding background */}
          <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-primary transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-primary"></div>
        </motion.button>
      );
    }

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        disabled={disabled || loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {/* Ripple Effect */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute pointer-events-none rounded-full bg-white/30"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}

        {/* Loading Spinner */}
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-current/10 backdrop-blur-sm rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.span
          className={cn(
            "relative z-10 flex items-center gap-2",
            loading && "opacity-50"
          )}
          animate={{ opacity: loading ? 0.5 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>

        {/* Shine Effect for default variant */}
        {variant === "default" && (
          <motion.div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out"
            style={{ transform: "skewX(-20deg)" }}
          />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
