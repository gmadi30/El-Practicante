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
  school: string;
  degree: string;
  companyName: string;
  city: string;
  autonomousCommunity: string;
  zipCode: string;
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
  name: string;
  lastName: string;
  companyName: string;
  schoolDTO: {
    id: Number;
    name: string;
  };
  degreeDTO: {
    id: Number;
    name: string;
  };
  interships: Intership[];
};

// Intership Type
export type Intership = {
  id: Number;
  description: string;
  startDate: Date;
  endDate: Date;
  rating: Number;
  degreeName: string;
  schoolName: string;
  company: Company;
  technologies: Technology[];
};

// Company Type
export type Technology = {
  name: string;
};

// Company Type
export type Company = {
  companyId: Number;
  companyName: string;
  rating: number;
  city: string;
  autonomousCommunity: string;
  intershipsAmount: number;
};

export type FilterParams =
  | "alphabetically"
  | "reviews"
  | "scoring"
  | "reviewsDesc"
  | "scoringDesc";
