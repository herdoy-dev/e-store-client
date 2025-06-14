"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import Session from "../schemas/session";

const getSession = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    const user = jwtDecode<Session>(token);
    return { ...user, token };
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};

export default getSession;
