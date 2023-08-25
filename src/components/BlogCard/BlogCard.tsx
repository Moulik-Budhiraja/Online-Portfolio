"use client";

import LazyImage from "../LazyImage/LazyImage";
import { useRouter } from "next/navigation";
import { BlogWithImage } from "@/types/customPrismaTypes";

type BlogCardProps = {
  blog: BlogWithImage;
  href?: string;
  onClick?: () => void;
};

export default function BlogCard({ blog, href, onClick }: BlogCardProps) {
  const router = useRouter();

  return (
    <div
      className="flex flex-col rounded-md relative gap-4 p-4 bg-neutral-850 border border-neutral-600 transition-all duration-300 ease-out md:flex-row cursor-pointer hocus:bg-neutral-700 hocus:bg-opacity-50 hocus:border-neutral-400 max-h-64"
      onClick={() => {
        onClick?.();

        if (href) {
          router.push(href);
        }
      }}
    >
      {blog.headerImage && (
        <LazyImage
          className="md:w-1/3 rounded-md"
          filename={blog.headerImage?.filename}
          alt={blog.headerImageSubtitle || ""}
        />
      )}
      <div className="md:w-2/3">
        <div className="font-display text-neutral-100 text-3xl mb-2">
          {blog.title}
        </div>
        <div className="pl-4 mb-4">{blog.description}</div>
        <div className="text-right md:absolute md:bottom-4 md:right-4">
          {" "}
          {blog.createdAt.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }) +
            " | " +
            blog.createdAt.toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
        </div>
      </div>
    </div>
  );
}
