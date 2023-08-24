"use server";

import { prisma } from "@/db";
import { requireAdmin } from "../user/requireAdmin";

export async function createBlog(
  title: string,
  slug: string,
  description: string
) {
  const user = await requireAdmin();

  const blog = await prisma.blog.create({
    data: {
      title,
      slug,
      description,
      author: {
        connect: {
          id: user.id,
        },
      },
      draft: {
        create: {
          content: "",
        },
      },
    },
  });

  return blog;
}
