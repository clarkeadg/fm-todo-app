import Attribution from './components/Attribution'
import Todos from './components/Todos/Todos'

const App = () => {
  const theme = "light";
  // const theme = "dark";

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

export default App
