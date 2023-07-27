import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// Create a table called "blogs" if it doesn't exist
// Create a table called "comments" if it doesn't exist

await pool.query(
  `CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        filename VARCHAR(255) NOT NULL,
        description VARCHAR(1000) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`
);

await pool.query(
  `CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        blog_id INT NOT NULL,
        parent_id INT DEFAULT NULL,
        title VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        content VARCHAR(2000) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE
    )`
);

export async function getBlogById(id) {
  const [rows] = await pool.query("SELECT * FROM blogs WHERE id = ?", [id]);
  return rows[0];
}

export async function getBlogByFilename(filename) {
  const [rows] = await pool.query("SELECT * FROM blogs WHERE filename = ?", [
    filename,
  ]);
  return rows[0];
}

export async function getCommentsByBlogId(blogId, limit = 100) {
  const [rows] = await pool.query(
    "SELECT * FROM comments WHERE blog_id = ? ORDER BY created_at DESC LIMIT ?",
    [blogId, limit]
  );
  return rows;
}

export async function getCommentById(id) {
  const [rows] = await pool.query("SELECT * FROM comments WHERE id = ?", [id]);
  return rows[0];
}

export async function insertComment({
  blogId,
  parentId,
  title,
  name,
  content,
}) {
  const [result] = await pool.query(
    "INSERT INTO comments (blog_id, parent_id, title, name, content) VALUES (?, ?, ?, ?, ?)",
    [blogId, parentId, title, name, content]
  );

  const id = result.insertId;

  return await getCommentById(id);
}
