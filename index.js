import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;

env.configDotenv();
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId;

let welcomePage = true;

let users = [];

let usersToSend = [];

async function checkVisisted(id) {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE visiter = $1",
    [id]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
async function getUsers() {
  const result = await db.query("SELECT * FROM members");
  users = [];
  result.rows.forEach((member) => {
    users.push(member);
  });
  return users;
}

async function getUsersToSend(entire, family) {
  let numOfUserToSend = family.length;
  let arr = [];
  for (let i = 0; i < numOfUserToSend; i++) {
    let curr_member = family[i];
    let countries = await checkVisisted(curr_member.id);
    const newUserToSend = {
      countries: countries,
      total: countries.length,
      fam: entire,
      color: curr_member.color,
    };
    arr.push(newUserToSend);
  }
  return arr;
}

app.get("/", async (req, res) => {
  usersToSend = [];
  const family = await getUsers();

  if (welcomePage && !family[0]) {
    return res.redirect("/welcome");
  }
  if (currentUserId == undefined) currentUserId = family[0].id;

  if (currentUserId == -1) {
    usersToSend = await getUsersToSend(family, family);
  } else {
    let tempFam = [family.find((mem) => mem.id == currentUserId)];
    usersToSend = await getUsersToSend(family, tempFam);
  }
  res.render("index.ejs", {
    users: usersToSend,
  });
});

app.get("/welcome", async (req, res) => {
  welcomePage = false;
  res.render("new.ejs", { header: "Enter your name" });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );
    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code,visiter) VALUES ($1,$2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      // const family = await getUsers();
      // const curr_member = family.find((mem) => mem.id == currentUserId);
      // const countries = await checkVisisted(curr_member.id);
      res.render("index.ejs", {
        users: usersToSend,
        error: "Sorry, already in the array",
      });
    }
  } catch (err) {
    console.log(err);
    // const family = await getUsers();
    // const curr_member = family.find((mem) => mem.id == currentUserId);
    // const countries = await checkVisisted(curr_member.id);
    res.render("index.ejs", {
      users: usersToSend,
      error: "Sorry,no such a country",
    });
  }
});
app.post("/user", async (req, res) => {
  if (req.body.add) res.render("new.ejs", { header: "Add a Family Member" });
  else if (req.body.user == "all") {
    currentUserId = -1;
    res.redirect("/");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  try {
    await db.query("INSERT INTO members (name,color) VALUES ($1,$2)", [
      req.body.name,
      req.body.color,
    ]);
  } catch (err) {
    console.log(err);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
