import CommentSection from "@/components/CommentSection/CommentSection";
import LazyImage from "@/components/LazyImage/LazyImage";
import { prisma } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { parse } from "node-html-parser";

type BlogProps = {
  params: {
    slug: string;
  };
};

const tailwindInjection = {
  h2: "text-3xl font-display text-neutral-100 mt-4 mb-2",
  h3: "text-2xl font-display text-neutral-100 mt-4 mb-2",
  p: "px-4 mb-4",
  a: "text-sky-600 hover:text-sky-500 transition-colors duration-300 ease-out",
  ul: "pl-12 list-revert mb-4",
  "ul ul": "[reset] mb-0 pl-12 list-revert",
  "span.inline-pop-over":
    "text-sky-600 cursor-pointer relative inline-block transition-colors duration-300 ease-out hover:text-sky-500 focus-within:text-sky-500 group/pop-over",
  "span.inline-pop-over span":
    "w-28 left-1/2 -top-20 absolute flex bg-neutral-900 gap-4 p-4 rounded-md border-2 border-neutral-800 -translate-x-1/2 -translate-y-1/3 opacity-0 pointer-events-none group-hover/pop-over:opacity-100 group-hover/pop-over:translate-y-0 group-hover/pop-over:pointer-events-auto group-active/pop-over:opacity-100 group-active/pop-over:translate-y-0 group-active/pop-over:pointer-events-auto transition-all duration-300 ease-out before:content-[''] before:absolute before:h-[150%] before:w-full before:top-0 before:left-0 after:content-[''] after:absolute after:h-4 after:w-4 after:bg-neutral-900 after:rotate-45 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:translate-y-1/2",
  "span.inline-pop-over span a":
    "[reset] opacity-20 hover:opacity-100 transition-all duration-300 ease-out z-10",
  "span.inline-pop-over span a img": "h-8 w-8",
};

export default async function Blog({ params }: BlogProps) {
  const blog = await prisma.blog.findUnique({
    where: {
      slug: params.slug,
      published: true,
    },
    include: {
      headerImage: true,
      author: true,
    },
  });

  if (!blog) {
    return notFound();
  }

  const html = parse(blog.content || "");

  for (const [key, value] of Object.entries(tailwindInjection)) {
    html.querySelectorAll(key).forEach((element) => {
      value.split(" ").forEach((className) => {
        if (className === "[reset]") {
          element.classNames.split(" ").forEach((className) => {
            element.classList.remove(className);
          });
          return;
        }

        element.classList.add(className);
      });
    });
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-display text-5xl text-neutral-100">{blog.title}</h1>
      <div className="flex justify-between px-4 mt-4">
        <Link
          href="/"
          className="hover:text-neutral-200 transition-all duration-300 ease-out"
        >
          <div>{blog.author.name}</div>
        </Link>
        <div>
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
      {blog.headerImage && (
        <LazyImage
          className="mx-4"
          filename={blog.headerImage?.filename}
          alt={blog.headerImageSubtitle || ""}
        />
      )}
      <span className="px-4 text-sm italic">{blog.headerImageSubtitle}</span>

      <article dangerouslySetInnerHTML={{ __html: html.toString() }}></article>

      <CommentSection blogId={blog.id}></CommentSection>
    </div>
  );
}
