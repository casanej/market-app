import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./home";
import { MonthlyListPage } from "./monthly-list";
import { MonthlyListIdPage } from "./monthly-list/id";

/* export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    index: true,
  },
  {
    path: "monthly-list",
    element: <MonthlyListPage />,
    children: [
      {
        path: "/monthly-list",
        id: "listId",
        element: <MonthlyListIdPage />,
      },
    ],
  }
]); */

export const AppRoutes = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/monthly-list" element={<MonthlyListPage />}>
        <Route path=":listId" element={<MonthlyListIdPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
}