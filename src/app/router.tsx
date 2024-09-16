import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./layout.tsx";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          lazy: async () => {
            const { LandingPage } = await import("./routes/landing-page.tsx");
            return { element: <LandingPage /> };
          },
        },
        {
          path: "/practice",
          lazy: async () => {
            const { PracticePage } = await import("./routes/practice.tsx");
            return { element: <PracticePage /> };
          },
        },
        {
          path: "*",
          lazy: async () => {
            const { NotFoundPage } = await import("./routes/not-found.tsx");
            return { element: <NotFoundPage /> };
          },
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export { AppRouter };
