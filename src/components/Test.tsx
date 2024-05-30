import { Question } from "./Question.tsx";
import { Button } from "@headlessui/react";

const question: string = "Các loại nguồn (hình thức) của pháp luật Việt Nam hiện nay là:";
const answers: string[] = ['Học thuyết chính trị - pháp lý',
  'Hương ước',
  'Văn bản pháp luật, tập quán, án lệ, lẽ công bằng, nguyên tắc pháp luật',
  `Điều lệ của các công ty`];


export const Test = () => {
  // const [data, setData] = useState([]);
  // // const [questionObject, setQuestionObject] = useState([]);
  // // const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
  // // const [showResult, setShowResult] = useState(false);
  //
  // useEffect(() => {
  //   fetch("").then(response => response.json()).then(jsonData => {
  //     setData(jsonData.results);
  //   })
  // }, []);



  return (
    <div className="flex flex-col items-center">
      <Question answers={answers} question={question} correctAnswer="" result={true} selectedAnswer="" updateAnswer=""/>
      <Button className="bg-orange-500 px-5 py-2 rounded-2xl text-white font-bold data-[hover]:bg-orange-500/90">Kiểm tra</Button>
    </div>
  );
}