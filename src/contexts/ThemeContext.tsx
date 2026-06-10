import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

interface CacheData {
  spiritualTracking?: {
    stats: any;
    salvations: any[];
    baptisms: any[];
    readingSessions: any[];
    dailyChecks: any[];
    goals: any[];
    lastUpdated: number;
  };
  memorization?: {
    verses: any[];
    dueVerses: any[];
    stats: any;
    lastUpdated: number;
  };
  verseOfTheDay?: {
    verse: any;
    version: string;
    date: string;
    lastUpdated: number;
  };
}

interface CacheProviderState {
  cache: CacheData;
  updateSpiritualTrackingCache: (data: any) => void;
  updateMemorizationCache: (data: any) => void;
  updateVerseOfTheDayCache: (verse: any, version: string) => void;
  invalidateSpiritualTrackingCache: () => void;
  invalidateMemorizationCache: () => void;
  invalidateVerseOfTheDayCache: () => void;
  isCacheValid: (
    key: 'spiritualTracking' | 'memorization' | 'verseOfTheDay',
    maxAge?: number
  ) => boolean;
  isVerseOfTheDayValid: (version: string) => boolean;
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const initialCacheState: CacheProviderState = {
  cache: {},
  updateSpiritualTrackingCache: () => null,
  updateMemorizationCache: () => null,
  updateVerseOfTheDayCache: () => null,
  invalidateSpiritualTrackingCache: () => null,
  invalidateMemorizationCache: () => null,
  invalidateVerseOfTheDayCache: () => null,
  isCacheValid: () => false,
  isVerseOfTheDayValid: () => false,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
const CacheProviderContext =
  createContext<CacheProviderState>(initialCacheState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function CacheProvider({ children }: { children: React.ReactNode }) {
  const [cache, setCache] = useState<CacheData>({});

  const updateSpiritualTrackingCache = (data: any) => {
    setCache((prev) => ({
      ...prev,
      spiritualTracking: {
        ...data,
        lastUpdated: Date.now(),
      },
    }));
  };

  const updateMemorizationCache = (data: any) => {
    setCache((prev) => ({
      ...prev,
      memorization: {
        ...data,
        lastUpdated: Date.now(),
      },
    }));
  };

  const updateVerseOfTheDayCache = (verse: any, version: string) => {
    const today = new Date().toISOString().split('T')[0];
    setCache((prev) => ({
      ...prev,
      verseOfTheDay: {
        verse,
        version,
        date: today,
        lastUpdated: Date.now(),
      },
    }));
  };

  const invalidateSpiritualTrackingCache = () => {
    setCache((prev) => ({
      ...prev,
      spiritualTracking: undefined,
    }));
  };

  const invalidateMemorizationCache = () => {
    setCache((prev) => ({
      ...prev,
      memorization: undefined,
    }));
  };

  const invalidateVerseOfTheDayCache = () => {
    setCache((prev) => ({
      ...prev,
      verseOfTheDay: undefined,
    }));
  };

  const isCacheValid = (
    key: 'spiritualTracking' | 'memorization' | 'verseOfTheDay',
    maxAge: number = 5 * 60 * 1000
  ) => {
    const cacheEntry = cache[key];
    if (!cacheEntry) return false;

    const age = Date.now() - cacheEntry.lastUpdated;
    return age < maxAge;
  };

  const isVerseOfTheDayValid = (version: string) => {
    const cacheEntry = cache.verseOfTheDay;
    if (!cacheEntry) return false;

    const today = new Date().toISOString().split('T')[0];
    return cacheEntry.date === today && cacheEntry.version === version;
  };

  const value = {
    cache,
    updateSpiritualTrackingCache,
    updateMemorizationCache,
    updateVerseOfTheDayCache,
    invalidateSpiritualTrackingCache,
    invalidateMemorizationCache,
    invalidateVerseOfTheDayCache,
    isCacheValid,
    isVerseOfTheDayValid,
  };

  return (
    <CacheProviderContext.Provider value={value}>
      {children}
    </CacheProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

export const useCache = () => {
  const context = useContext(CacheProviderContext);

  if (context === undefined)
    throw new Error('useCache must be used within a CacheProvider');

  return context;
};
