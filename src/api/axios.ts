import { API_URL } from "./../constants/index";
import axios from "axios";

export const Axios = axios.create({
  baseURL: API_URL,
});
