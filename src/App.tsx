import { useState } from 'react';
import Attribution from './components/Attribution'
import Todos from './components/Todos/Todos'
import ThemeContext from './components/ThemeSwitcher/ThemeContext'

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || 'dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <main className={`${theme} relative min-h-screen pt-[115px] md:pt-[80px] pb-10`}>
        <div className="px-5">
          <Todos/>
        </div>
        <div className="absolute bottom-0 w-full h-10 flex items-center justify-center">
          <Attribution/>
        </div>
      </main>
    </ThemeContext.Provider>
  )
}

export default App
