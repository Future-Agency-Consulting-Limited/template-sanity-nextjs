import { useState, useEffect } from "react";

/**
 * Type representing the valid Tailwind CSS breakpoints.
 */
export type TailwindBreakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Tailwind CSS breakpoints mapping.
 * - base: 0px and up
 * - sm: 640px and up
 * - md: 768px and up
 * - lg: 1024px and up
 * - xl: 1280px and up
 * - 2xl: 1536px and up
 */
const breakpoints: Record<TailwindBreakpoint, number> = {
  base: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Determines the current Tailwind breakpoint based on the given window width.
 *
 * @param {number} width - The current window width.
 * @returns {TailwindBreakpoint} The current breakpoint string.
 */
const getBreakpoint = (width: number): TailwindBreakpoint => {
  if (width >= breakpoints["2xl"]) return "2xl";
  if (width >= breakpoints.xl) return "xl";
  if (width >= breakpoints.lg) return "lg";
  if (width >= breakpoints.md) return "md";
  if (width >= breakpoints.sm) return "sm";
  return "base";
};

/**
 * Custom hook that returns the current window width.
 *
 * @returns {number} The current window width in pixels.
 */
function useWindowWidth(): number {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

/**
 * Custom hook that returns the current Tailwind CSS breakpoint based on the window width.
 *
 * @returns {TailwindBreakpoint} The current breakpoint, one of "base", "sm", "md", "lg", "xl", or "2xl".
 *
 * @example
 * import useTwBreakpoint from "./useTwBreakpoint";
 *
 * const MyComponent = () => {
 *   const breakpoint = useTwBreakpoint();
 *
 *   return (
 *     <div>
 *       {["lg", "xl", "2xl"].includes(breakpoint)
 *         ? <p>Large screen layout</p>
 *         : <p>Small screen layout</p>
 *       }
 *     </div>
 *   );
 * };
 */
export function useTwBreakpoint(): TailwindBreakpoint {
  const width = useWindowWidth();
  return getBreakpoint(width);
}

/**
 * Custom hook that returns a reactive boolean indicating whether the current window width is
 * greater than or equal to the specified Tailwind breakpoint.
 *
 * @param {TailwindBreakpoint} breakpoint - The Tailwind breakpoint to compare against.
 * @returns {boolean} True if the window width is at least the specified breakpoint.
 *
 * @example
 * import { useIsAtLeastTwBreakpoint } from "./useTwBreakpoint";
 *
 * const isLargeScreen = useIsAtLeastTwBreakpoint("lg");
 */
export function useIsAtLeastTwBreakpoint(
  breakpoint: TailwindBreakpoint,
): boolean {
  const width = useWindowWidth();
  return width >= breakpoints[breakpoint];
}

/**
 * Custom hook that returns a reactive boolean indicating whether the current window width is
 * less than or equal to the specified Tailwind breakpoint.
 *
 * @param {TailwindBreakpoint} breakpoint - The Tailwind breakpoint to compare against.
 * @returns {boolean} True if the window width is at most the specified breakpoint.
 *
 * @example
 * import { useIsAtMostTwBreakpoint } from "./useTwBreakpoint";
 *
 * const isSmallScreen = useIsAtMostTwBreakpoint("md");
 */
export function useIsAtMostTwBreakpoint(
  breakpoint: TailwindBreakpoint,
): boolean {
  const width = useWindowWidth();
  return width <= breakpoints[breakpoint];
}
