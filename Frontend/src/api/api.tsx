import {
  CompanySortBy,
  CreateIntershipFromValues,
  LoginFormValues,
} from "../types/types";

const API_BASE_URL = "http://localhost:8080/api/v1";
export const getAuthToken = () => localStorage.getItem("authToken");
export const authToken = localStorage.getItem("authToken");

const fetchJson = async (url: string, options: {}) => {
  const response = await fetch(url, options);

  console.log("[API][fetchJson] - Response fetch data: ", response);

  if (!response.ok) {
    throw new Error(
      `HTTP error! Status: ${response.status}, Message: ${response.statusText}`
    );
  }
  return response;
};

// Login request
export const login = async (data: LoginFormValues) => {
  console.log("[API][login] - Input: ");
  const response = await fetchJson(`${API_BASE_URL}/students/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const bearerToken = response.headers.get("Authorization");

  if (null != bearerToken) {
    localStorage.setItem("authToken", bearerToken);
  } else {
    throw new Error(
      `EmptyToken error! Status: ${response.status}, Message: ${response.statusText}`
    );
  }
  console.log("[API][login] - Token: ", getAuthToken());
  console.log("[API][login] - Output: ", response);
  return response.json();
};

// Student data request
export const getStudentById = async (studentId: string) => {
  console.log("[API][getStudentById] - Input:", getAuthToken());
  const studentResponse = await fetchJson(
    `${API_BASE_URL}/students/${studentId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;",
      },
    }
  );
  if (!studentResponse.ok) {
    throw new Error(`HTTP error! Status: ${studentResponse.status}`);
  }
  console.log("[API][getStudentById] - Output:", studentResponse);
  return studentResponse.json();
};

// Retrieve all schools
export const getAllSchools = async () => {
  console.log("[API][getAllSchools] - Input:", getAuthToken());
  const schoolsResponse = await fetchJson(`${API_BASE_URL}/schools`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!schoolsResponse.ok) {
    throw new Error(`HTTP error! Status: ${schoolsResponse.status}`);
  }
  console.log("[API][getAllSchools] - Output:", schoolsResponse);
  return schoolsResponse.json();
};

// Retrieve all companies sorted by filter
export const getAllCompaniesSortedByFilter = async (
  filterBy: CompanySortBy
) => {
  console.log("[API][getAllCompaniesAlphabetically] - Input:", getAuthToken());
  const companiesResponse = await fetchJson(
    `${API_BASE_URL}/companies?sortBy=${filterBy}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!companiesResponse.ok) {
    throw new Error(`HTTP error! Status: ${companiesResponse.status}`);
  }
  console.log(
    "[API][getAllCompaniesAlphabetically] - Output:",
    companiesResponse
  );
  return companiesResponse.json();
};

// Retrieve all degrees
export const getAllDegrees = async () => {
  console.log("[API][getAllDegrees] - Input:", getAuthToken());
  const degreesResponse = await fetchJson(`${API_BASE_URL}/degrees`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!degreesResponse.ok) {
    throw new Error(`HTTP error! Status: ${degreesResponse.status}`);
  }
  console.log("[API][getAllDegrees] - Output:", degreesResponse);
  return degreesResponse.json();
};

// Retrieve all technologies
export const getAllTechnologies = async () => {
  console.log("[API][getAllTechnologies] - Input:", getAuthToken());
  const technologiesResponse = await fetchJson(
    `${API_BASE_URL}/internships/technologies`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!technologiesResponse.ok) {
    throw new Error(`HTTP error! Status: ${technologiesResponse.status}`);
  }
  console.log("[API][getAllTechnologies] - Output:", technologiesResponse);
  return technologiesResponse.json();
};

// Create an intership
export const postIntership = async (
  data: CreateIntershipFromValues,
  studentId: string
) => {
  console.log("[API][postInterships] - Input:", {
    intershipBody: data,
    studentId: studentId,
    token: getAuthToken(),
  });
  const createInternship = await fetch(`${API_BASE_URL}/internships`, {
    method: "POST",
    body: JSON.stringify({
      schoolId: data.schoolId,
      companyId: data.companyId,
      degreeId: data.degreeId,
      startDate: data.startDate,
      endDate: data.endDate,
      title: data.title,
      description: data.description,
      rating: data.rating,
      technologies: [data.technology1, data.technology2, data.technology3],
      summaryBest: [data.best1, data.best2, data.best3],
      summaryWorst: [data.worst1, data.worst2, data.worst3],
      studentId: studentId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!createInternship.ok) {
    throw new Error(`HTTP error! Status: ${createInternship.status}`);
  }

  console.log("[API][postInterships] - Output:", createInternship);
  return createInternship.json();
};

// Create a student
export const postStudent = async (data: FormData) => {
  console.log("[API][postStudent] - Input:", {
    studentBody: data,
  });

  const createStudentResponse = await fetch(`${API_BASE_URL}/students`, {
    method: "POST",
    body: data,
  });

  if (!createStudentResponse.ok) {
    throw new Error(`HTTP error! Status: ${createStudentResponse.status}`);
  }
  console.log("[API][postInterships] - Output:", createStudentResponse);
  return createStudentResponse.json();
};
