import axios, { AxiosRequestConfig } from "axios";

const httpInstance = axios.create({
  baseURL: "https://dummyjson.com",
});

const httpClient = async <T>(request: AxiosRequestConfig): Promise<T> => {
  const response = await httpInstance.request(request);
  return response.data;
};

export default httpClient;
