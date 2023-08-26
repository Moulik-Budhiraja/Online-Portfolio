"use client";

import Link from "next/link";
import { ReactNode } from "react";

type LinkNavProps = {
  children?: ReactNode;
  href: string;
  className?: string;
  target?: string;
};

export default function LinkNav({
  href,
  className,
  target,
  children,
}: LinkNavProps) {
  return (
    <Link
      href={href}
      target={target}
      className={`font-display text-xl text-neutral-400 hover:text-neutral-100 transition-colors duration-300 ease-out ${
        className ?? ""
      }`}
    >
      {children}
    </Link>
  );
}
