"use client";

import { getComment } from "@/serverFunctions/comment/getComment";
import { useEffect, useState } from "react";
import ReplyIcon from "../Icons/ReplyIcon/ReplyIcon";
import CommentForm from "../CommentForm/CommentForm";
import CancelIcon from "../Icons/CancelIcon/CancelIcon";
import { Comment, User } from "@prisma/client";
import DeleteIcon from "../Icons/DeleteIcon/DeleteIcon";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import { deleteComment } from "@/serverFunctions/comment/deleteComment";

type CommentProps = {
  id: string;
  user?: User;
  noActions?: boolean;
  onDelete?: () => void;
};

export default function Comment({
  id,
  user,
  noActions = false,
  onDelete,
}: CommentProps) {
  const [comment, setComment] = useState<Comment>();
  const [children, setChildren] = useState<string[]>();
  const [replying, setReplying] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const updateChildComments = () => {
    getComment(id).then((comment) => {
      comment && setComment(comment);

      if (comment?.children) {
        setChildren(comment?.children.map((child) => child.id));
      }
    });
  };

  useEffect(() => updateChildComments(), []);

  return (
    <div className="w-fit border-l-2 border-neutral-600 pl-5 ">
      <div className="font-display flex gap-2 align-baseline">
        <span className="text-xl text-neutral-100 flex justify-end flex-col">
          {comment?.title}
        </span>
        <span className=" flex justify-end flex-col">{comment?.name}</span>
        <span className="ml-auto flex justify-end flex-col text-sm italic pl-12">
          {comment?.createdAt?.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      <div className="px-4 py-1">{comment?.content}</div>

      {replying ? (
        <>
          <div className="mb-4 flex justify-end items-center gap-1">
            <CancelIcon
              className="h-6"
              iconClassName="p-[1px]"
              text="Cancel"
              onClick={() => setReplying(false)}
            ></CancelIcon>{" "}
          </div>

          <CommentForm
            blogId={comment?.blogId || ""}
            parentId={id}
            className="mt-4 mb-8"
            focus={true}
            onSubmit={() => {
              updateChildComments();
              setReplying(false);
            }}
          />
        </>
      ) : !noActions ? (
        <div className="mb-4 flex justify-end gap-2">
          <ReplyIcon
            className="h-6 w-6"
            onClick={() => setReplying(true)}
          ></ReplyIcon>
          {user?.role === "ADMIN" && (
            <DeleteIcon
              className="h-6 w-6"
              onClick={() => setDeleteDialogOpen(true)}
            ></DeleteIcon>
          )}
        </div>
      ) : (
        <>
          <div className="mb-4"></div>
        </>
      )}

      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Delete Comment"
        message="Are you sure you want to delete the following comment thread?"
        onCancel={() => setDeleteDialogOpen(false)}
        onConfirm={() =>
          deleteComment(id).then(() => {
            setDeleteDialogOpen(false);
            onDelete?.();
          })
        }
      >
        <Comment id={id} noActions={true} />
      </ConfirmationDialog>

      {children?.map((child) => (
        <Comment
          id={child}
          key={child}
          user={user}
          noActions={noActions}
          onDelete={updateChildComments}
        />
      ))}
    </div>
  );
}
