import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import {
  getBlogById,
  getBlogByFilename,
  getCommentsByBlogId,
  insertComment,
} from "./database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "/public")));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/blog/:title", (req, res) => {
  // Check if title exists in the file system
  const title = req.params.title;

  res.sendFile(path.join(__dirname, `/views/blog/${title}.html`));
});

// Get a blog's comments by blog id
app.get("/api/blog/:blogId/comments", async (req, res) => {
  const blogId = req.params.blogId;
  const limit = req.query.limit || 100;

  const comments = await getCommentsByBlogId(blogId, limit);
  res.json(comments);
});

// Get a blog by its filename
app.get("/api/blog/file/:filename", async (req, res) => {
  const filename = req.params.filename;

  const blog = await getBlogByFilename(filename);
  res.json(blog);
});

// Create a new comment
app.post("/api/blog/:blogId/comment", bodyParser.json(), async (req, res) => {
  const blogId = req.params.blogId;
  console.log(req.body);
  const { title, name, content, parentId } = req.body;

  if (title.length > 40 || name.length > 25 || content.length > 2000) {
    res.status(400).json({
      error:
        "Title must be less than 40 characters, name must be less than 25 characters, and content must be less than 2000 characters",
    });
    return;
  }

  const comment = await insertComment({
    blogId,
    parentId,
    title,
    name,
    content,
  });

  res.status(201).json(comment);
});

app.listen(port, () => {
  console.log(`Moulik's Portfolio listening on port ${port}`);
});
