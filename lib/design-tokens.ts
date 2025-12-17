/**
 * Responsive spacing tokens for the Bead by Do Bee design system
 *
 * This file contains all spacing values for different breakpoints (mobile, tablet, desktop)
 * Breakpoints:
 * - Small Mobile: < 414px (e.g., iPhone SE at 375x667)
 * - Medium Mobile: 414px - 749px (e.g., iPhone 11, 12, 13 at 414x896)
 * - Mobile: 750px - 849px
 * - Tablet: 850px - 1279px
 * - Desktop: ≥ 1280px
 *
 * To customize spacing:
 * 1. Find the relevant property (e.g., ctaButton, tabNav)
 * 2. Edit the desired breakpoint values
 * 3. Components using useResponsiveSpacing() will automatically update
 */

export const RESPONSIVE_SPACING = {
  // CTA Button positioning (bottom action button on home page)
  ctaButton: {
    smallMobile: "bottom-32", // 8rem
    mediumMobile: "bottom-52", // 0rem
    mobile: "bottom-52", // 13rem
    tablet: "bottom-100", // 5rem
    desktop: "bottom-24", // 6rem
  },

  // Tab Navigation positioning (About/Bracelets/Keychains tabs)
  tabNav: {
    smallMobile: "top-32", // 8rem
    mediumMobile: "top-52", // 10rem
    mobile: "top-56", // 14rem
    tablet: "top-100", // 7rem
    desktop: "top-32", // 8rem
  },

  // AI Chatbot positioning (floating chatbot in bottom-right)
  chatbot: {
    smallMobile: "bottom-2 right-2", // 0.5rem
    mediumMobile: "bottom-3 right-3", // 0.75rem
    mobile: "bottom-4 right-4", // 1rem
    tablet: "bottom-6 right-6", // 1.5rem
    desktop: "bottom-6 right-6", // 1.5rem
  },

  // Common gap sizes for spacing between elements
  gap: {
    tight: "gap-2", // 0.5rem
    default: "gap-4", // 1rem
    medium: "gap-5", // 1.25rem
    large: "gap-8", // 2rem
    xlarge: "gap-15", // 3.75rem
  },

  // Container padding for content areas
  container: {
    smallMobile: "px-3", // 0.75rem
    mediumMobile: "px-3.5", // 0.875rem
    mobile: "px-4", // 1rem
    tablet: "px-6", // 1.5rem
    desktop: "px-8", // 2rem
  },
} as const;
