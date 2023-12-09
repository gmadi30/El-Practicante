// Register types
export type RegisterFormValues = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: string;
  dni: string;
  mobile: string;
  schoolId: string;
  degreeId: string;
  companyId: string;
  city: string;
  autonomousCommunity: string;
  zipCode: string;
  profilePicture: string;
};

// Login types
export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginResponse = {
  studentId: string;
};

// Student type
export type Student = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  city: string;
  autonomousCommunity: string;
  mobile: string;
  companyName: string;
  profilePictureName: string;
};

export type StudentProfile = {
  student: Student;
  school: School;
  degree: Degree;
  internships: Internship[];
  profilePicture: {
    name: string;
  };
};

// Intership Type
export type Internship = {
  id: Number;
  description: string;
  startDate: string;
  endDate: Date;
  rating: number;
  degree: Degree;
  school: School;
  company: Company;
  summarizeList: Summary[];
  technologyList: Technology[];
  student: Student;
};

export type Summary = {
  name: string;
  type: string;
};

export type Technology = {
  name: string;
};

// Company Type
export type Company = {
  companyId: number;
  companyName: string;
  rating: number;
  city: string;
  autonomousCommunity: string;
  intershipsAmount: number;
  aboutUs: string;
  email: string;
  interships: Internship[];
};

export type CompanyProfileType = {
  aboutUs: string;
  city: string;
  autonomousCommunity: string;
  email: string;
  employeesAmount: number;
  internships: Internship[];
  companyId: number;
  name: string;
  rating: number;
  whyUs: string;
  website: string;
  intershipsAmount: number;
};

export type FilterParams =
  | "alphabetically"
  | "reviews"
  | "scoring"
  | "reviewsDesc"
  | "scoringDesc";

// School type
export type School = {
  id: number;
  name: string;
};

// Degree type
export type Degree = {
  id: number;
  name: string;
};
