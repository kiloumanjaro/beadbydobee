'use client';

import { useState, useEffect } from 'react';
import { RESPONSIVE_SPACING } from '@/lib/design-tokens';

type Breakpoint = 'smallMobile' | 'mediumMobile' | 'mobile' | 'tablet' | 'desktop';

/**
 * Hook to get responsive spacing values based on current viewport width
 *
 * Usage:
 * ```typescript
 * const { spacing, breakpoint } = useResponsiveSpacing();
 *
 * return (
 *   <div className={`absolute ${spacing.ctaButton} left-1/2 -translate-x-1/2`}>
 *     Button
 *   </div>
 * );
 * ```
 *
 * Returns:
 * - breakpoint: Current breakpoint ('smallMobile' | 'mediumMobile' | 'mobile' | 'tablet' | 'desktop')
 * - spacing: Object with responsive spacing for ctaButton, tabNav, chatbot, container
 * - gap: Common gap sizes
 */
export function useResponsiveSpacing() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 414) {
        setBreakpoint('smallMobile');
      } else if (window.innerWidth < 750) {
        setBreakpoint('mediumMobile');
      } else if (window.innerWidth < 850) {
        setBreakpoint('mobile');
      } else if (window.innerWidth < 1280) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    breakpoint,
    spacing: {
      ctaButton: RESPONSIVE_SPACING.ctaButton[breakpoint],
      tabNav: RESPONSIVE_SPACING.tabNav[breakpoint],
      chatbot: RESPONSIVE_SPACING.chatbot[breakpoint],
      container: RESPONSIVE_SPACING.container[breakpoint],
    },
    gap: RESPONSIVE_SPACING.gap,
  };
}
