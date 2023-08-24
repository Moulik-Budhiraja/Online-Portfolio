"use server";

import { prisma } from "@/db";
import { requireAdmin } from "../user/requireAdmin";

export async function editImage(filename: string, newFilename: string) {
  await requireAdmin();

  await prisma.image.update({
    where: {
      filename,
    },
    data: {
      filename: newFilename,
    },
  });
}
