import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./home";
import { MonthlyListIdPage } from "./monthly-list/id";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/monthly-list/:listId",
    element: <MonthlyListIdPage />,
  },
]);

export default function AppRouter() {

  return <RouterProvider router={routes} />;
}
