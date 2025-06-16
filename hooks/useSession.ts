"use client";

import getSession from "@/actions/get-session";
import Session from "@/schemas/session";
import { useEffect, useState } from "react";

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSession = async () => {
      try {
        const data = await getSession();
        if (isMounted) {
          setSession(data);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch session:", err);
          setError("Invalid session");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSession();

    return () => {
      isMounted = false;
    };
  }, []);

  return { session, loading, error };
};

export default useSession;
