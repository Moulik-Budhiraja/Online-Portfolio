import { prisma } from "@/db";
import BlogList from "@/components/BlogList/BlogList";

type BlogsProps = {
  searchParams: {
    title: string;
  };
};

export default async function Blogs({ searchParams }: BlogsProps) {
  const blogs = await prisma.blog.findMany({
    where: {
      title: {
        contains: searchParams.title,
      },
      class: null,
      published: true,
    },
    include: {
      headerImage: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
      <h1 className="font-display text-4xl text-neutral-100">Blogs</h1>
      <BlogList blogs={blogs} targetPrefix="/blogs/"></BlogList>
    </div>
  );
}
