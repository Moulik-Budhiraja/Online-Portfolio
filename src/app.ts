import express from "express";
import path from "path";
import bodyParser from "body-parser";
import prisma from "./db";
import authRoutes from "./auth";
import apiRoutes from "./api";
import adminRoutes from "./admin";
import imageRoutes from "./images";
import cookieParser from "cookie-parser";
import { authenticateToken } from "./middleware/authMiddleware";
import { AuthRequest } from "./types/requestTypes";
import startup from "./startup";

startup();

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(authenticateToken);

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use("/", authRoutes);
app.use("/api", apiRoutes);
app.use("/admin", adminRoutes);
app.use("/image", imageRoutes);

app.get("/", (req: AuthRequest, res) => {
  res.render("index", {
    user: req.user,
  });
});

app.get("/blog/:slug", async (req, res) => {
  // Check if slug exists in the file system
  const slug = req.params.slug;

  const blog = await prisma.blog.findUnique({
    where: {
      slug: slug,
    },
    include: {
      author: true,
      headerImage: true,
    },
  });

  res.render(`blog`, {
    blog: blog,
  });
});

app.get("/blog", async (req, res) => {
  const searchQuery = req.query.search;

  const blogs = await prisma.blog.findMany({
    where: {
      AND: {
        title: {
          contains: searchQuery ? searchQuery.toString() : "",
        },
        published: true,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  res.render("blogs", { blogs });
});

app.listen(port, () => {
  console.log(`Moulik's Portfolio listening on port ${port}`);
});
