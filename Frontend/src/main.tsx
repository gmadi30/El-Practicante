import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/index.tsx";
import ErrorPage from "./routes/error-page.tsx";
import Companies from "./pages/Companies/index.tsx";
import Signup from "./pages/Register/index.tsx";
import Profile from "./pages/StudentProfile/index.tsx";
import Login from "./pages/Login/index.tsx";
import CompaniesProfile from "./pages/CompanyProfile/index.tsx";
import CreateReview from "./components/CreateReview.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/companies",
    element: <Companies />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    //student/id/profile
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    // /companies/id
    path: "/company-profile",
    element: <CompaniesProfile />,
  },
  {
    // /student/id/createReview
    path: "/create-review",
    element: <CreateReview />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
