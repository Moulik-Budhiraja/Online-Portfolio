import { getUser } from "@/serverFunctions/user/getUser";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState<User>();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      getUser(session?.user?.email, "email").then((user) => {
        user && setUser(user);
      });
    }
  }, [status, session?.user?.email]);

  return user;
}
