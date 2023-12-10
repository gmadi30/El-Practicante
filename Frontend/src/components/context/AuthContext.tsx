import { createContext, useContext, FC, ReactNode, useState } from "react";

type AuthContextType = {
  studentId: number;
  getStudentId: (studentId: number) => void;
  isLoggedIn: boolean;
  updateLoginStatus: (status: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentId, setStudentId] = useState(0);

  const updateLoginStatus = (status: boolean) => {
    setIsLoggedIn(status);
  };

  const getStudentId = (studentId: number) => {
    setStudentId(studentId);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, updateLoginStatus, studentId, getStudentId }}
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
