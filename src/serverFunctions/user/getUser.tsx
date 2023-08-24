"use server";

import { prisma } from "@/db";
import { User } from "@prisma/client";

async function getUser(id: string): Promise<User | null>;
async function getUser(email: string, by: "email"): Promise<User | null>;
async function getUser(identifier: string, by?: string): Promise<User | null> {
  if (by === "email") {
    return await prisma.user.findUnique({
      where: {
        email: identifier,
      },
    });
  } else {
    return await prisma.user.findUnique({
      where: {
        id: identifier,
      },
    });
  }
}

export { getUser };
