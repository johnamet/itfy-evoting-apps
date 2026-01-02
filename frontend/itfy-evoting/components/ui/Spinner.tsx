"use client";

import { cn } from "@/lib/utils";

interface SpinnerProps {
  /** Size of the spinner */
  size?: "sm" | "md" | "lg" | "xl";
  /** Optional text to display below the spinner */
  text?: string;
  /** Additional CSS classes */
  className?: string;
}

const sizeClasses = {
  sm: {
    container: "w-6 h-6",
    outer: "border-t-2",
    middle: "inset-1 border-r-2",
    inner: "inset-2 border-b-2",
  },
  md: {
    container: "w-10 h-10",
    outer: "border-t-2",
    middle: "inset-1.5 border-r-2",
    inner: "inset-3 border-b-2",
  },
  lg: {
    container: "w-16 h-16",
    outer: "border-t-2",
    middle: "inset-2 border-r-2",
    inner: "inset-4 border-b-2",
  },
  xl: {
    container: "w-24 h-24",
    outer: "border-t-3",
    middle: "inset-3 border-r-3",
    inner: "inset-6 border-b-3",
  },
};

/**
 * Beautiful multi-layered animated spinner component
 * Features three concentric rotating rings with ITFY brand colors
 */
export function Spinner({ size = "md", text, className }: SpinnerProps) {
  const classes = sizeClasses[size];

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className={cn("relative mx-auto", classes.container)}>
        {/* Outer ring - ITFY Blue - spins clockwise */}
        <div
          className={cn(
            "absolute inset-0 rounded-full border-[#0152be] animate-spin",
            classes.outer
          )}
        />
        {/* Middle ring - Purple - spins counter-clockwise */}
        <div
          className={cn(
            "absolute rounded-full border-purple-500 animate-spin-reverse",
            classes.middle
          )}
        />
        {/* Inner ring - Pink - spins clockwise */}
        <div
          className={cn(
            "absolute rounded-full border-pink-500 animate-spin",
            classes.inner
          )}
        />
      </div>
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
}

/**
 * Full page spinner overlay
 */
export function FullPageSpinner({ text }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Spinner size="lg" text={text} />
    </div>
  );
}

/**
 * Inline spinner for buttons and small spaces
 */
export function InlineSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-4 h-4", className)}>
      <div className="absolute inset-0 rounded-full border-t border-[#0152be] animate-spin" />
      <div className="absolute inset-0.5 rounded-full border-r border-purple-500 animate-spin-reverse" />
      <div className="absolute inset-1 rounded-full border-b border-pink-500 animate-spin" />
    </div>
  );
}
