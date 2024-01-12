import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/index.tsx";
import ErrorPage from "./components/ui/shared/error-page.tsx";
import Companies from "./pages/Companies/index.tsx";
import Profile from "./pages/StudentProfile/index.tsx";
import Login from "./pages/Login/index.tsx";
import CompaniesProfile from "./pages/CompanyProfile/index.tsx";
import Register from "./pages/Register/index.tsx";
import NavbarLayout from "./components/ui/navbar/NavbarLayout.tsx";
import { AuthProvider } from "./components/context/AuthContext.tsx";
import CreateReview from "./pages/CreateReview/index.tsx";
import React from "react";

const router = createBrowserRouter([
  {
    element: <NavbarLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "company/companies",
        element: <Companies />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        //student/id/profile
        path: "student/:studentId/profile",
        element: <Profile />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        // /companies/id
        path: "companies/:companyId/profile",
        element: <CompaniesProfile />,
      },
      {
        // /student/id/createReview
        path: "student/:studentId/create-review",
        element: <CreateReview />,
      },
      {
        // /student/id/createReview
        path: "/*",
        element: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
