import React from "react";
import { twMerge } from "tailwind-merge";

export interface LoadingSpinnerProps {
  className?: string;
  size?: string;
}

/**
 * Generic loading spinner component
 *
 * Replace it with one specific to the site's design if needed.
 * Preferably using a font library like {@link https://lucide.dev/guide/react/|Lucide} instead of an SVG.
 */
export default function LoadingSpinner({
  className = "",
  size = "48",
}: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={`0 0 24 24`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={twMerge("animate-spin", className)}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  );
}
