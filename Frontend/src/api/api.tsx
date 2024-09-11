import {
  CompanySortBy,
  CreateIntershipFromValues,
  DeleteStudentFormValues,
  LoginFormValues,
} from "../types/types";
import { FetchError } from "../utils/errorUtils/errors";

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
  const loginResponse = await fetchJson(`${API_BASE_URL}/students/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!loginResponse.ok) {
    throw new FetchError({
      name: "FETCHING_DATA_ERROR",
      message: loginResponse.statusText,
      errorResponseCode: 0o0,
      status: loginResponse.status,
    });
  }

  const bearerToken = loginResponse.headers.get("Authorization");

  if (null != bearerToken) {
    localStorage.setItem("authToken", bearerToken);
  } else {
    throw new Error(
      `EmptyToken error! Status: ${loginResponse.status}, Message: ${loginResponse.statusText}`
    );
  }
  console.log("[API][login] - Token: ", getAuthToken());
  console.log("[API][login] - Output: ", loginResponse);
  return loginResponse.json();
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
        // Authorization: `Bearer ${getAuthToken()}`,
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
      selectedTechnologies: data.selectedTechnologies,
      summaryBest: [data.best1, data.best2, data.best3],
      summaryWorst: [data.worst1, data.worst2, data.worst3],
      studentId: studentId,
      isAnonymous: data.isAnonymous
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!createInternship.ok) {
    throw new Error(`HTTP error! Status: ${createInternship.status}`);
  }

  console.log("[API][postInterships] - Output:", createInternship);
  return createInternship.json();
};

// Update internship
export const updateIntership = async (
  data: CreateIntershipFromValues,
  studentId: string,
  internshipId: string
) => {
  console.log("[API][updateInternship] - Input:", {
    intershipBody: data,
    studentId: studentId,
    token: getAuthToken(),
  });
  const updateInternship = await fetch(
    `${API_BASE_URL}/internships/${internshipId}`,
    {
      method: "PUT",
      body: JSON.stringify({
        schoolId: data.schoolId,
        companyId: data.companyId,
        degreeId: data.degreeId,
        startDate: data.startDate,
        endDate: data.endDate,
        title: data.title,
        description: data.description,
        rating: data.rating,
        selectedTechnologies: data.selectedTechnologies,
        summaryBest: [data.best1, data.best2, data.best3],
        summaryWorst: [data.worst1, data.worst2, data.worst3],
        studentId: studentId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );
  if (!updateInternship.ok) {
    throw new Error(`HTTP error! Status: ${updateInternship.status}`);
  }

  console.log("[API][postInterships] - Output:", updateInternship);
  return updateInternship;
};

// Retrieve internship by Id
export const getInternshipById = async (internshipId: string) => {
  console.log("[API][getInternshipById] - Input:", getAuthToken());
  const internshipResponse = await fetchJson(
    `${API_BASE_URL}/internships/${internshipId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );
  if (!internshipResponse.ok) {
    throw new Error(`HTTP error! Status: ${internshipResponse.status}`);
  }
  console.log("[API][getInternshipById] - Output:", internshipResponse);
  return internshipResponse.json();
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
    const responseJson = await createStudentResponse.json();
    console.log(`HTTP error! Status: `, responseJson);
    throw new FetchError({
      name: "FETCHING_DATA_ERROR",
      message: responseJson.message,
      errorResponseCode: responseJson.errorResponseCode,
      status: responseJson.status,
    });
  }
  console.log("[API][postStudent] - Output:", createStudentResponse);
  return createStudentResponse.json();
};

// Update a student
export const updateStudent = async (data: FormData) => {
  console.log("[API][updateStudent] - Input:", {
    studentBody: data,
  });

  const updateStudentResponse = await fetch(`${API_BASE_URL}/students`, {
    method: "PUT",
    body: data,
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!updateStudentResponse.ok) {
    const responseJson = await updateStudentResponse.json();
    console.log(`HTTP error! Status: `, responseJson);
    throw new FetchError({
      name: "FETCHING_DATA_ERROR",
      message: responseJson.message,
      errorResponseCode: responseJson.errorResponseCode,
      status: responseJson.status,
    });
  }
  console.log("[API][updateStudent] - Output:", updateStudentResponse);
  return updateStudentResponse.json();
};

// Delete a student
export const deleteStudent = async (
  studentId: string,
  data: DeleteStudentFormValues
) => {
  console.log("[API][deleteStudent] - Input:", {
    deleteBody: data,
  });

  const deleteStudent = await fetch(`${API_BASE_URL}/students/${studentId}`, {
    method: "DELETE",
    body: JSON.stringify({
      feedback: data.feedback,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!deleteStudent.ok) {
    const responseJson = await deleteStudent.json();
    console.log(`HTTP error! Status: `, responseJson);
    throw new FetchError({
      name: "FETCHING_DATA_ERROR",
      message: responseJson.message,
      errorResponseCode: responseJson.errorResponseCode,
      status: responseJson.status,
    });
  }
  console.log("[API][deleteStudent] - Output:", deleteStudent);
  return deleteStudent;
};
