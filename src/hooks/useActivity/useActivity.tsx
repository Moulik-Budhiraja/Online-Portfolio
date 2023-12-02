import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUser } from "@/serverFunctions/user/getUser";
import { logActivity } from "@/serverFunctions/log/logActivity";
import { usePathname } from "next/navigation";

export function useActivity() {
  const { data: session, status } = useSession();
  const currentPath = usePathname();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      getUser(session?.user?.email, "email").then((user) => {
        getActivity(user?.id);
      });
    }

    if (status === "unauthenticated") {
      getActivity();
    }
  }, [status, session?.user?.email, currentPath]);
}

function getActivity(userId?: string) {
  fetch("https://ipapi.co/json/")
    .then((response) => response.json())
    .then((data) => {
      console.log(
        "Activity",
        data.ip,
        data.country_name,
        data.region,
        data.city,
        data.timezone,
        window.location.pathname,
        navigator.userAgent
      );

      logActivity({
        ip: data.ip,
        country: data.country_name,
        region: data.region,
        city: data.city,
        timezone: data.timezone,
        path: window.location.pathname,
        userAgent: navigator.userAgent,
        userId,
      });
    });
}
