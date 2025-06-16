import getSession from "@/actions/get-session";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
  const token = await getSession();
  config.headers["x-auth-token"] = token ? token.token : "";
  return config;
});

export default instance;
