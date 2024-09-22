import { LINKS } from "../utils/config";

export const getQuestions = async (page: number) => {
  const response = await fetch(
    `${LINKS.questions}/api/questions?page=${page}`,
    {
      method: "GET",
    },
  );
  const data = await response.json();

  return data;
};
