import fs from "fs";
import path from "path";
import { prisma } from "@/db";
import { NextRequest } from "next/server";

type GetImageProps = {
  params: {
    filename: string;
  };
};

export async function GET(request: NextRequest, { params }: GetImageProps) {
  const { filename } = params;

  const image = await prisma.image.findUnique({
    where: {
      filename,
    },
  });

  if (!image) {
    return {
      status: 404,
    };
  }

  const filePath = path.join(
    process.cwd(),
    "images",
    "full",
    `${image.id}.${image.filetype}`
  );

  const imageBuffer = fs.readFileSync(filePath);

  return new Response(imageBuffer, {
    headers: { "content-type": `image/${image.filetype}` },
  });
}
