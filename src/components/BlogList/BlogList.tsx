"use client";

import BlogCard from "@/components/BlogCard/BlogCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import { BlogWithImage } from "@/types/customPrismaTypes";
import { useRouter } from "next/navigation";

type BlogListProps = {
  targetPrefix: string;
  blogs: BlogWithImage[];
};

export default function BlogList({ targetPrefix, blogs }: BlogListProps) {
  const router = useRouter();

  return (
    <>
      {" "}
      <SearchBar
        className="mt-0"
        placeholder="Search Blogs"
        onSearch={(value) => router.push(`?title=${value}`)}
      ></SearchBar>
      <div className="flex flex-col gap-2">
        {blogs.map((blog) => (
          <BlogCard blog={blog} href={`${targetPrefix}${blog.slug}`} />
        ))}
      </div>
    </>
  );
}
