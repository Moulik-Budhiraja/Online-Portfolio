import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  target?: string;
};

export default function Button({
  children,
  className,
  href,
  target,
}: ButtonProps) {
  return (
    <a
      className={`${
        className || ""
      } font-display py-3 px-5 bg-neutral-850 border border-neutral-600 rounded-md outline-none cursor-pointer hocus:bg-neutral-700 hocus:bg-opacity-50 hocus:border-neutral-400 hocus:text-neutral-300 hocus:tracking-widest transition-all duration-300 ease-out`}
      href={href}
      target={target}
    >
      {children}
    </a>
  );
}
