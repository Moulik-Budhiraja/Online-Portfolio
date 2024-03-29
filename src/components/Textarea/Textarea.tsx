"use client";

import { useEffect, useState } from "react";

type TextareaProps = {
  placeholder: string;
  defaultValue?: string;
  className?: string;
  name?: string;
  cols?: number;
  rows?: number;
  maxLength?: number;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
};

export default function Textarea({
  placeholder,
  defaultValue,
  className,
  name,
  cols = 30,
  rows = 5,
  maxLength,
  onChange,
  onEnter,
}: TextareaProps) {
  const [value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className={`relative ${className || ""}`}>
      <textarea
        className="w-full py-3 px-5 font-sans bg-neutral-850 border border-neutral-600 rounded-md outline-none focus:border-neutral-400 transition-all duration-300 ease-out peer"
        name={name}
        required
        cols={cols}
        rows={rows}
        maxLength={maxLength}
        onChange={(e) => {
          setValue(e.target.value);
          onChange && onChange(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") onEnter && onEnter(value);
        }}
        value={value}
      ></textarea>
      <span
        className={`absolute font-display my-3 bg-neutral-850  pointer-events-none transition-all duration-300 ease-in-out peer-focus:mx-2 peer-focus:px-3 peer-focus:left-4 peer-focus:-top-6 peer-focus:tracking-widest peer-focus:text-neutral-300 peer-focus:border-x peer-focus:border-x-neutral-400 ${
          value !== ""
            ? "mx-2 px-3 left-4 -top-6 tracking-widest text-neutral-300 border-x border-x-neutral-500"
            : "mx-3 px-2 left-0 top-0 border-x-neutral-850"
        } peer-focus:border-x-neutral-400`}
      >
        {placeholder}
      </span>
    </div>
  );
}
