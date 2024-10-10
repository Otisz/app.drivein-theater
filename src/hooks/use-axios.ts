"use client";

import axios, { type AxiosError } from "axios";
import { signOut, useSession, UseSessionOptions } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type Props = {
  session?: UseSessionOptions<boolean>;
};

export default function useAxios(props?: Props) {
  const session = useSession(props?.session);
  const pathname = usePathname();

  return useMemo(() => {
    const client = axios.create({
      baseURL: process.env["NEXT_PUBLIC_API_URL"],
      headers: {
        Accept: "application/json",
      },
    });

    client.interceptors.request.use((config) => {
      if (session?.data?.accessToken) {
        config.headers.Authorization = `Bearer ${session?.data?.accessToken}`;
      }
      return config;
    });

    client.interceptors.response.use(
      (response) => response,
      async (e) => {
        const error = e as AxiosError;

        if (error.response && error.response.status === 401) {
          await signOut({
            redirect: true,
            callbackUrl: pathname,
          });
          return Promise.reject("Unauthorized");
        }

        return Promise.reject(error);
      },
    );

    return client;
  }, [pathname, session?.data?.accessToken]);
}
