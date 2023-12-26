import ThemeContextProvider from './components/ThemeSwitcher/ThemeContext'
import Layout from './components/Layout'

const App = () => {
  return (
    <ThemeContextProvider>
      <Layout/>
    </ThemeContextProvider>
  )
}

export default App
