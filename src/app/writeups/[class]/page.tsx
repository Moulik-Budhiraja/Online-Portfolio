import { prisma } from "@/db";
import WriteupList from "@/components/WriteupList/WriteupList";

type ClassWriteupsProps = {
  searchParams: {
    title: string;
  };
  params: {
    class: string;
  };
};

export default async function ClassWriteups({
  searchParams,
  params,
}: ClassWriteupsProps) {
  const writeups = await prisma.blog.findMany({
    where: {
      title: {
        contains: searchParams.title,
      },
      class: params.class,
      published: true,
    },
    include: {
      headerImage: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
      <h1 className="font-display text-4xl text-neutral-100">
        {params.class} Write Ups
      </h1>
      <WriteupList writeups={writeups} targetPrefix="/writeups/"></WriteupList>
    </div>
  );
}
