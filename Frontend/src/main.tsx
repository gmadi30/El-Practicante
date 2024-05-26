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
import CreateInternship from "./pages/CreateInternship/index.tsx";
import React from "react";
import EditStudentProfile from "./pages/EditStudentProfile/index.tsx";
import DeleteStudentAccount from "./pages/DeleteStudentAccount/index.tsx";
import EditInternship from "./pages/EditInternship/index.tsx";

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
        //student/id/profile
        path: "student/:studentId/edit-profile",
        element: <EditStudentProfile />,
      },
      {
        //student/id/delete-account
        path: "student/:studentId/delete-account",
        element: <DeleteStudentAccount />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        // /companies/id
        path: "company/:companyId/profile",
        element: <CompaniesProfile />,
      },
      {
        // /student/id/create-internship
        path: "student/:studentId/create-internship",
        element: <CreateInternship />,
      },
      {
        // /student/studentId/edit-internship/internshipId
        path: "student/:studentId/edit-internship/:internshipId",
        element: <EditInternship />,
      },
      {
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
