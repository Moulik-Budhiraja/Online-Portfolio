"use server";

import { prisma } from "@/db";
import { requireAdmin } from "../user/requireAdmin";
import md from "@/md_renderer";

export async function publishBlog(blogId: string) {
  const user = await requireAdmin();

  const blog = await prisma.blog.findUnique({
    where: {
      id: blogId,
      authorId: user.id,
    },
    include: {
      draft: {
        include: {
          versions: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
      },
    },
  });

  if (!blog) {
    throw new Error("Blog not found");
  }

  const blogVersion = await prisma.blog.update({
    where: {
      id: blog.id,
    },
    data: {
      content: md.render(
        blog.draft?.versions.at(0)?.content ?? "## Blog rendering error"
      ),
      published: true,
    },
  });

  return blogVersion;
}
