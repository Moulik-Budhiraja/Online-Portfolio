"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

type LogoutLinkProps = {
  session: Session;
};

export default function LogoutLink({ session }: LogoutLinkProps) {
  return (
    session &&
    session.user && (
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();

          signOut({
            callbackUrl: "/",
          });
        }}
        className="font-display text-xl text-neutral-400 absolute top-4 right-8 hover:text-neutral-100 transition-colors duration-300 ease-out"
      >
        Logout: {session.user.name}
      </Link>
    )
  );
}
