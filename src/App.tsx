import "./index.css"
import { styles } from "./styles.tsx";
import { Hero } from "./components/Hero.tsx";
import { Navbar } from "./components/Navbar.tsx";
import { Button } from "@headlessui/react";

function App() {
  // const [showQuestions, isShowQuestions] = useState<boolean>(false)
  // return (<div className="flex flex-col items-center justify-center h-screen">
  //     {
  //       showQuestions ? <Test/> : <PracticeScreen isShowQuestions={isShowQuestions}/>
  //     }
  //   </div>

  // )

  return (
    <div className="bg-black text-white overflow-hidden w-full min-h-screen">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar/>
        </div>
      </div>

      <div className={`bg-black ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero/>
        </div>
      </div>

      <div className={`bg-black ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Button className="bg-orange-500 px-5 py-2 text-xl rounded-2xl text-white font-bold data-[hover]:bg-orange-500/90">Hi</Button>
        </div>
      </div>
    </div>
  )
}

export default App
