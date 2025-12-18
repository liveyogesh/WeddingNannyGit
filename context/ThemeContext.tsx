
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('wedding_nanny_theme_mode');
    return (saved as ThemeMode) || 'auto';
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
  const [solarData, setSolarData] = useState<{ sunrise: number; sunset: number } | null>(null);

  // Persistence
  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem('wedding_nanny_theme_mode', newMode);
  };

  // Cycle through modes: Auto -> Light -> Dark -> Auto
  const toggleMode = () => {
    if (mode === 'auto') setMode('light');
    else if (mode === 'light') setMode('dark');
    else setMode('auto');
  };

  // Fetch solar data based on geolocation
  useEffect(() => {
    if (mode !== 'auto') return;

    const fetchSolarData = async (lat: number, lng: number) => {
      try {
        const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`);
        const json = await response.json();
        if (json.status === 'OK') {
          setSolarData({
            sunrise: new Date(json.results.sunrise).getTime(),
            sunset: new Date(json.results.sunset).getTime()
          });
        }
      } catch (e) {
        console.error("Solar API failed, falling back to hourly logic", e);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => fetchSolarData(pos.coords.latitude, pos.coords.longitude),
      () => console.warn("Geolocation denied, using hourly fallback for theme.")
    );
  }, [mode]);

  // Resolve the actual theme (Light/Dark)
  useEffect(() => {
    const root = window.document.documentElement;
    let target: ResolvedTheme = 'light';

    if (mode === 'light') {
      target = 'light';
    } else if (mode === 'dark') {
      target = 'dark';
    } else {
      // Auto logic
      const now = Date.now();
      if (solarData) {
        // Precise astronomical check
        target = (now >= solarData.sunrise && now < solarData.sunset) ? 'light' : 'dark';
      } else {
        // Hourly fallback (6 AM to 6 PM)
        const hour = new Date().getHours();
        target = (hour >= 6 && hour < 18) ? 'light' : 'dark';
      }
    }

    setResolvedTheme(target);
    if (target === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [mode, solarData]);

  // Check every minute for automatic transitions
  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger a re-evaluation of the 'auto' mode
      if (mode === 'auto') {
        setSolarData(prev => prev ? { ...prev } : null); 
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, resolvedTheme, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
