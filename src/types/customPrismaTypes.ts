import { Prisma } from "@prisma/client";

export type BlogWithImage = Prisma.BlogGetPayload<{
  include: { headerImage: true };
}>;
