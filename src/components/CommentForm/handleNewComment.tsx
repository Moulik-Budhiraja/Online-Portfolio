"use server";

import { prisma } from "@/db";
import { getSessionUser } from "@/serverFunctions/user/getSessionUser";

export async function handleNewComment(data: FormData) {
  const blogId = data.get("blogId") as string;
  const parentId = (data.get("parentId") as string) || null;
  const name = data.get("name") as string;
  const title = data.get("title") as string;
  const body = data.get("body") as string;

  const user = await getSessionUser();

  const parent = parentId
    ? {
        parent: {
          connect: {
            id: parentId,
          },
        },
      }
    : {};

  const comment = await prisma.comment.create({
    data: {
      name,
      title,
      content: body,
      blog: {
        connect: {
          id: blogId,
        },
      },
      ...parent,
      author: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  return { comment };
}
