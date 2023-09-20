export const tailwindInjection = {
  h2: "text-3xl font-display text-neutral-100 mt-4 mb-2",
  h3: "text-2xl font-display text-neutral-100 mt-4 mb-2",
  p: "px-4 mb-4",
  a: "text-sky-600 hover:text-sky-500 transition-colors duration-300 ease-out",
  ul: "pl-12 list-revert mb-4",
  "ul ul": "[reset] mb-0 pl-12 list-revert",
  "span.inline-pop-over":
    "text-sky-600 cursor-pointer relative inline-block transition-colors duration-300 ease-out hover:text-sky-500 focus-within:text-sky-500 group/pop-over",
  "span.inline-pop-over span":
    "left-1/2 -top-20 absolute flex bg-neutral-900 gap-4 p-4 rounded-md border-2 border-neutral-800 -translate-x-1/2 -translate-y-1/3 opacity-0 pointer-events-none group-hover/pop-over:opacity-100 group-hover/pop-over:translate-y-0 group-hover/pop-over:pointer-events-auto group-active/pop-over:opacity-100 group-active/pop-over:translate-y-0 group-active/pop-over:pointer-events-auto transition-all duration-300 ease-out before:content-[''] before:absolute before:h-[150%] before:w-full before:top-0 before:left-0 after:content-[''] after:absolute after:h-4 after:w-4 after:bg-neutral-900 after:rotate-45 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:translate-y-1/2 z-20",
  "span.inline-pop-over span a":
    "[reset] opacity-20 hover:opacity-100 transition-all duration-300 ease-out z-10 h-8 w-8",
  "span.inline-pop-over span a img": "h-full w-full",
  ".katex-html": "hidden",
};
