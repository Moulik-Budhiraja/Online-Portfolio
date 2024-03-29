"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    signOut({
      callbackUrl: process.env.NEXTAUTH_URL,
    });
  }, []);

  return <h1>Logging Out...</h1>;
}
