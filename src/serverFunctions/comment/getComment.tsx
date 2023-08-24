"use server";

import { prisma } from "@/db";

export async function getComment(id: string) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: id,
    },
    include: {
      children: true,
    },
  });

  return comment;
}
