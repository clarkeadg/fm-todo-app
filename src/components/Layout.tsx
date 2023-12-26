import { useThemeContext } from './ThemeSwitcher/ThemeContext'
import Attribution from './Attribution'
import Todos from './Todos/Todos'

const Layout = () => {
  const { theme } = useThemeContext();

  return (
    <main className={`${theme} relative min-h-screen pt-[115px] md:pt-[80px] pb-10`}>
      <div className="px-5">
        <Todos/>
      </div>
      <div className="absolute bottom-0 w-full h-10 flex items-center justify-center">
        <Attribution/>
      </div>
    </main>
  )
}

export default Layout
