import { LoginFormValues } from "../types/types";

const API_BASE_URL = "http://localhost:8080/api/v1";
const authToken = localStorage.getItem("authToken");

export const fetchJson = async (url: string, options: {}) => {
  const response = await fetch(url, options);
  console.log("[API][fetchJson] - Response fetch data: ", response);
  if (!response.ok) {
    throw new Error(
      `HTTP error! Status: ${response.status}, Message: ${response.statusText}`
    );
  }
  return response.json();
};

export const login = async (data: LoginFormValues) => {
  return fetchJson(`${API_BASE_URL}/students/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
