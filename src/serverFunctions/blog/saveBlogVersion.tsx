"use server";

import { prisma } from "@/db";
import { requireAdmin } from "../user/requireAdmin";

export async function saveBlogVersion(
  draftId: string,
  versionName: string,
  content: string
) {
  const user = await requireAdmin();

  const draft = await prisma.blogDraft.findUnique({
    where: {
      id: draftId,
      blog: {
        authorId: user.id,
      },
    },
    include: {
      blog: true,
    },
  });

  if (!draft) {
    throw new Error("Draft not found");
  }

  const blogVersion = await prisma.blogVersion.create({
    data: {
      versionName,
      content,
      draft: {
        connect: {
          id: draftId,
        },
      },
    },
  });

  return blogVersion;
}
