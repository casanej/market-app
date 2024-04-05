import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

export default function AppRouter() {
  return <RouterProvider router={routes} />;
}
