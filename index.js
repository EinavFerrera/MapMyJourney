import express from "express";
import bodyParser from "body-parser";
// import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId;

let welcomePage = true;

let users = [];

let usersToSend = [];

app.get("/", async (req, res) => {
  usersToSend = [];
  return res.redirect("/welcome");
});

app.get("/welcome", async (req, res) => {
  welcomePage = false;
  res.render("new.ejs", { header: "Enter your name" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
