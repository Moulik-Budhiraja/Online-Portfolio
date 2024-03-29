"use client";

import { useEffect, useState } from "react";

type InputProps = {
  placeholder: string;
  defaultValue?: string;
  className?: string;
  name?: string;
  type?: "text" | "email" | "password";
  maxLength?: number;
  disabled?: boolean;
  required?: boolean;
  preventSubmit?: boolean;
  ref?: any;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
};

export default function Input({
  placeholder,
  defaultValue,
  className,
  name,
  type = "text",
  maxLength,
  disabled,
  required,
  preventSubmit,
  ref,
  onChange,
  onEnter,
}: InputProps) {
  const [value, setValue] = useState(defaultValue ?? "");

  useEffect(() => {
    setValue(defaultValue ?? "");
  }, [defaultValue]);

  return (
    <div className={`relative ${className || ""}`}>
      <input
        type={type}
        className={`w-full py-3 px-5 font-sans bg-neutral-850 border border-neutral-600 rounded-md outline-none focus:border-neutral-400 transition-all duration-300 ease-out peer ${
          disabled && "text-neutral-500"
        }`}
        name={name}
        maxLength={maxLength}
        onChange={(e) => {
          setValue(e.target.value);
          onChange && onChange(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            preventSubmit && e.preventDefault();
            onEnter?.(value);
          }
        }}
        value={value}
        disabled={disabled}
        required={required}
        ref={ref}
      />
      <span
        className={`absolute font-display my-3 bg-neutral-850  pointer-events-none transition-all duration-300 ease-in-out peer-focus:mx-2 peer-focus:px-3 peer-focus:left-4 peer-focus:-top-6 peer-focus:tracking-widest peer-focus:text-neutral-300 peer-focus:border-x peer-focus:border-x-neutral-400 ${
          value !== "" || disabled
            ? `mx-2 px-3 left-4 -top-6 tracking-widest border-x  border-x-neutral-600 ${
                disabled ? "text-neutral-400" : "text-neutral-300"
              }`
            : "mx-3 px-2 left-0 top-0 border-x-neutral-850"
        } peer-focus:border-x-neutral-400`}
      >
        {placeholder}
      </span>
    </div>
  );
}
