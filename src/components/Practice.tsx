import { styles } from "../styles";
import { useEffect, useState } from "react";
import { QuestionType } from "../types/question";
import { shuffle } from "../utils/random";
import { Question } from "./Question";
import { Button } from "@headlessui/react";
import { CustomDialog } from "./CustomDialog";
import { LINKS } from "../utils/config";

export const Practice = () => {
  const [questionsData, setQuestionsData] = useState<any>([]);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    QuestionType[]
  >([]);
  const [showResult, setShowResult] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  useEffect(() => {
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

    let dataSession = sessionStorage.getItem("session");
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
  }, []);

  const onAnswerSelected = (questionIndex: number, answer: string) => {
    questionsAndAnswers[questionIndex].selectedAnswer = answer;
    setQuestionsAndAnswers(questionsAndAnswers);
  };

  const onCheckAnswer = () => {
    const notAllSelected = questionsAndAnswers.some(
      (element) => element.selectedAnswer === ""
    );
    setShowWarning(notAllSelected);
    setShowResult(!notAllSelected);
  };

  return (
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        {questionsAndAnswers.map((question, index) => (
          <Question
            key={index}
            questionType={question}
            onAnswerSelected={onAnswerSelected}
            showResult={showResult}
          />
        ))}
        {showWarning && (
          <CustomDialog
            showWarning={showWarning}
            setShowWarning={setShowWarning}
          />
        )}
        <div className="space-x-5">
          <Button
            className="my-8 bg-[#f7b136] px-10 py-2 text-lg rounded-xl text-gray-50 hover:bg-[#f7b136]/90"
            onClick={onCheckAnswer}
          >
            Kiểm tra
          </Button>
          <Button className="my-8 bg-[#f7b136] px-10 py-2 text-lg rounded-xl text-gray-50 hover:bg-[#f7b136]/90">
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  );
};
