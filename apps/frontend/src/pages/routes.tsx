import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./home";
import { MonthlyListPage } from "./monthly-list";
import { MonthlyListIdPage } from "./monthly-list/id";
import { LoginPage } from "./login";
import { ProductRegisterPage } from "./products/register";
import { ProductListPage } from "./products/list";
import { ProductCodePage } from "./products/code";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    index: true,
  },
  {
    path: "/login",
    element: <LoginPage />,
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
  },
  {
    path: "/product",
    children: [
      {
        index: true,
        element: <ProductListPage />,
      },
      {
        path: ":code",
        element: <ProductCodePage />,
      },
      {
        path: "register",
        element: <ProductRegisterPage />,
      },
    ],
  }
]);