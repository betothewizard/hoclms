import "./index.css";
import { styles } from "./styles.tsx";
import { Hero } from "./components/Hero.tsx";
import { Navbar } from "./components/Navbar.tsx";
import { Route, Routes } from "react-router-dom";
import { Practice } from "./components/Practice.tsx";
import { NotFound } from "./components/NotFound.tsx";

function App() {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-zinc-100">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Hero />}></Route>
        <Route path="practice" element={<Practice />}></Route>

        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
