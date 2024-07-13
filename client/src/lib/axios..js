import axios from "axios";
import token from "./utilities";
import { v4 as uuidv4 } from "uuid";

const defaultHeaders = (contentType = "application/json") => {
  return {
    "X-Request-Id": uuidv4(),
    "Content-Type": contentType,
    "Accept-Language": "es-US",
    Accept: "application/json",
    Authorization: "Bearer " + token.getAuthToken(),
  };
};

const client = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 30000,
});

const instance = {
  client,
  defaultHeaders,
  publicHeaders,
};

export default instance;
