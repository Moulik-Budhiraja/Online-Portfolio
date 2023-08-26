import { prisma } from "@/db";
import { notFound } from "next/navigation";
import Editor from "./Editor";

type BlogProps = {
  params: {
    slug: string;
  };
};

export default async function Blog({ params }: BlogProps) {
  const blog = await prisma.blog.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      author: true,
      draft: {
        include: {
          versions: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
      headerImage: true,
    },
  });

  if (!blog) {
    return notFound();
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] gap-4">
      <Editor blog={blog} className="w-full h-full"></Editor>
    </div>
  );
}
