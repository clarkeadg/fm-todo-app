import { useContext } from 'react';
import ThemeContext from './ThemeContext'
import './ThemeSwitcher.css'

import moontIconUrl from '../../assets/images/icon-moon.svg';
import sunIconUrl from '../../assets/images/icon-sun.svg';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const changeTheme = (value:string) => {
    setTheme(value);
    localStorage.setItem("theme", value)
  }

  const toggleTheme = () => {
    if (theme == "light") {
      changeTheme('dark');
    } else {
      changeTheme('light');
    }    
  }

  return (
    <button onClick={toggleTheme} className="theme-switcher">
      <img src={theme == 'dark' ? sunIconUrl : moontIconUrl} alt="theme icon" />
    </button>
  );
}

export default ThemeSwitcher;
