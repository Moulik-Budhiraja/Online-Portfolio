import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={`${
        className || ""
      } font-display py-3 px-5 bg-neutral-850 border border-neutral-600 rounded-md outline-none hocus:bg-neutral-700 hocus:bg-opacity-50 hocus:border-neutral-400 hocus:text-neutral-300 hocus:tracking-widest transition-all duration-300 ease-out`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
