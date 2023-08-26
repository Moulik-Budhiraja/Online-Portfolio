"use server";

import { prisma } from "@/db";
import { requireAdmin } from "../user/requireAdmin";

export async function deleteBlog(blogId: string) {
  const user = await requireAdmin();

  const blog = await prisma.blog.delete({
    where: {
      id: blogId,
      authorId: user.id,
    },
  });

  return blog;
}
