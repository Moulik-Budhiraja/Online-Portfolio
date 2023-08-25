import { Prisma } from "@prisma/client";

export type BlogWithImage = Prisma.BlogGetPayload<{
  include: { headerImage: true };
}>;

export type EditorBlog = Prisma.BlogGetPayload<{
  include: {
    author: true;
    draft: true;
    headerImage: true;
  };
}>;
