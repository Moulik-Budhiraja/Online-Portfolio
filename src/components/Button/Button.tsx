"use client";

import { ReactNode, useState } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void | "success" | "error";
};

const stateStyles = {
  neutral:
    "text-neutral-400 border-neutral-600 hocus:border-neutral-400 hocus:text-neutral-300",
  success:
    "text-green-700 border-green-700 hocus:border-green-700 hocus:text-green-600",
  error: "text-red-700 border-red-700 hocus:border-red-700 hocus:text-red-600",
};

type StateStyle = keyof typeof stateStyles;

export default function Button({
  children,
  className,
  type,
  onClick,
}: ButtonProps) {
  const [style, setStyle] = useState<StateStyle>("neutral");

  const applyStyle = (style: StateStyle) => {
    setStyle(style);
    setTimeout(() => {
      setStyle("neutral");
    }, 1000);
  };

  return (
    <button
      className={`font-display py-3 px-5 bg-neutral-850 border  rounded-md outline-none hocus:bg-neutral-700 hocus:bg-opacity-50  hocus:tracking-widest transition-all duration-300 ease-out ${
        stateStyles[style]
      } ${className || ""}`}
      onClick={() => {
        const result = onClick?.();

        result === "success" && applyStyle("success");
        result === "error" && applyStyle("error");
      }}
      type={type || "submit"}
    >
      {children}
    </button>
  );
}
