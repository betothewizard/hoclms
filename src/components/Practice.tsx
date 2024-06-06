import { styles } from "../styles";
import { useEffect, useState } from "react";
import { QuestionType } from "../types/question";
import { shuffle } from "../utils/random";
import { Question } from "./Question";
import { Button } from "@headlessui/react";

export const Practice = () => {
  const [questionsData, setQuestionsData] = useState<any>([]);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    QuestionType[]
  >([]);

  useEffect(() => {
    if (questionsData.length === 0) {
      fetch("https://hocluatmesay.betothew.workers.dev")
        .then((r) => r.json())
        .then((data) => {
          setQuestionsData(data);
          setQuestionsAndAnswers(
            data.map((questionData: any) => {
              return {
                question: questionData.question,
                answers: shuffle([
                  ...questionData.incorrect_answers,
                  questionData.correct_answer,
                ]),
                correctAnswer: questionData.correct_answer,
              };
            })
          );
        })
        .catch((error) => console.error("Error:", error));
    }
  });

  return (
    <div className={`${styles.paddingX}`}>
      <div className={`${styles.boxWidth}`}>
        {questionsAndAnswers.map((question, index) => (
          <Question key={index} questionType={question} />
        ))}
        <div className="space-x-5">
          <Button className="my-8 bg-[#f7b136] px-10 py-2 text-lg rounded-xl text-gray-50 hover:bg-[#f7b136]/90">
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
