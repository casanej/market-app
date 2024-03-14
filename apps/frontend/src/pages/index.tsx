import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./home";
import { MonthlyListPage } from "./monthly-list";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/monthly-list",
    element: <MonthlyListPage />,
  },
]);

export default function AppRouter() {

  return <RouterProvider router={routes} />;
}
