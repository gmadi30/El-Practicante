import { createContext, useContext, FC, ReactNode, useState } from "react";
import { getAuthToken } from "../../api/api";

type AuthContextType = {
  authenticated: boolean;
  studentId: number;
  updateAuthenticatedUserID: (studentId: number) => void;
  updateUserAuthentication: (status: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(getAuthToken() !== null);
  const [studentId, setStudentId] = useState(() => {
    return parseInt(localStorage.getItem("studentId") || "0");
  });

  const updateUserAuthentication = (status: boolean) => {
    setAuthenticated(status);
  };

  const updateAuthenticatedUserID = (studentId: number) => {
    setStudentId(studentId);
    localStorage.setItem("studentId", studentId.toString());
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        updateUserAuthentication,
        studentId,
        updateAuthenticatedUserID,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
