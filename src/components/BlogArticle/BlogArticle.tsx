"use client";

import { useEffect, useRef } from "react";
import CodeCopyButton from "../CodeCopyButton/CodeCopyButton";

type BlogArticleProps = {
  content: string;
};

export default function BlogArticle({ content }: BlogArticleProps) {
  const article = useRef<HTMLDivElement>(null);

  useEffect(() => {
    article.current?.querySelectorAll("pre").forEach((pre) => {
      pre.insertAdjacentHTML("afterbegin", CodeCopyButton);

      (pre as unknown as HTMLPreElement)
        .querySelector(".code-copy")
        ?.addEventListener("click", (e) => {
          const code = pre.querySelector("code")?.innerText;
          navigator.clipboard.writeText(code ?? "");

          pre.querySelector(".code-copy")?.classList.add("copied");
          setTimeout(() => {
            pre.querySelector(".code-copy")?.classList.remove("copied");
          }, 2000);
        });
    });
  }, []);

  return (
    <article
      dangerouslySetInnerHTML={{ __html: content }}
      ref={article}
    ></article>
  );
}
