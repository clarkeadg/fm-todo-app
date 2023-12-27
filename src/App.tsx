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
            <Todos initialItems={[
              { id: "1", title: 'Complete online JavaScript course', completed: true },
              { id: "2", title: 'Jog around the park 3x', completed: false },
              { id: "3", title: '10 minutes meditation', completed: false },
              { id: "4", title: 'Read for 1 hour', completed: false },
              { id: "5", title: 'Pick up groceries', completed: false },
              { id: "6", title: 'Complete Todo App on Frontend Mentor', completed: false },
            ]}/>
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
