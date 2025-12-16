import { useState, useEffect } from 'react';

type AccentColor = 'cyan' | 'orange' | 'green' | 'pink' | 'yellow' | 'purple';
type Theme = 'dark' | 'light';

interface ThemeState {
  theme: Theme;
  accentColor: AccentColor;
}

const accentColors: Record<AccentColor, string> = {
  cyan: '180 100% 50%',
  orange: '25 100% 55%',
  green: '150 100% 45%',
  pink: '330 100% 60%',
  yellow: '50 100% 55%',
  purple: '270 100% 65%',
};

export const useTheme = () => {
  const [state, setState] = useState<ThemeState>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) {
      return JSON.parse(saved);
    }
    return { theme: 'dark', accentColor: 'cyan' };
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme
    if (state.theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }

    // Apply accent color
    const accentValue = accentColors[state.accentColor];
    root.style.setProperty('--primary', accentValue);
    root.style.setProperty('--accent', accentValue);
    root.style.setProperty('--glow', accentValue);
    root.style.setProperty('--ring', accentValue);
    root.style.setProperty('--gradient-start', accentValue);

    // Save to localStorage
    localStorage.setItem('portfolio-theme', JSON.stringify(state));
  }, [state]);

  const setTheme = (theme: Theme) => {
    setState((prev) => ({ ...prev, theme }));
  };

  const setAccentColor = (accentColor: AccentColor) => {
    setState((prev) => ({ ...prev, accentColor }));
  };

  const toggleTheme = () => {
    setState((prev) => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  };

  return {
    ...state,
    setTheme,
    setAccentColor,
    toggleTheme,
    accentColors: Object.keys(accentColors) as AccentColor[],
  };
};
