import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  if (!session || !session.user || !session.user.email) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (user?.role !== "ADMIN") {
    return redirect("/");
  }

  return <div className="max-w-7xl mx-auto">{children}</div>;
}
