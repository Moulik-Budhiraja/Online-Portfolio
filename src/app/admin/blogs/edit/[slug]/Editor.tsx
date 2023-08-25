"use client";

import { EditorBlog } from "@/types/customPrismaTypes";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import Button from "@/components/Button/Button";
import FormDialog from "@/components/FormDialog/FormDialog";
import { useState } from "react";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Textarea/Textarea";
import ImageInput from "@/components/ImageInput/ImageInput";
import { editBlog } from "./editBlog";
import LinkButton from "@/components/LinkButton/LinkButton";
import { saveBlogDraft } from "@/serverFunctions/blog/saveBlogDraft";

type EditorProps = {
  blog: EditorBlog;
  className?: string;
};

export default function Editor({ blog, className }: EditorProps) {
  const [editBlogFormOpen, setEditBlogFormOpen] = useState(false);
  const [content, setContent] = useState(blog.draft?.content);

  return (
    <>
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <h1 className="font-display text-neutral-100 text-4xl">{blog.title}</h1>

        <div className="flex gap-4 flex-wrap md:flex-nowrap">
          <Button onClick={() => setEditBlogFormOpen(true)}>Edit</Button>
          <Button
            onClick={() => {
              saveBlogDraft(blog.id, content ?? "").then(() => {});
              return "success";
            }}
          >
            Save
          </Button>
          <Button>Save Version</Button>
          <LinkButton href={`/admin/blogs/preview/${blog.slug}`}>
            Preview
          </LinkButton>
          <Button>Publish</Button>
        </div>
      </div>
      <AceEditor
        className={className}
        mode="markdown"
        defaultValue={blog.draft?.content}
        onChange={setContent}
        theme="one_dark"
        width="100%"
        height="100%"
        showPrintMargin={false}
        fontSize={14}
      ></AceEditor>
      <FormDialog
        open={editBlogFormOpen}
        title="Edit Blog"
        onClose={() => setEditBlogFormOpen(false)}
        onSubmit={(data) => {
          editBlog(data).then(() => {
            setEditBlogFormOpen(false);
          });
        }}
        confirmText="Save"
      >
        <div className="mt-4 pb-2 flex flex-col gap-4">
          <div className="flex gap-4">
            <input type="hidden" name="id" value={blog.id} />
            <input type="hidden" name="originalSlug" value={blog.slug} />
            <Input
              placeholder="Title"
              defaultValue={blog.title}
              className="w-full"
              name="title"
            ></Input>
            <Input
              placeholder="Slug"
              defaultValue={blog.slug}
              className="w-full"
              name="slug"
            ></Input>
          </div>
          <Textarea
            placeholder="Description"
            defaultValue={blog.description || ""}
            name="description"
          ></Textarea>
          <ImageInput
            name="imageFilename"
            defaultValue={blog.headerImage?.filename}
          ></ImageInput>
        </div>
      </FormDialog>
    </>
  );
}
