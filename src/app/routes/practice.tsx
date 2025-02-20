import { styles } from "../../styles.tsx";
import { useEffect, useState } from "react";
import { QuestionType } from "../../types/question";
import { Question } from "../../components/question-ui.tsx";
import { Button } from "@headlessui/react";
import { CustomDialog } from "../../components/custom-dialog.tsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  useNavigate,
  useLoaderData,
  LoaderFunctionArgs,
} from "react-router-dom";
import { shuffle } from "../../utils/random.ts";
import { getQuestions } from "../../services/getQuestions.ts";
import { postSubmission } from "../../services/postSubmission.ts";

const QUESTIONS_PER_PAGE = 10;

const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const currentPage = +(url.searchParams.get("page") || 0);
  const questionData = await getQuestions(currentPage);
  return { currentPage, questionData };
};

const getQuestionsAndAnswers = (
  data: any[],
  currentPage: number,
): QuestionType[] => {
  return data.map((questionData, id: number) => ({
    id: currentPage * QUESTIONS_PER_PAGE + id,
    question: questionData.question,
    answers: shuffle([
      {
        id: 0,
        content: questionData.correct_answer,
      },
      ...questionData.incorrect_answers.map(
        (content: string, index: number) => ({
          id: index + 1,
          content: content,
        }),
      ),
    ]),
    correctAnswer: questionData.correct_answer,
    selectedAnswerIndex: undefined,
  }));
};

const PracticePage = () => {
  const { currentPage, questionData } = useLoaderData() as {
    currentPage: number;
    questionData: any;
  };
  const { questions, meta } = questionData;
  const navigate = useNavigate();
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    QuestionType[]
  >([]);
  const [showResult, setShowResult] = useState<boolean[]>([]);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    setQuestionsAndAnswers(getQuestionsAndAnswers(questions, currentPage));
  }, [questions, currentPage]);

  const handleNavigation = (newPage: number) => {
    navigate(`/practice?page=${newPage}`);
  };

  const onAnswerSelected = (questionId: number, answerIndex: number) => {
    setQuestionsAndAnswers((prevQuestions) => {
      return prevQuestions.map((q) =>
        q.id === questionId ? { ...q, selectedAnswerIndex: answerIndex } : q,
      );
    });
  };

  const onCheckAnswer = async () => {
    const notAllSelected = questionsAndAnswers.some(
      (element) => element.selectedAnswerIndex === undefined,
    );
    setShowWarning(notAllSelected);
    if (!notAllSelected) {
      setShowResult((prevResult) => {
        const newResult = [...prevResult];
        newResult[currentPage] = true;
        return newResult;
      });

      const submission = questionsAndAnswers.map((question) => ({
        id: question.id,
        selectedAnswerIndex: question.answers[question.selectedAnswerIndex!].id,
      }));

      try {
        await postSubmission(submission);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        {questionsAndAnswers.map((question, index) => (
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
            currentQuestionsLength={questionsAndAnswers.length}
          />
        )}
        <div className="flex justify-center space-x-4">
          <Button
            className={`my-8 rounded-full border-2 border-zinc-600 px-2 data-[hover]:bg-gray-200/50 ${currentPage === 0 ? "opacity-0" : ""}`}
            onClick={() => handleNavigation(currentPage - 1)}
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
            className={`my-8 rounded-full border-2 border-zinc-600 px-2 data-[hover]:bg-gray-200/50 ${currentPage === meta.totalPages - 1 ? "opacity-0" : ""}`}
            onClick={() => handleNavigation(currentPage + 1)}
            disabled={currentPage === meta.totalPages - 1}
          >
            <ArrowRight></ArrowRight>
          </Button>
        </div>
      </div>
    </div>
  );
};

export { PracticePage, loader };
