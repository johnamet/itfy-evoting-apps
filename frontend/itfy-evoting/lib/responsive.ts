/**
 * Responsive Design Utilities
 * Breakpoints and helper functions for responsive design
 */

// Tailwind breakpoints (must match tailwind.config.ts)
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Media query hooks and utilities
 */
export const mediaQueries = {
  // Mobile first approach
  mobile: '@media (max-width: 639px)', // xs to sm
  tablet: '@media (min-width: 640px) and (max-width: 1023px)', // sm to lg
  desktop: '@media (min-width: 1024px)', // lg+
  
  // Standard breakpoints
  sm: '@media (min-width: 640px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 1024px)',
  xl: '@media (min-width: 1280px)',
  '2xl': '@media (min-width: 1536px)',
  
  // Max-width queries
  'max-sm': '@media (max-width: 639px)',
  'max-md': '@media (max-width: 767px)',
  'max-lg': '@media (max-width: 1023px)',
  'max-xl': '@media (max-width: 1279px)',
  
  // Orientation
  portrait: '@media (orientation: portrait)',
  landscape: '@media (orientation: landscape)',
  
  // Touch devices
  touch: '@media (hover: none) and (pointer: coarse)',
  hover: '@media (hover: hover) and (pointer: fine)',
} as const;

/**
 * Get responsive grid columns
 */
export function getGridColumns(
  mobile: number = 1,
  tablet: number = 2,
  desktop: number = 3,
  xl: number = 4
): string {
  const classes = [
    `grid-cols-${mobile}`,
    `sm:grid-cols-${mobile}`,
    `md:grid-cols-${tablet}`,
    `lg:grid-cols-${desktop}`,
    `xl:grid-cols-${xl}`,
  ];
  return classes.join(' ');
}

/**
 * Get responsive padding
 */
export function getResponsivePadding(
  mobile: number = 4,
  tablet: number = 6,
  desktop: number = 8
): string {
  return `px-${mobile} md:px-${tablet} lg:px-${desktop}`;
}

/**
 * Get responsive gap
 */
export function getResponsiveGap(
  mobile: number = 4,
  tablet: number = 6,
  desktop: number = 8
): string {
  return `gap-${mobile} md:gap-${tablet} lg:gap-${desktop}`;
}

/**
 * Get responsive text size
 */
export function getResponsiveText(
  mobile: string = 'text-base',
  tablet: string = 'text-lg',
  desktop: string = 'text-xl'
): string {
  return `${mobile} md:${tablet} lg:${desktop}`;
}

/**
 * Common responsive class combinations
 */
export const responsiveClasses = {
  container: 'w-full px-4 sm:px-6 lg:px-8 mx-auto',
  gridAuto: 'grid auto-cols-fr gap-4 md:gap-6 lg:gap-8',
  flexCol: 'flex flex-col md:flex-row gap-4 md:gap-6',
  
  // Typography
  heading: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold',
  subheading: 'text-lg sm:text-xl md:text-2xl font-semibold',
  body: 'text-sm sm:text-base md:text-lg',
  
  // Cards
  cardGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6',
  
  // Buttons
  buttonSize: 'px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3',
} as const;

/**
 * Check if device is mobile
 * Note: This runs on client only
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Check if screen width matches breakpoint
 * Note: This runs on client only
 */
export function matchesBreakpoint(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return false;
  
  const width = breakpoints[breakpoint];
  const query = `(min-width: ${width}px)`;
  
  return window.matchMedia(query).matches;
}

/**
 * Get current breakpoint
 * Note: This runs on client only
 */
export function getCurrentBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'xs';
  
  const width = window.innerWidth;
  
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  
  return 'xs';
}
