"use client";

import BlogCard from "@/components/BlogCard/BlogCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import { BlogWithImage } from "@/types/customPrismaTypes";
import { useRouter } from "next/navigation";

type WriteupListProps = {
  targetPrefix: string;
  writeups: BlogWithImage[];
};

export default function WriteupList({
  targetPrefix,
  writeups,
}: WriteupListProps) {
  const router = useRouter();

  return (
    <>
      {" "}
      <SearchBar
        className="mt-0"
        placeholder="Search Write Ups"
        onSearch={(value) => router.push(`?title=${value}`)}
      ></SearchBar>
      <div className="flex flex-col gap-2">
        {writeups.map((writeup) => (
          <BlogCard
            key={writeup.id}
            blog={writeup}
            href={`${targetPrefix}${writeup.class}/${writeup.slug}`}
          />
        ))}
      </div>
    </>
  );
}
