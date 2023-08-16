"use client";

import { type } from "os";
import { useEffect, useState } from "react";

type InputProps = {
  placeholder: string;
  defaultValue?: string;
  className?: string;
  name?: string;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
};

export default function Input({
  placeholder,
  defaultValue,
  className,
  name,
  onChange,
  onEnter,
}: InputProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className={`${className} relative`}>
      <input
        type="text"
        className="w-full py-3 px-5 font-sans bg-neutral-850 border border-neutral-600 rounded-md outline-none focus:border-neutral-400 transition-all duration-300 ease-out peer"
        name={name}
        required
        onChange={(e) => {
          setValue(e.target.value);
          onChange && onChange(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") onEnter && onEnter(value);
        }}
        value={value}
      />
      <span className="absolute font-display left-0 top-0 mx-3 px-2 my-3 bg-neutral-850 border-x-neutral-850 pointer-events-none transition-all duration-300 ease-in-out peer-vocus:mx-2 peer-vocus:px-3 peer-vocus:left-4 peer-vocus:-top-6 peer-vocus:tracking-widest peer-vocus:text-neutral-300 peer-vocus:border-x peer-focus:border-x-neutral-400 peer-valid:border-x-neutral-500 ">
        {placeholder}
      </span>
    </div>
  );
}
