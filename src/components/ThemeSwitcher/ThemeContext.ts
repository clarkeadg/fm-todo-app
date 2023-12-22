import { createContext } from 'react';

interface IThemeContext {
  theme: string,
  setTheme: Function
}

const value:IThemeContext = {
  theme: "",
  setTheme: () => {}
};

const ThemeContext = createContext(value);

export default ThemeContext;
