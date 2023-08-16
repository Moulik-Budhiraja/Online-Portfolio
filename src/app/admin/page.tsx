import { prisma } from "@/db";
import Link from "next/link";

export default async function Admin() {
  // await prisma.image.create({
  //   data: {
  //     id: "e927f915-16e6-4d74-8572-c778c8ba3473",
  //     filename: "platinum-winners",
  //     filetype: "webp",
  //     user: {
  //       connect: {
  //         id: "913d9b8c-0523-44e9-9509-d95ff86613be",
  //       },
  //     },
  //   },
  // });

  return (
    <div>
      <h1 className="font-display text-4xl text-neutral-100">Admin</h1>
      <ul>
        <li>
          <Link
            href={"/admin/blogs"}
            className="text-sky-600 hover:text-sky-500 transition-colors duration-300 ease-out"
          >
            Blogs
          </Link>
        </li>
        <li>
          <Link
            href={"/admin/images"}
            className="text-sky-600 hover:text-sky-500 transition-colors duration-300 ease-out"
          >
            Images
          </Link>
        </li>
      </ul>
    </div>
  );
}
