import express from "express";
import bodyParser from "body-parser";
// import pg from "pg";
import env from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCHTQG3AW0hzS88iC3KRUtvt5QOFVIJSuE",
  authDomain: "mapmy-journey.firebaseapp.com",
  projectId: "mapmy-journey",
  storageBucket: "mapmy-journey.appspot.com",
  messagingSenderId: "959793883954",
  appId: "1:959793883954:web:1b662d681832d2c938452b",
  measurementId: "G-40TKYQCRZ3",
});
const firestore = getFirestore();

const newData = doc(firestore, "daaat/09072024");
function writeDaat() {
  const docData = {
    name: "Einavik",
    age: 24.8,
    younger: true,
  };
  setDoc(newData, docData);
}

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
  let userName;
  welcomePage = false;
  writeDaat();
  try {
    const readD = await getDoc(newData);
    if (readD.exists()) {
      userName = readD.data();
      console.log("i found the name ! ", userName);
    }
  } catch {
    console.log("no data doc");
  }
  res.render("new.ejs", {
    header: userName ? userName.name : "Enter your name ",
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
