import express from "express";
import path from "path";
import bodyParser from "body-parser";
import prisma from "./db";
import authRoutes from "./auth";
import apiRoutes from "./api";
import adminRoutes from "./admin";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use("/", authRoutes);
app.use("/api", apiRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/blog/:title", (req, res) => {
  // Check if title exists in the file system
  const title = req.params.title;

  res.render(`blog/${title}`);
});

app.listen(port, () => {
  console.log(`Moulik's Portfolio listening on port ${port}`);
});
