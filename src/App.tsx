import ThemeContextProvider from './components/ThemeSwitcher/ThemeContext'
import Layout from './components/Layout/Layout'
import Attribution from './components/Attribution'
import Todos from './components/Todos/Todos'

const App = () => {
  return (
    <ThemeContextProvider>
      <Layout>
        <>
          <div className="px-5">
            <Todos/>
          </div>
          <div className="absolute bottom-0 w-full h-10 flex items-center justify-center">
            <Attribution/>
          </div>
        </>
      </Layout>
    </ThemeContextProvider>
  )
}

export default App
