import { Radio, RadioGroup } from "@headlessui/react";
import { useState } from "react";
import type { QuestionType } from "../types/question";
import { radio } from "../styles";

interface QuestionProps {
  questionType: QuestionType;
  onAnswerSelected: (questionIndex: number, answer: string) => void;
  showResult: boolean;
}

export const Question = (props: QuestionProps) => {
  const [selected, setSelected] = useState<string>("");

  return (
    <div>
      <div className="font-bold">
        Câu {props.questionType.id + 1}: {props.questionType.question}
      </div>
      <RadioGroup
        className="flex-1"
        name="answer"
        value={selected}
        onChange={setSelected}
      >
        {props.questionType.answers.map((answer) => (
          <Radio
            key={answer}
            value={answer}
            onClick={() => {
              props.onAnswerSelected(props.questionType.id, answer);
              console.log(props.questionType);
            }}
            disabled={props.showResult}
            className={`group my-3 flex cursor-pointer rounded-xl border-2 px-2 py-2 text-black shadow-lg transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-black ${
              answer === props.questionType.selectedAnswer ? "font-medium" : ""
            } ${
              !props.showResult && answer === props.questionType.selectedAnswer
                ? radio.selected
                : ""
            } ${
              props.showResult && answer === props.questionType.correctAnswer
                ? radio.correct
                : ""
            } ${
              props.showResult &&
              answer === props.questionType.selectedAnswer &&
              answer !== props.questionType.correctAnswer
                ? radio.incorrect
                : ""
            } `}
          >
            <div>{answer}</div>
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
};
