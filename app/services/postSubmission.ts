import { LINKS } from "../utils/config";

export const postSubmission = async (
  submission: {
    id: number;
    selectedAnswerIndex: number;
  }[],
) => {
  const response = await fetch(`${LINKS.questions}/api/submissions`, {
    method: "POST",
    body: JSON.stringify(submission),
  });

  return response.json();
};
