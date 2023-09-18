import { prisma } from "@/db";
import WriteupList from "@/components/WriteupList/WriteupList";

type WriteupsProps = {
  searchParams: {
    title: string;
  };
};

export default async function Writeups({ searchParams }: WriteupsProps) {
  const writeups = await prisma.blog.findMany({
    where: {
      title: {
        contains: searchParams.title,
      },
      class: {
        not: null,
      },
      published: true,
    },
    include: {
      headerImage: true,
    },
  });

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
      <h1 className="font-display text-4xl text-neutral-100">Write Ups</h1>
      <WriteupList writeups={writeups} targetPrefix="/writeups/"></WriteupList>
    </div>
  );
}
