import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./home";
import { MonthlyListPage } from "./monthly-list";
import { MonthlyListIdPage } from "./monthly-list/id";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    index: true,
  },
  {
    path: "/monthly-list",
    children: [
      {
        index: true,
        element: <MonthlyListPage />,
      },
      {
        path: ":listId",
        element: <MonthlyListIdPage />,
      },
    ],
  }
]);