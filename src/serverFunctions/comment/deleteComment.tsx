"use server";

import { prisma } from "@/db";
import { getSessionUser } from "../user/getSessionUser";

export async function deleteComment(id: string) {
  const user = await getSessionUser();

  let comment;

  if (user?.role === "ADMIN") {
    comment = await prisma.comment.delete({
      where: {
        id: id,
      },
    });
  } else {
    comment = await prisma.comment.update({
      where: {
        id: id,
        authorId: user?.id,
      },
      data: {
        name: "[Deleted]",
        title: "[Deleted]",
        content: "[Deleted]",
        deleted: true,
      },
      include: {
        children: true,
      },
    });

    if (comment.children.length === 0) {
      comment = await prisma.comment.delete({
        where: {
          id: id,
        },
      });
    }
  }

  const comments = await prisma.comment.findMany({
    where: {
      deleted: true,
    },
    include: {
      children: true,
    },
  });

  for (const comment of comments) {
    if (comment.children.length === 0) {
      await prisma.comment.delete({
        where: {
          id: comment.id,
        },
      });
    }
  }

  return comment;
}
