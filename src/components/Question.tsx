import { Button, Radio, RadioGroup } from "@headlessui/react";
import { useState } from "react";
import type { QuestionType } from "../types/question";

interface QuestionProps {
  questionType: QuestionType;
}

export const Question = (props: QuestionProps) => {
  const [selected, setSelected] = useState<string>("");

  return (
    <div>
      <div className="font-bold">Câu 1: {props.questionType.question}</div>
      <RadioGroup className="flex-1" name="answer" value={selected} onChange={setSelected}>
        {props.questionType.answers.map((answer) => (
          <Radio
            key={answer}
            value={answer}
            onClick={() => {
              if (answer === props.questionType.correctAnswer) {
                console.log(selected);
              }
            }}
            className="group flex cursor-pointer rounded-xl border-zinc-300 bg-zinc-200/20 border-2 py-2 px-2 my-3
            text-black shadow-lg transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white
            data-[checked]:border-yellow-500/60 data-[checked]:font-medium data-[checked]:bg-yellow-400/50 "
          >
            <div>{answer}</div>
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
};
