import express, { Response } from "express";
import prisma from "./db";
import multer from "multer";
import sharp from "sharp";
import { authenticateAdmin } from "./middleware/authMiddleware";
import { AuthRequest } from "./types/requestTypes";
import fs from "fs";

const router = express.Router();
const images = multer({ dest: "images/temp" });

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

// Get a blog by its slug
router.get("/blog/file/:slug", async (req, res) => {
  const slug = req.params.slug;

  const blog = await prisma.blog.findUnique({
    where: {
      slug: slug,
    },
  });
  res.json(blog);
});

// Create a new comment
router.post("/blog/:blogId/comment", async (req, res) => {
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

router.post(
  "/image/upload",
  [images.single("image"), authenticateAdmin],
  async (req: AuthRequest, res: Response) => {
    const file = req.file;
    const filename = req.body.filename;

    if (!file) {
      res.status(400).json({
        error: "No file uploaded",
      });
      return;
    }

    const filetype = file.mimetype.split("/")[1];

    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    // Save image entry to database
    try {
      const image = await prisma.image.create({
        data: {
          filename: filename,
          filetype: filetype,
          user: {
            connect: {
              id: req.user.id,
            },
          },
        },
      });

      // Save move image to permanent location: images/full with id as filename
      await sharp(file.path).toFile(
        `images/full/${image.id}.${image.filetype}`
      );

      // Save a compressed version of the image to images/small with id as filename
      await sharp(file.path)
        .resize(100)
        .toFile(`images/small/${image.id}.${image.filetype}`);

      res.status(201).json({
        image: `/image/${image.filename}`,
      });
    } catch (err) {
      res.status(500).json({
        error: "Error saving image to database",
      });

      console.error(err);
      return;
    }
  }
);

router.delete(
  "/image/:filename",
  authenticateAdmin,
  async (req: AuthRequest, res: Response) => {
    const filename = req.params.filename;

    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    try {
      const image = await prisma.image.findUnique({
        where: {
          filename: filename,
        },
      });

      if (!image) {
        return res.status(404).json({
          error: "Image not found",
        });
      }

      if (image.userId !== req.user.id) {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }

      // Delete the image from the database
      await prisma.image.delete({
        where: {
          filename: filename,
        },
      });

      // Delete the images from the file system
      fs.unlinkSync(`images/full/${image.id}.${image.filetype}`);
      fs.unlinkSync(`images/small/${image.id}.${image.filetype}`);

      res.status(204).json({
        message: "Image deleted",
      });
    } catch (err) {
      res.status(500).json({
        error: "Error deleting image",
      });
    }
  }
);

export default router;
