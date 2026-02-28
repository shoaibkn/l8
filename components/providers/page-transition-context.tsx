'use client';

import { createContext, useContext, useState, useLayoutEffect, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionContextType {
  isTransitioning: boolean;
  isReady: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  isTransitioning: false,
  isReady: true,
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    setIsReady(false);
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 700);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <PageTransitionContext.Provider value={{ isTransitioning: false, isReady }}>
      {children}
    </PageTransitionContext.Provider>
  );
}
