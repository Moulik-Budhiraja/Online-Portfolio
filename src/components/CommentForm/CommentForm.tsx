"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import { handleNewComment } from "./handleNewComment";

type CommentFormProps = {
  blogId: string;
  parentId?: string;
  className?: string;
  focus?: boolean;
  onSubmit?: () => void;
};

export default function CommentForm({
  blogId,
  parentId,
  className,
  focus = false,
  onSubmit,
}: CommentFormProps) {
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (focus) {
      (
        document.querySelector("input[name='name']") as HTMLInputElement
      )?.focus();
    }
  }, []);

  useEffect(() => {
    if (submitting) {
      setSubmitting(false);
    }
  }, [submitting]);

  return (
    <div className={className}>
      <form
        action={async (data) => {
          setSubmitting(true);
          await handleNewComment(data);
          onSubmit?.();
        }}
        className="flex flex-col gap-4 relative"
      >
        <input type="hidden" name="blogId" value={blogId} />
        <input type="hidden" name="parentId" value={parentId || ""} />
        {!submitting && (
          <>
            <Input
              placeholder="Name"
              name="name"
              className="max-w-sm"
              maxLength={40}
            />
            <Input
              placeholder="Title"
              name="title"
              className="max-w-md"
              maxLength={50}
            />
            <Textarea
              placeholder="Body"
              name="body"
              rows={5}
              maxLength={2000}
            ></Textarea>
          </>
        )}
        <Button className="w-[10rem]">Submit</Button>
      </form>
    </div>
  );
}
