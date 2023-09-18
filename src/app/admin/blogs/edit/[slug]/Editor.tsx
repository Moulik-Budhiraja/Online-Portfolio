"use client";

import { EditorBlog } from "@/types/customPrismaTypes";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import Button from "@/components/Button/Button";
import FormDialog from "@/components/FormDialog/FormDialog";
import { useEffect, useState } from "react";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Textarea/Textarea";
import ImageInput from "@/components/ImageInput/ImageInput";
import { editBlog } from "./editBlog";
import LinkButton from "@/components/LinkButton/LinkButton";
import { saveBlogDraft } from "@/serverFunctions/blog/saveBlogDraft";
import DraftVersionList from "@/components/DraftVersionList/DraftVersionList";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog";
import { publishBlog } from "@/serverFunctions/blog/publishBlog";
import { delistBlog } from "@/serverFunctions/blog/delistBlog";
import { deleteBlog } from "@/serverFunctions/blog/deleteBlog";

type EditorProps = {
  blog: EditorBlog;
  className?: string;
};

export default function Editor({ blog, className }: EditorProps) {
  const [editBlogFormOpen, setEditBlogFormOpen] = useState(false);
  const [versionListOpen, setVersionListOpen] = useState(false);
  const [publishConfirmationOpen, setPublishConfirmationOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const [content, setContent] = useState(blog.draft?.content);

  const router = useRouter();

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "s" && e.ctrlKey) {
        e.preventDefault();
        saveBlogDraft(blog.id, content ?? "").then(() => {
          router.refresh();
        });
      }
    });

    return () => {
      document.removeEventListener("keydown", () => {});
    };
  }, [blog.id, content, router]);

  return (
    <>
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="flex gap-4 items-center">
          <h1 className="font-display text-neutral-100 text-4xl">
            {blog.title}
          </h1>
          <Button onClick={() => setDeleteConfirmationOpen(true)}>
            Delete
          </Button>
        </div>

        <div className="flex gap-4 flex-wrap md:flex-nowrap">
          <Button onClick={() => setEditBlogFormOpen(true)}>Edit</Button>
          <Button
            onClick={() => {
              saveBlogDraft(blog.id, content ?? "").then(() => {
                router.refresh();
              });
              return "success";
            }}
          >
            Save
          </Button>
          <LinkButton
            href={`/admin/blogs/preview/${blog.slug}`}
            target="_blank"
          >
            Preview
          </LinkButton>
          <Button onClick={() => setVersionListOpen(!versionListOpen)}>
            Versions
          </Button>
          <Button onClick={() => setPublishConfirmationOpen(true)}>
            Publish
          </Button>

          {blog.published && (
            <Button
              onClick={() => {
                delistBlog(blog.id).then(() => router.refresh());
                return "success";
              }}
            >
              Delist
            </Button>
          )}
        </div>
      </div>
      <div className="w-full h-full flex overflow-y-hidden">
        <AceEditor
          className={className}
          mode="markdown"
          defaultValue={blog.draft?.content}
          onChange={setContent}
          value={content}
          theme="one_dark"
          width="100%"
          height="100%"
          showPrintMargin={false}
          wrapEnabled={true}
          fontSize={14}
          setOptions={{
            spellcheck: true,
          }}
        ></AceEditor>

        <DraftVersionList
          open={versionListOpen}
          currentContent={content ?? ""}
          currentDraft={blog.draft}
          versions={blog.draft?.versions}
          onSelection={(version) => {
            setContent(version.content);
          }}
        ></DraftVersionList>
      </div>
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
            <Input
              placeholder="Class"
              className="w-1/2"
              defaultValue={blog.class || undefined}
              name="class"
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
      <ConfirmationDialog
        open={publishConfirmationOpen}
        title="Confirm Publish"
        message={`Are you sure you want to publish blog version "${
          blog.draft?.versions.at(0)?.versionName
        }"?`}
        onCancel={() => setPublishConfirmationOpen(false)}
        onConfirm={() => {
          publishBlog(blog.id).then(() => {
            setPublishConfirmationOpen(false);
            router.refresh();

            if (blog.class === null) {
              window.open(`/blogs/${blog.slug}`, "_blank");
            } else {
              window.open(`/writeups/${blog.class}/${blog.slug}`, "_blank");
            }
          });
        }}
      ></ConfirmationDialog>
      <ConfirmationDialog
        open={deleteConfirmationOpen}
        title="Confirm Delete"
        message={`Are you sure you want to delete blog "${blog.title}"?`}
        onCancel={() => setDeleteConfirmationOpen(false)}
        onConfirm={() => {
          deleteBlog(blog.id).then(() => {
            setDeleteConfirmationOpen(false);
            router.push("/admin/blogs");
          });
        }}
      ></ConfirmationDialog>
    </>
  );
}
