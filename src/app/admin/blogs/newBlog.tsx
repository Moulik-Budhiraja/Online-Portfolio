"use server";

import { createBlog } from "@/serverFunctions/blog/createBlog";

export default async function newBlog(data: FormData) {
  const title = data.get("title") as string;
  const slug = data.get("slug") as string;
  const description = data.get("description") as string;

  await createBlog(title, slug, description);
}
