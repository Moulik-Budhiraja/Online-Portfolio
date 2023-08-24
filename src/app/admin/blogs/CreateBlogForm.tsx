"use client";

import Button from "@/components/Button/Button";
import FormDialog from "@/components/FormDialog/FormDialog";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Textarea/Textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import newBlog from "./newBlog";

export default function CreateBlogForm() {
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState("");

  const router = useRouter();

  const toSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  return (
    <>
      <Button className="w-[8rem]" onClick={() => setOpen(true)}>
        New
      </Button>
      <FormDialog
        open={open}
        title="New Blog"
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          newBlog(data);
          setOpen(false);
          router.refresh();
        }}
      >
        <div className="flex flex-col gap-4 mt-4 pb-2">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Title"
              className="w-full"
              name="title"
              onChange={(value) => setSlug(toSlug(value))}
            ></Input>
            <Input
              placeholder="Slug"
              className="w-full"
              name="slug"
              defaultValue={slug}
            ></Input>
          </div>
          <Textarea placeholder="Description" name="description"></Textarea>
        </div>
      </FormDialog>
    </>
  );
}
