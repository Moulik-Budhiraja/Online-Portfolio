"use server";

import { prisma } from "@/db";
import { requireAdmin } from "../user/requireAdmin";

export async function deleteComment(id: string) {
  await requireAdmin();

  const comment = await prisma.comment.delete({
    where: {
      id: id,
    },
  });

  return comment;
}
