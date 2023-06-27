import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/blog/:title", (req, res) => {
  // Check if title exists in the file system
  const title = req.params.title;

  res.sendFile(path.join(__dirname, `/views/blog/${title}.html`));
});

app.listen(port, () => {
  console.log(`Moulik's Portfolio listening on port ${port}`);
});
