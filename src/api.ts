import express from "express";
import prisma from "./db";
import bodyParser from "body-parser";

const router = express.Router();

// Get a blog's comments by blog id
router.get("/blog/:blogId/comments", async (req, res) => {
  const blogId = req.params.blogId;
  const limit = Number.parseInt(req.query.limit as string) || 100;

  const comments = await prisma.comment.findMany({
    where: {
      blogId: blogId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
  res.json(comments);
});

// Get a blog by its filename
router.get("/blog/file/:filename", async (req, res) => {
  const filename = req.params.filename;

  const blog = await prisma.blog.findUnique({
    where: {
      filename: filename,
    },
  });
  res.json(blog);
});

// Create a new comment
router.post("/blog/:blogId/comment", bodyParser.json(), async (req, res) => {
  const blogId = req.params.blogId;
  const { title, name, content, parentId } = req.body;

  if (title.length > 40 || name.length > 25 || content.length > 2000) {
    res.status(400).json({
      error:
        "Title must be less than 40 characters, name must be less than 25 characters, and content must be less than 2000 characters",
    });
    return;
  }

  let comment;

  if (parentId) {
    comment = await prisma.comment.create({
      data: {
        title: title,
        name: name,
        content: content,
        blog: {
          connect: {
            id: blogId,
          },
        },
        parent: {
          connect: {
            id: parentId,
          },
        },
      },
    });
  } else {
    comment = await prisma.comment.create({
      data: {
        title: title,
        name: name,
        content: content,
        blog: {
          connect: {
            id: blogId,
          },
        },
      },
    });
  }

  res.status(201).json(comment);
});

export default router;
