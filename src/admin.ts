import express from "express";
import prisma from "./db";
import {
  authenticateToken,
  authenticateAdmin,
} from "./middleware/authMiddleware";
import { AuthRequest } from "./types/requestTypes";
import { Response } from "express";

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

export default router;
