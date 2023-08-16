"use client";

import { useState } from "react";
import Button from "@/components/Button/Button";

type SearchBarProps = {
  placeholder: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
};

export default function SearchBar({
  placeholder,
  defaultValue,
  onChange,
  onSearch,
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue || "");

  return (
    <div className="mt-4 font-display max-w-3xl flex gap-4 relative">
      <div className="flex-grow">
        <input
          type="text"
          className="w-full py-3 px-5 font-sans bg-neutral-850 border border-neutral-600 rounded-md outline-none focus:border-neutral-400 transition-all duration-300 ease-out peer"
          required
          onChange={(e) => {
            setValue(e.target.value);
            onChange && onChange(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch && onSearch(value);
          }}
          value={value}
        />
        <span className="absolute left-0 top-0 mx-3 px-2 my-3 bg-neutral-850 border-x-neutral-850 pointer-events-none transition-all duration-300 ease-in-out peer-vocus:mx-2 peer-vocus:px-3 peer-vocus:left-4 peer-vocus:-top-6 peer-vocus:tracking-widest peer-vocus:text-neutral-300 peer-vocus:border-x peer-focus:border-x-neutral-400 peer-valid:border-x-neutral-500 ">
          {placeholder}
        </span>
      </div>
      <Button className="w-40" onClick={() => onSearch && onSearch(value)}>
        Search
      </Button>
    </div>
  );
}
