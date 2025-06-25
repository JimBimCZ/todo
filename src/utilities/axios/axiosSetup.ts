import axios from "axios";

export const baseUrl = "http://localhost:8080";

export const customFetch = axios.create({
  baseURL: baseUrl,
});
