"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { signIn } from "next-auth/react";
import signUp from "./signUp";

export default function SignUpForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = e.currentTarget.usersName.value;
    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;
    const confirmPassword = e.currentTarget.confirmPassword.value;

    if (password !== confirmPassword) {
      return;
    }

    const user = await signUp(name, username, password);

    if (!user) return;

    signIn("credentials", {
      username: username,
      password: password,
      callbackUrl: process.env.NEXTAUTH_URL,
    });
  };

  return (
    <form
      method="post"
      className={`flex mx-auto flex-col gap-4 items-center max-w-sm w-1/2`}
      onSubmit={handleSubmit}
    >
      <Input placeholder="Name" name="usersName" className="w-full"></Input>
      <Input
        placeholder="Email"
        name="username"
        type="email"
        className="w-full"
      ></Input>
      <Input
        placeholder="Password"
        name="password"
        type="password"
        className="w-full"
      ></Input>
      <Input
        placeholder="Confirm Password"
        name="confirmPassword"
        type="password"
        className="w-full"
      ></Input>
      <Button className="w-[10rem]">Sign Up</Button>
    </form>
  );
}
