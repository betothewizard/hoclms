import "./index.css"
import { styles } from "./styles.tsx";
import { Hero } from "./components/Hero.tsx";
import { Navbar } from "./components/Navbar.tsx";
import { Route, Routes } from "react-router-dom";
import { Practice } from "./components/Practice.tsx";

function App() {

  return (
    <div className="bg-zinc-100 overflow-hidden w-full min-h-screen">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Hero />}></Route>
        <Route path="practice" element={<Practice />}></Route>
      </Routes>
    </div>
  )
}

export default App
