"use server";

import { prisma } from "@/db";

export async function handleNewComment(data: FormData) {
  const blogId = data.get("blogId") as string;
  const parentId = (data.get("parentId") as string) || null;
  const name = data.get("name") as string;
  const title = data.get("title") as string;
  const body = data.get("body") as string;

  console.log(data);

  const comment = await prisma.comment.create({
    data: {
      blogId,
      parentId,
      name,
      title,
      content: body,
    },
  });

  return { comment };
}
