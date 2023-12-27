import { ReactNode, memo } from 'react'
import { useThemeContext } from '../ThemeSwitcher/ThemeContext'

type Layout = {
  children: ReactNode
}

const Layout = ({ children }:Layout) => {
  const { theme } = useThemeContext();

  return (
    <main className={`${theme} relative min-h-screen pt-[45px] md:pt-[68px] pb-10`}>
      { children }
    </main>
  )
}

export default memo(Layout)
