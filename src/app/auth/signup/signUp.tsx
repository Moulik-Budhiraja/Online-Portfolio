"use server";

import { prisma } from "@/db";
import bcrypt from "bcrypt";

export default async function signUp(
  name: string,
  username: string,
  password: string
) {
  if (!name || !username || !password) return null;
  if (password.length < 8) return null;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: username,
        role: "USER",
        auth: {
          create: {
            passwordHash: hashedPassword,
          },
        },
      },
    });

    return newUser;
  } catch (e) {
    return null;
  }
}
