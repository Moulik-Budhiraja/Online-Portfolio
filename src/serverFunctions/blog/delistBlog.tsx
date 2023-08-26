"use server";

import { prisma } from "@/db";
import { requireAdmin } from "../user/requireAdmin";

export async function delistBlog(blogId: string) {
  const user = await requireAdmin();

  const blog = await prisma.blog.update({
    where: {
      id: blogId,
      authorId: user.id,
    },
    data: {
      published: false,
    },
  });

  return blog;
}
