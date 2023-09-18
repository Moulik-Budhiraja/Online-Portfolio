"use server";

import { prisma } from "@/db";
import { requireAdmin } from "../user/requireAdmin";

export async function createBlog(
  title: string,
  slug: string,
  description: string,
  className: string | null
) {
  const user = await requireAdmin();

  const blog = await prisma.blog.create({
    data: {
      title,
      slug,
      description,
      class: className,
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
