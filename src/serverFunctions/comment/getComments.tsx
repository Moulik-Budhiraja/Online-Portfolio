"use server";

import { prisma } from "@/db";

export async function getComments(
  blogId: string,
  parentId: string | null = null,
  onlyId: boolean = false,
  limit: number = 25
) {
  if (onlyId) {
    const comments = await prisma.comment.findMany({
      where: {
        blogId: blogId,
        parentId: parentId,
      },
      select: {
        id: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      take: limit,
    });

    return comments;
  }

  const comments = await prisma.comment.findMany({
    where: {
      blogId: blogId,
      parentId: parentId,
    },
    include: {
      children: true,
    },
    orderBy: {
      createdAt: "asc",
    },
    take: limit,
  });

  return comments;
}
