import { Field, Input, Label, Radio, RadioGroup } from "@headlessui/react";
import { useState } from "react";

interface QuestionProps {
  question: string;
  answers: string[];
  selectedAnswer: string;
  correctAnswer: string;
  updateAnswer: any;
  result: boolean;
}

export const Question = (props: QuestionProps) => {
  const [selected, setSelected] = useState<string>("");
  return (
    <div>
      <div>Câu 1: {props.question}</div>
      <RadioGroup name="answer" value={selected} onChange={setSelected}>
        {props.answers.map((answer) => (
          <Field key={answer}>
            <Radio onClick={() => console.log(answer)} value={answer}/>
            <Label className="hover:cursor-pointer">{answer}</Label>
          </Field>
        ))
        }
      </RadioGroup>

    </div>
  );
}