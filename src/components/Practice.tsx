import { styles } from "../styles";
import { useEffect, useState } from "react";
import { QuestionType } from "../types/question";
import { shuffle } from "../utils/random";
import { Question } from "./Question";
import { Button } from "@headlessui/react";
import { CustomDialog } from "./CustomDialog";
import { LINKS } from "../utils/config";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SkeletonLoader } from "./SkeletonLoader.tsx";

const QUESTIONS_PER_PAGE = 10;

export const Practice = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [questionsData, setQuestionsData] = useState<any>([]);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    QuestionType[]
  >([]);
  const [showResult, setShowResult] = useState<boolean[]>([]);
  const [showWarning, setShowWarning] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const totalQuestions = questionsAndAnswers.length;
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);
  const startQuestionIndex = currentPage * QUESTIONS_PER_PAGE % totalQuestions;
  const endQuestionIndex = startQuestionIndex + QUESTIONS_PER_PAGE;
  const currentQuestions = questionsAndAnswers.slice(startQuestionIndex, endQuestionIndex)
  const toCurrentPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }


  useEffect(() => {
    setIsLoading(true);
    const getQuestionsAndAnswers = (data: any[]): QuestionType[] => {
      return data.map((questionData, id: number) => ({
        id: id,
        question: questionData.question,
        answers: shuffle([
          ...questionData.incorrect_answers,
          questionData.correct_answer,
        ]),
        correctAnswer: questionData.correct_answer,
        selectedAnswer: "",
      }));
    };

    const dataSession = sessionStorage.getItem("session");
    let parsedData;

    if (!dataSession) {
      if (questionsData.length === 0) {
        fetch(LINKS.questions)
          .then((r) => r.json())
          .then((data) => {
            parsedData = data;
            sessionStorage.setItem("session", JSON.stringify(data));
            setQuestionsData(parsedData);
            setQuestionsAndAnswers(getQuestionsAndAnswers(parsedData));
          })
          .catch((error) => console.error("Error:", error));
      }
    } else {
      parsedData = JSON.parse(dataSession);
      setQuestionsData(parsedData);
      setQuestionsAndAnswers(getQuestionsAndAnswers(parsedData));
    }
    setIsLoading(false);
  }, []);

  const onAnswerSelected = (questionIndex: number, answer: string) => {
    questionsAndAnswers[questionIndex].selectedAnswer = answer;
    setQuestionsAndAnswers(questionsAndAnswers);
  };

  const onCheckAnswer = () => {
    const notAllSelected = currentQuestions.some(
      (element) => element.selectedAnswer === ""
    );
    setShowWarning(notAllSelected);
    if (!notAllSelected) {
      setShowResult(prevResult => {
        const newResult = [...prevResult];
        newResult[currentPage] = true;
        return newResult;
      })
    }
  };

  return (
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        {isLoading ? [...Array(QUESTIONS_PER_PAGE)].map((_, i) => <SkeletonLoader
          key={i}/>) : currentQuestions.map((question, index) => (
          <Question
            key={index}
            questionType={question}
            onAnswerSelected={onAnswerSelected}
            showResult={showResult[currentPage]}
          />
        ))}
        {showWarning && (
          <CustomDialog
            showWarning={showWarning}
            setShowWarning={setShowWarning}
          />
        )}
        <div className="space-x-5 flex justify-end">
          <Button className={`border-2 border-black my-8 px-3 rounded-xl ${currentPage === 0 ? "opacity-0" : ""}`}
                  onClick={() => toCurrentPage(currentPage - 1)} disabled={currentPage === 0}>
            <ArrowLeft></ArrowLeft>
          </Button>
          <Button
            className="my-8 border-2 border-yellow-600 bg-[#f7b136] px-8 py-2 text-lg rounded-xl font-bold hover:bg-[#f7b136]/90"
            onClick={onCheckAnswer}
          >
            Kiểm tra
          </Button>
          <Button
            className={`my-8 border-2 border-black px-3 text-lg rounded-xl ${currentPage === totalPages - 1 ? "opacity-0" : ""}`}
            onClick={() => toCurrentPage(currentPage + 1)} disabled={currentPage === totalPages - 1}>
            <ArrowRight></ArrowRight>
          </Button>
        </div>
      </div>
    </div>
  );
};
