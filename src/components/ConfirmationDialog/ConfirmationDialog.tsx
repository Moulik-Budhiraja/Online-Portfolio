"use client";

import Button from "@/components/Button/Button";
import { useVisibility } from "@/hooks/useVisibility/useVisibility";
import { useEffect, useState } from "react";

type ConfirmationDialogProps = {
  open: boolean;
  title: string;
  message: string;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmationDialog({
  open,
  title,
  message,
  confirmText,
  cancelText,
  children,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  const [visible, fadeIn] = useVisibility(open);

  return visible ? (
    <div
      className={`fixed bg-neutral-850 border border-neutral-500 w-[80vw] max-w-2xl rounded-md z-30 flex flex-col gap-2 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-6 transition-opacity duration-300 ease-out ${
        fadeIn
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <span className="font-display text-2xl text-neutral-100">{title}</span>
      <p className="max-h-[40vh] overflow-y-scroll">{message}</p>
      {children && (
        <div className="my-4 max-h-[50vh] overflow-y-scroll">{children}</div>
      )}
      <div className="flex gap-4 mt-2 justify-end">
        <Button className="max-w-40 w-full max-w-[10rem]" onClick={onCancel}>
          {cancelText || "Cancel"}
        </Button>
        <Button className="max-w-40 w-full max-w-[10rem]" onClick={onConfirm}>
          {confirmText || "Confirm"}
        </Button>
      </div>
    </div>
  ) : null;
}
