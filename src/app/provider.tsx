import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../utils/query-client";

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export { AppProvider };
