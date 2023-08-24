import { redirect } from "next/navigation";
import { getSessionUser } from "./getSessionUser";

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!(user?.role === "ADMIN")) {
    redirect("/auth/login");
  }

  return user;
}
