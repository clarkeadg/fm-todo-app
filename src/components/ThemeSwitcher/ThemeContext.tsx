import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

type ThemeContext = {
  theme: Theme,
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

type ThemeContextProviderProps = {
  children: React.ReactNode
}

const ThemeContext = createContext<ThemeContext | null>(null);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
}

const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<Theme>(localStorage.getItem("theme") as Theme || 'light');

  useEffect(()=>{
    localStorage.setItem("theme", theme);
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      { children }
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider;
