import axios from "axios";

export const useAxios = () =>
  axios.create({ baseURL: "http://localhost:3001" });
