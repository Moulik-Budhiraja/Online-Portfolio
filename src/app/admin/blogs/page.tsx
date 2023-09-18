import { prisma } from "@/db";
import BlogList from "@/components/BlogList/BlogList";
import CreateBlogForm from "./CreateBlogForm";

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
      <div className="flex justify-between gap-4">
        <h1 className="font-display text-4xl text-neutral-100">Blogs</h1>
        <CreateBlogForm></CreateBlogForm>
      </div>
      <BlogList blogs={blogs} targetPrefix="/admin/blogs/edit/"></BlogList>
    </div>
  );
}
