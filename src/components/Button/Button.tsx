import { type } from "os";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function Button({
  children,
  className,
  type,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`font-display py-3 px-5 bg-neutral-850 border border-neutral-600 rounded-md outline-none hocus:bg-neutral-700 hocus:bg-opacity-50 hocus:border-neutral-400 hocus:text-neutral-300 hocus:tracking-widest transition-all duration-300 ease-out ${
        className || ""
      }`}
      onClick={onClick}
      type={type || "submit"}
    >
      {children}
    </button>
  );
}
