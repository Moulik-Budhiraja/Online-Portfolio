import { getServerSession } from "next-auth/next";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center gap-4 justify-center h-screen absolute w-full left-0 top-0">
      <h1 className="font-display text-4xl text-neutral-100">Login</h1>
      <LoginForm></LoginForm>
    </div>
  );
}
