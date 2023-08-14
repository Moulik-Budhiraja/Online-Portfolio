import express from "express";
import prisma from "./db";
import {
  authenticateToken,
  authenticateAdmin,
} from "./middleware/authMiddleware";
import { AuthRequest } from "./types/requestTypes";
import { Response } from "express";
import md from "./helpers/md_renderer";

const router = express.Router();

router.get("/", authenticateAdmin, (req: AuthRequest, res: Response) => {
  res.render("admin/index");
});

router.get(
  "/images",
  authenticateAdmin,
  async (req: AuthRequest, res: Response) => {
    res.render("admin/images");
  }
);

router.get(
  "/blogs",
  authenticateAdmin,
  async (req: AuthRequest, res: Response) => {
    const searchQuery = req.query.search;

    const blogs = await prisma.blog.findMany({
      where: {
        title: {
          contains: searchQuery ? searchQuery.toString() : "",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    res.render("admin/blogs", { blogs });
  }
);

router.get("/blogs/create", authenticateAdmin, (req: AuthRequest, res) => {
  res.render("admin/create-blog");
});

router.post(
  "/blogs/create",
  authenticateAdmin,
  async (req: AuthRequest, res) => {
    const { title, slug, description } = req.body;

    if (!req.user) return res.sendStatus(400);

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        description,

        author: {
          connect: {
            id: req.user.id,
          },
        },

        draft: {
          create: {
            content: "",
          },
        },
      },
    });

    res.status(201).send(blog);
  }
);

router.get(
  "/blogs/edit/:slug",
  authenticateAdmin,
  async (req: AuthRequest, res) => {
    const slug = req.params.slug;

    const blog = await prisma.blog.findUnique({
      where: {
        slug: slug,
      },
      include: {
        draft: true,
        headerImage: true,
        author: true,
      },
    });

    if (!blog || !req.user) return res.sendStatus(404);

    if (blog.authorId !== req.user.id) return res.sendStatus(403);

    res.render("admin/edit-blog", { blog });
  }
);

router.get("/blogs/preview/:slug", async (req: AuthRequest, res) => {
  const slug = req.params.slug;

  const blog = await prisma.blog.findUnique({
    where: {
      slug: slug,
    },
    include: {
      draft: true,
      headerImage: true,
      author: true,
    },
  });

  if (!blog || !blog.draft) return res.sendStatus(404);

  // Render the draft markdown into HTML
  const renderedContent = md.render(blog.draft.content);

  res.render("admin/preview-blog", { blog, renderedContent });
});

export default router;
