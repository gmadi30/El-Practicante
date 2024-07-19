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
  privacyPolicy: Boolean;
};

// UpdateStudentFromValues
export type UpdateStudentFromValues = {
  studentId: number;
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

// DeleteStudentAccount
export type DeleteStudentFormValues = {
  removeAccountAgreement: Boolean;
  feedback: string;
};

// Login types
export type LoginFormValues = {
  studentEmail: string;
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
  company: Company;
  profilePictureName: string;
  birthday: string;
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
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
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
  id: number;
  name: string;
};

// Company Type
export type Company = {
  companyId: number;
  companyName: string;
  rating: number;
  city: string;
  email: string;
  autonomousCommunity: string;
  intershipsAmount: number;
  aboutUs: string;
  whyUs: string;
  website: string;
  internships: Internship[];
  employeesAmount: string;
};

export type CompanyResponse = {
  company: Company;
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

// Enum to sort a list of companies
export enum CompanySortBy {
  ALPHABETICALLY = "ALPHABETICALLY",
  REVIEWS = "REVIEWS",
  SCORING = "SCORING",
  REVIEWSDESC = "REVIEWSDESC",
  SCORINGDESC = "SCORINGDESC",
}

export enum BooleanMappingConstants {
  TRUE = "TRUE",
  FALSE = "FALSE",
}

export type ErrorName = "FETCHING_DATA_ERROR";

// FormValues to create an intership
export type CreateIntershipFromValues = {
  schoolId: string;
  companyId: string;
  degreeId: string;
  startDate: string;
  endDate: string;
  title: string;
  description: string;
  rating: string;
  selectedTechnologies: Technology[];
  best1: string;
  best2: string;
  best3: string;
  worst1: string;
  worst2: string;
  worst3: string;
};

export type ErrorResponseType = {
  status: string;
  message: string;
  errorResponseCode: number;
};
