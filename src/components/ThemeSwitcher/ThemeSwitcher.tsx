import { memo } from 'react';
import { useThemeContext } from './ThemeContext'

import moontIconUrl from '../../assets/images/icon-moon.svg';
import sunIconUrl from '../../assets/images/icon-sun.svg';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeContext();

  const toggleTheme = () => {
    if (theme == "light") {
      setTheme('dark');
    } else {
      setTheme('light');
    }    
  }

  return (
    <button onClick={toggleTheme} className="theme-switcher">
      <img src={theme == 'dark' ? sunIconUrl : moontIconUrl} alt="theme icon" />
    </button>
  );
}

export default memo(ThemeSwitcher);
