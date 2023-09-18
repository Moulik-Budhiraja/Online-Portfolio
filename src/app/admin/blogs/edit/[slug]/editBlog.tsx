"use server";

import { prisma } from "@/db";
import { requireAdmin } from "@/serverFunctions/user/requireAdmin";
import { redirect } from "next/navigation";

export async function editBlog(data: FormData) {
  await requireAdmin();

  const id = data.get("id") as string;
  const originalSlug = data.get("originalSlug") as string;
  const title = data.get("title") as string;
  const slug = data.get("slug") as string;
  const className = data.get("class") as string | null;
  const description = data.get("description") as string;
  const imageFilename = data.get("imageFilename") as string;

  console.log(data);

  if (imageFilename === "") {
    await prisma.blog.update({
      where: {
        id,
      },
      data: {
        title,
        slug,
        description,
        class: className,
        headerImageId: null,
      },
    });
  } else {
    await prisma.blog.update({
      where: {
        id,
      },
      data: {
        title,
        slug,
        description,
        class: className,
        headerImage: {
          connect: {
            filename: imageFilename,
          },
        },
      },
    });
  }

  if (originalSlug !== slug) {
    redirect(`/admin/blogs/edit/${slug}`);
  }
}
