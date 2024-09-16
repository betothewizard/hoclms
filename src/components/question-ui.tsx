import { Radio, RadioGroup } from "@headlessui/react";
import { useState } from "react";
import type { QuestionType } from "../types/question";
import { radio } from "../styles";

interface QuestionProps {
  questionType: QuestionType;
  onAnswerSelected: (questionIndex: number, answerIndex: number) => void;
  showResult: boolean;
}

const Question = (props: QuestionProps) => {
  const { questionType, onAnswerSelected, showResult } = props;
  const [selected, setSelected] = useState<string>("");
  const isIncorrect =
    showResult &&
    questionType.selectedAnswerIndex !== undefined &&
    questionType.answers[questionType.selectedAnswerIndex].content !==
      questionType.correctAnswer;
  return (
    <div>
      <div className="font-bold">
        Câu {questionType.id + 1}: {questionType.question}{" "}
        <span className="text-red-500">{isIncorrect && "(x)"} </span>
      </div>
      <RadioGroup
        className="flex-1"
        name="answer"
        value={selected}
        onChange={setSelected}
      >
        {questionType.answers.map((answer, answerIndex) => (
          <Radio
            key={answer.id}
            value={answer.content}
            onClick={() => {
              onAnswerSelected(questionType.id, answerIndex);
            }}
            disabled={showResult}
            className={`group my-3 flex cursor-pointer rounded-xl border-2 px-2 py-2 text-black shadow-lg transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-black ${
              answerIndex === questionType.selectedAnswerIndex
                ? "font-medium"
                : ""
            } ${
              !showResult && answerIndex === questionType.selectedAnswerIndex
                ? radio.selected
                : ""
            } ${
              showResult && answer.content === questionType.correctAnswer
                ? radio.correct
                : ""
            } ${
              showResult &&
              answerIndex === questionType.selectedAnswerIndex &&
              answer.content !== questionType.correctAnswer
                ? radio.incorrect
                : ""
            } `}
          >
            <div>{answer.content}</div>
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
};

export { Question };
