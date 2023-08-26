import LazyImage from "@/components/LazyImage/LazyImage";
import LinkButton from "@/components/LinkButton/LinkButton";
import { prisma } from "@/db";
import md from "@/md_renderer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { parse } from "node-html-parser";
import "@/styles/code.css";
import { tailwindInjection } from "@/styles/BlogTailwindInjection";
import BlogArticle from "@/components/BlogArticle/BlogArticle";

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
      headerImage: true,
      draft: true,
      author: true,
    },
  });

  if (!blog) {
    return notFound();
  }

  const html = parse(md.render(blog.draft?.content || ""));

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
      <div
        className={`flex justify-between px-4 mt-2 ${
          !blog.headerImage && "pb-2 border-b border-neutral-600"
        }`}
      >
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
        <>
          <LazyImage
            className="mx-4"
            filename={blog.headerImage?.filename}
            aspectRatio={blog.headerImage?.aspectRatio || undefined}
            alt={blog.headerImageSubtitle || ""}
          />
          <span className="px-4 text-sm italic">
            {blog.headerImageSubtitle}
          </span>
        </>
      )}

      <BlogArticle content={html.toString()}></BlogArticle>

      <div className="pt-20 mb-10 border-t border-neutral-700 flex justify-center">
        <LinkButton href={`/admin/blogs/edit/${blog.slug}`}>
          Back to Editing
        </LinkButton>
      </div>
    </div>
  );
}
