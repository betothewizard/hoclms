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
import { useLocation, useNavigate } from "react-router-dom";

const QUESTIONS_PER_PAGE = 10;

export const Practice = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  const startQuestionIndex =
    (currentPage * QUESTIONS_PER_PAGE) % totalQuestions;
  const endQuestionIndex = startQuestionIndex + QUESTIONS_PER_PAGE;
  const currentQuestions = questionsAndAnswers.slice(
    startQuestionIndex,
    endQuestionIndex,
  );
  const toCurrentPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get("page") || "");
    if (!isNaN(page) && page >= 0 && page < totalPages) {
      toCurrentPage(page);
    }
  });

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
      (element) => element.selectedAnswer === "",
    );
    setShowWarning(notAllSelected);
    if (!notAllSelected) {
      setShowResult((prevResult) => {
        const newResult = [...prevResult];
        newResult[currentPage] = true;
        return newResult;
      });
    }
  };

  return (
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        {isLoading
          ? [...Array(QUESTIONS_PER_PAGE)].map((_, i) => (
              <SkeletonLoader key={i} />
            ))
          : currentQuestions.map((question, index) => (
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
            currentQuestionsLength={currentQuestions.length}
          />
        )}
        <div className="flex justify-center space-x-7">
          <Button
            className={`my-8 rounded-full border-2 border-zinc-600 px-2 data-[hover]:bg-gray-200/50 ${currentPage === 0 ? "opacity-0" : ""}`}
            onClick={() => {
              navigate(`?page=${currentPage - 1}`);
            }}
            disabled={currentPage === 0}
          >
            <ArrowLeft></ArrowLeft>
          </Button>
          <Button
            className="my-8 rounded-xl border border-[#ef8e1e]/50 bg-[#f7b136] px-7 py-2 text-lg text-white hover:bg-[#f7b136]/90"
            onClick={onCheckAnswer}
          >
            Kiểm tra
          </Button>
          <Button
            className={`my-8 rounded-full border-2 border-zinc-600 px-2 data-[hover]:bg-gray-200/50 ${currentPage === totalPages - 1 ? "opacity-0" : ""}`}
            onClick={() => {
              navigate(`?page=${currentPage + 1}`);
            }}
            disabled={currentPage === totalPages - 1}
          >
            <ArrowRight></ArrowRight>
          </Button>
        </div>
      </div>
    </div>
  );
};
