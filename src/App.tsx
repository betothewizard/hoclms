import "./index.css"
import { PracticeScreen } from "./components/PracticeScreen.tsx";
import { useState } from "react";
import { Test } from "./components/Test.tsx";

function App() {
  const [showQuestions, isShowQuestions] = useState<boolean>(false)
  return (<div className="flex flex-col items-center justify-center h-screen">
      {
        showQuestions ? <Test/> : <PracticeScreen isShowQuestions={isShowQuestions}/>
      }
    </div>
  )

}

export default App
