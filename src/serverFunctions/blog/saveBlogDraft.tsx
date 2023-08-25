"use server";

import { prisma } from "@/db";
import { requireAdmin } from "../user/requireAdmin";

export async function saveBlogDraft(id: string, content: string) {
  const user = await requireAdmin();

  const blog = await prisma.blog.update({
    where: {
      id,
      authorId: user.id,
    },
    data: {
      draft: {
        update: {
          content,
        },
      },
    },
    include: {
      draft: true,
    },
  });

  return blog;
}
