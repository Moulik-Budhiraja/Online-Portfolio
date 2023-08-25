"use client";

import { useEffect, useState } from "react";
import CommentForm from "../CommentForm/CommentForm";
import Comment from "@/components/Comment/Comment";
import { getComments } from "@/serverFunctions/comment/getComments";
import { Comment as RootComment } from "@prisma/client";
import { useUser } from "@/hooks/useUser/useUser";

type CommentSectionProps = {
  blogId: string;
};

export default function CommentSection({ blogId }: CommentSectionProps) {
  const [rootComments, setRootComments] = useState<RootComment[]>([]);

  const user = useUser();

  const updateRootComments = () => {
    getComments(blogId, null, true).then((comments) => {
      setRootComments(comments as RootComment[]);
    });
  };

  useEffect(() => updateRootComments(), []);

  return (
    <div>
      <div className="mt-12 font-display text-neutral-100 text-5xl">
        Comments
      </div>
      <div className="my-8 ml-4">
        {rootComments.length === 0 && (
          <div>No comments yet. Be the first to leave one!</div>
        )}
        {rootComments.map((comment) => (
          <Comment
            id={comment.id}
            key={comment.id}
            user={user}
            onDelete={updateRootComments}
          />
        ))}
      </div>
      <div className="mt-12 mb-4 font-display text-neutral-100 text-4xl">
        New Comment
      </div>
      <CommentForm
        blogId={blogId}
        onSubmit={() => updateRootComments()}
      ></CommentForm>
    </div>
  );
}
