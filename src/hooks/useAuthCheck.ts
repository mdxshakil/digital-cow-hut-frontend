"use client";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";
import useGetUserFromStore from "./useGetUserFromStore";
import { useAppSelector } from "@/redux/hooks";

//this hook is used to protect routes. We can protect a route when the user is not logged in and we also can protect a route by the user role

export const useAuthCheck = (permittedRole?: string) => {
  const { role, userId } = useGetUserFromStore();
  const { isLoading } = useAppSelector((state) => state.auth);
  useLayoutEffect(() => {
    if (!userId && !isLoading) {
      redirect("/login");
    }
    if (permittedRole && permittedRole !== role && !isLoading) {
      redirect("/login");
    }
  }, [userId, role, permittedRole, isLoading]);
  return { isLoading };
};
